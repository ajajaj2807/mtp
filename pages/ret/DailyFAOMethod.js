import DynamicForm from "../../components/DynamicForm";
import Info from "../../components/Info";

const config = [
  [
    {
      name: "n",
      type: "list",
      title: "Calculation Period (days)",
      minValue: 0,
      maxValue: 50
    },
    {
      type: "grid",
      name: "temp_and_rh_data",
      title: "Input Daily Temperature and RH",
      variables: ["Max Temp (C)", "Min Temp (C)", "Max RH", "Min RH"]
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
              name: "daily_wind_speed_data",
              title: "Input Daily Wind Speed Data",
              variables: ["Daily Wind Speed"]
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
  ]
];

const calculateDailyET0 = (
  n,
  maxTemp,
  minTemp,
  maxRH,
  minRH,
  windSpeed,
  solarRadiation
) => {
  const sigma = 0.000000004903; // Stefan-Boltzmann constant
  const lambda = 2.45; // Latent heat of vaporization
  const cp = 1.013e-3; // Specific heat at constant pressure
  const rho = 1.225; // Air density at sea level and 15°C
  const rah = 208 / windSpeed; // Aerodynamic resistance for heat transfer

  let dailyET0 = [];

  for (let i = 0; i < n; i++) {
    let Tmean = (maxTemp[i] + minTemp[i]) / 2; // Mean temperature
    let Tmax = maxTemp[i];
    let Tmin = minTemp[i];
    let esMax = 0.6108 * Math.exp((17.27 * Tmax) / (Tmax + 237.3)); // Saturation vapor pressure at maximum temperature
    let esMin = 0.6108 * Math.exp((17.27 * Tmin) / (Tmin + 237.3)); // Saturation vapor pressure at minimum temperature
    let es = (esMax + esMin) / 2; // Mean saturation vapor pressure
    let eaMax = (maxRH[i] / 100) * esMax; // Actual vapor pressure at maximum temperature
    let eaMin = (minRH[i] / 100) * esMin; // Actual vapor pressure at minimum temperature
    let ea = (eaMax + eaMin) / 2; // Mean actual vapor pressure
    let Rso = (0.75 + 0.00002 * solarRadiation[i]) * solarRadiation[i]; // Clear sky solar radiation
    let Rs = solarRadiation[i]; // Actual solar radiation
    let Rns = (1 - 0.23) * Rs; // Net solar radiation
    let Rnl =
      sigma *
      ((Math.pow(Tmax - 273.16, 4) + Math.pow(Tmin - 273.16, 4)) / 2) *
      (0.34 - 0.14 * Math.sqrt((eaMax + eaMin) / 2)) *
      (1.35 * (Rs / Rso) - 0.35); // Net longwave radiation
    let G = 0; // Soil heat flux (assume zero for daily time step)
    let delta = (4098 * es) / Math.pow(Tmean - 273.16 + 237.3, 2); // Slope of the saturation vapor pressure curve
    let gamma = (cp * rho) / (lambda * rah); // Psychrometric constant
    let numerator =
      delta * (Rns - Rnl - G) +
      gamma * (900 / (Tmean - 273.16)) * windSpeed[i] * (es - ea);
    let denominator = delta + gamma * (1 + 0.34 * windSpeed[i]);
    dailyET0.push(numerator / denominator);
  }

  return dailyET0;
};

const getVars = (data) => {
  let n, maxTemp, minTemp, maxRH, minRH, windSpeed, solarRadiation;
  n = Number(data.n);
  maxTemp = new Array(n);
  minTemp = new Array(n);
  minRH = new Array(n);
  maxRH = new Array(n);
  windSpeed = new Array(n);
  solarRadiation = new Array(n);

  data.temp_and_rh_data.forEach((day, i) => {
    let val = day["Min Temp (C)"];
    val = Number(val);
    minTemp[i] = val;
    val = day["Max Temp (C)"];
    val = Number(val);
    maxTemp[i] = val;
    minRH[i] = Number(day["Min RH"]);
    maxRH[i] = Number(day["Max RH"]);
  });

  data.daily_wind_speed_data.forEach((day, i) => {
    let val = day["Daily Wind Speed"];
    val = Number(val);
    windSpeed[i] = val;
  });

  data.solar_radiation_data.forEach((day, i) => {
    let val = day["Solar Radiation (Rs)"];
    val = Number(val);
    solarRadiation[i] = val;
  });

  return {
    n,
    maxTemp,
    minTemp,
    maxRH,
    minRH,
    windSpeed,
    solarRadiation
  };
};

const DailyFAOMethod = () => {
  const onFinish = (data) => {
    console.log(data);

    const {
      n,
      maxTemp,
      minTemp,
      maxRH,
      minRH,
      windSpeed,
      solarRadiation
    } = getVars(data);
    const res = calculateDailyET0(
      n,
      maxTemp,
      minTemp,
      maxRH,
      minRH,
      windSpeed,
      solarRadiation
    );

    console.log(res);
  };

  const infoTitle = "Info:";
  const infoContent =
    "The FAO method, also known as the FAO56 Penman-Monteith method, is a widely used and well-established approach for calculating reference evapotranspiration (ET0), which is a measure of the amount of water that would be evaporated and transpired by a standardized reference crop under ideal environmental conditions. The FAO method is based on the Penman-Monteith equation, which takes into account various meteorological variables and crop characteristics. This submodule uses daily time frame for calculating Reference Evapotranspiration.";
  return (
    <>
      <Info title={infoTitle} content={infoContent} />
      <DynamicForm config={config} onFinish={onFinish} />{" "}
    </>
  );
};

export default DailyFAOMethod;
