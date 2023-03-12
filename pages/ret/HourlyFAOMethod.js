import { useState } from "react";
import DynamicForm from "../../components/DynamicForm";
import Info from "../../components/Info";
import NumericTable from "../../components/NumericTable";
import Results from "../../components/Results";

const config = [
  [
    {
      name: "n",
      type: "list",
      title: "Calculation Period (hours)",
      minValue: 0,
      maxValue: 50
    },
    {
      type: "grid",
      name: "temp_and_rh_data",
      title: "Input Hourly Temperature and RH",
      variables: ["Mean Temp (C)", "Relative Humidity"]
    }
  ],
  [
    {
      type: "conditional",
      title: "Is Wind Speed at 2m height known?",
      options: [
        { key: 0, name: "Yes" },
        { key: 1, name: "No" }
      ],
      comps: [
        {
          case: "Yes",
          data: [
            {
              type: "grid",
              name: "hourly_wind_speed_data",
              title: "Input Hourly Speed Data",
              variables: ["Hourly Wind Speed"]
            }
          ]
        },
        {
          case: "No",
          data: [
            {
              type: "grid",
              name: "height_and_speed_data",
              title: "Input Height and Wind Speed Data",
              variables: ["Height (m)", "Wind Speed (m/s)"]
            }
          ]
        }
      ]
    }
  ],
  [
    {
      type: "conditional",
      title: "Is Solar Radiation known?",
      options: [
        { key: 0, name: "Yes" },
        { key: 1, name: "No, but Sunshine duration is known" },
        { key: 2, name: "No, but Sunshine duration is not known" }
      ],
      comps: [
        {
          case: "Yes",
          data: [
            {
              type: "grid",
              name: "solar_radiation_data",
              title: "Input Solar Radiation Data",
              variables: ["Solar Radiation (Rs)"]
            }
          ]
        },
        {
          case: "No, but Sunshine duration is known",
          data: []
        },
        {
          case: "No, but Sunshine duration is not known",
          data: [
            {
              type: "info",
              title:
                "INFO: Please Use Missing Data module for these conditions."
            }
          ]
        }
      ]
    }
  ],
  [
    {
      type: "option",
      name: "day_time",
      title: "Is it day-time calculation?",
      options: [
        { name: "Day-time calculation", key: 0 },
        { name: "Night-time calculation", key: 1 }
      ]
    }
  ]
];

function calculateET0(n, meanTemp, rh, solarRadiation, isDaytime, windSpeed) {
  const Gsc = 0.082; // Solar constant
  // const sigma = 0.000000004903; // Stefan-Boltzmann constant
  const lambda = 2.45; // Latent heat of vaporization
  const cp = 1.013e-3; // Specific heat at constant pressure
  const rho = 1.225; // Air density at sea level and 15°C
  const rah = 208; // Aerodynamic resistance for heat transfer

  let ET0 = [];

  for (let i = 0; i < n; i++) {
    let T = meanTemp[i] + 273.16; // Convert temperature to Kelvin
    let es = 0.6108 * Math.exp((17.27 * T) / (T + 237.3)); // Saturation vapor pressure
    let ea = (rh[i] / 100) * es; // Actual vapor pressure
    let Rn = isDaytime ? solarRadiation[i] * (1 - 0.23) : 0; // Net radiation
    let G = (Gsc * solarRadiation[i] * 3600) / 1000000; // Soil heat flux
    let delta = (4098 * es) / Math.pow(T - 273.16 + 237.3, 2); // Slope of the saturation vapor pressure curve
    let gamma = (cp * rho) / (lambda * rah); // Psychrometric constant
    let numerator =
      delta * (Rn - G) +
      gamma * (900 / (T - 273.16)) * windSpeed[i] * (es - ea);
    let denominator = delta + gamma * (1 + 0.34 * windSpeed[i]);
    ET0[i] = numerator / denominator;
  }

  return ET0;
}

const getVars = (data) => {
  let n, meanTemp, rh, solarRadiation, isDaytime, windSpeed;
  n = Number(data.n);
  meanTemp = new Array(n);
  rh = new Array(n);
  windSpeed = new Array(n);
  solarRadiation = new Array(n);

  data.temp_and_rh_data.forEach((day, i) => {
    let val = day["Mean Temp (C)"];
    val = Number(val);
    meanTemp[i] = val;
    val = day["Relative Humidity"];
    val = Number(val);
    rh[i] = val;
  });

  if (data["height_and_speed_data"]) {
    data.height_and_speed_data.forEach((day, i) => {
      const z = Number(day["Height (m)"]);
      const uz = Number(day["Wind Speed (m/s)"]);
      var u2 = (uz * 4.87) / Math.log(67.8 * z - 5.42);
      windSpeed[i] = u2;
    });
  } else {
    data.hourly_wind_speed_data.forEach((day, i) => {
      let val = day["Hourly Wind Speed"];
      val = Number(val);
      windSpeed[i] = val;
    });
  }

  data.solar_radiation_data.forEach((day, i) => {
    let val = day["Solar Radiation (Rs)"];
    val = Number(val);
    solarRadiation[i] = val;
  });

  isDaytime = data.day_time === "Day-time calculation";

  return {
    n,
    meanTemp,
    rh,
    solarRadiation,
    isDaytime,
    windSpeed
  };
};

const HourlyFAOMethod = () => {
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [res, setRes] = useState("");

  const handleResultClose = () => {
    setIsResultOpen(false);
  };

  const onFinish = (data) => {
    const { n, meanTemp, rh, solarRadiation, isDaytime, windSpeed } = getVars(
      data
    );
    const res = calculateET0(
      n,
      meanTemp,
      rh,
      solarRadiation,
      isDaytime,
      windSpeed
    );
    setRes(res);
    setIsResultOpen(true);
  };

  const infoTitle = "Info:";
  const infoContent =
    "The FAO method, also known as the FAO56 Penman-Monteith method, is a widely used and well-established approach for calculating reference evapotranspiration (ET0), which is a measure of the amount of water that would be evaporated and transpired by a standardized reference crop under ideal environmental conditions. The FAO method is based on the Penman-Monteith equation, which takes into account various meteorological variables and crop characteristics. This submodule uses hourly time frame for calculating Reference Evapotranspiration.";
  return (
    <>
      <Info title={infoTitle} content={infoContent} />
      <DynamicForm config={config} onFinish={onFinish} />{" "}
      <Results
        isOpen={isResultOpen}
        handleClose={handleResultClose}
        title="Results"
      >
        <b>Here are your results:</b>
        <NumericTable data={res} />
      </Results>
    </>
  );
};

export default HourlyFAOMethod;
