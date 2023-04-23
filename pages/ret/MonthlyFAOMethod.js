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
      title: "Calculation Period (months)",
      minValue: 0,
      maxValue: 50,
    },
    {
      type: "grid",
      name: "temp_and_rh_data",
      title: "Input Monthly Temperature and RH",
      variables: [
        "Avg Min Temp (C)",
        "Avg Max Temp (C)",
        "Actual Vapour Pressure",
      ],
    },
  ],
  [
    {
      type: "conditional",
      title: "Is Wind Speed at 2m height known?",
      options: [
        { key: 0, name: "Yes" },
        { key: 1, name: "No" },
      ],
      comps: [
        {
          case: "Yes",
          data: [
            {
              type: "grid",
              name: "monthly_wind_speed_data",
              title: "Input Monthly Speed Data",
              variables: ["Monthly Wind Speed"],
            },
          ],
        },
        {
          case: "No",
          data: [
            {
              type: "grid",
              name: "height_and_speed_data",
              title: "Input Height and Wind Speed Data",
              variables: ["Height (m)", "Wind Speed (m/s)"],
            },
          ],
        },
      ],
    },
  ],
  [
    {
      type: "conditional",
      title: "Is Solar Radiation known?",
      options: [
        { key: 0, name: "Yes" },
        { key: 1, name: "No, but Sunshine duration is known" },
        { key: 2, name: "No, but Sunshine duration is not known" },
      ],
      comps: [
        {
          case: "Yes",
          data: [
            {
              type: "grid",
              name: "solar_radiation_data",
              title: "Input Solar Radiation Data",
              variables: ["Solar Radiation (Rs)"],
            },
          ],
        },
        {
          case: "No, but Sunshine duration is known",
          data: [],
        },
        {
          case: "No, but Sunshine duration is not known",
          data: [
            {
              type: "info",
              title:
                "INFO: Please Use Missing Data module for these conditions.",
            },
          ],
        },
      ],
    },
  ],
  [
    {
      type: "conditional",
      title: "Is T(i+1) known?",
      options: [
        { name: "Yes", key: 0 },
        { name: "No", key: 1 },
      ],
      comps: [
        {
          case: "Yes",
          data: [
            {
              name: "t(i+1)",
              type: "list",
              title: "T(i+1)",
              minValue: 0,
              maxValue: 50,
            },
          ],
        },
        {
          case: "No",
          data: [
            {
              name: "t(i-1)",
              type: "list",
              title: "T(i-1)",
              minValue: 0,
              maxValue: 50,
            },
          ],
        },
      ],
    },
  ],
];

const calculateMonthlyReferenceET = (
  avgMin,
  avgMax,
  rh,
  wind,
  solarRad,
  Tnext,
  Tknown
) => {
  // Set constants
  var gamma = 0.665e-3; // Psychrometric constant (kPa/°C)
  var G = 0; // Soil heat flux (MJ/m^2/day) - set to 0 for monthly calculation

  // Initialize output array
  var ETrefMonthly = [];

  // Loop through each month
  for (var i = 0; i < avgMin.length; i++) {
    // Calculate mean temperature
    var avgTemp;
    avgTemp = (avgMin[i] + avgMax[i]) / 2.0;

    // Calculate actual vapor pressure (kPa)
    var ea = rh[i];

    // Calculate saturation vapor pressure (kPa)
    var es =
      0.6108 * Math.exp((17.27 * avgMin[i]) / (avgMin[i] + 237.3)) +
      0.6108 * Math.exp((17.27 * avgMax[i]) / (avgMax[i] + 237.3));

    // Calculate net radiation (MJ/m^2/day)
    var Rn = (1 - 0.23) * solarRad[i];

    // Calculate mean daily air density (kg/m^3)
    var rho = (1.293 * 101.3) / ((avgTemp + 273.16) * 287.0);

    // Calculate wind speed at 2 m (m/s)
    var u2 = 0.16 * wind[i];

    // Calculate reference ET (mm/day)
    var delta =
      (4098 * (0.6108 * Math.exp((17.27 * avgMin[i]) / (avgMin[i] + 237.3)))) /
      Math.pow(avgMin[i] + 237.3, 2); // Slope of the vapor pressure-temperature curve (kPa/°C)
    var ETref =
      (0.408 * delta * Rn +
        ((gamma * 900) / (avgTemp + 273)) * u2 * (es - ea)) /
        (delta + gamma * (1 + 0.34 * u2)) +
      G / (rho * 1000); // Convert G from MJ/m^2/day to mm/day by dividing by (rho * 1000)

    ETrefMonthly.push(ETref);
  }

  return ETrefMonthly;
};

const getVars = (data) => {
  let n, avgMin, avgMax, rh, wind, solarRad, Tnext, Tknown;
  n = Number(data.n);
  avgMin = new Array(n);
  avgMax = new Array(n);
  rh = new Array(n);
  wind = new Array(n);
  solarRad = new Array(n);

  data.temp_and_rh_data.forEach((day, i) => {
    avgMin[i] = Number(day["Avg Min Temp (C)"]);
    avgMax[i] = Number(day["Avg Max Temp (C)"]);
    rh[i] = Number(day["Actual Vapour Pressure"]);
  });

  if (data["height_and_speed_data"]) {
    data.height_and_speed_data.forEach((day, i) => {
      const z = Number(day["Height (m)"]);
      const uz = Number(day["Wind Speed (m/s)"]);
      var u2 = (uz * 4.87) / Math.log(67.8 * z - 5.42);
      wind[i] = u2;
    });
  } else {
    data.monthly_wind_speed_data.forEach((day, i) => {
      let val = day["Monthly Wind Speed"];
      val = Number(val);
      wind[i] = val;
    });
  }

  data.solar_radiation_data.forEach((day, i) => {
    let val = day["Solar Radiation (Rs)"];
    val = Number(val);
    solarRad[i] = val;
  });

  Tknown = data["t(i+1"] !== undefined;
  Tnext = data["t(i+1)"];

  return {
    avgMin,
    avgMax,
    rh,
    wind,
    solarRad,
    Tnext,
    Tknown,
  };
};

const MonthlyFAOMethod = () => {
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [res, setRes] = useState("");

  const handleResultClose = () => {
    setIsResultOpen(false);
  };

  const onFinish = (data) => {
    const { avgMin, avgMax, rh, wind, solarRad, Tnext, Tknown } = getVars(data);
    const res = calculateMonthlyReferenceET(
      avgMin,
      avgMax,
      rh,
      wind,
      solarRad,
      Tnext,
      Tknown
    );

    setRes(res);
    setIsResultOpen(true);
  };

  const infoTitle = "Info:";
  const infoContent =
    "The FAO method, also known as the FAO56 Penman-Monteith method, is a widely used and well-established approach for calculating reference evapotranspiration (ET0), which is a measure of the amount of water that would be evaporated and transpired by a standardized reference crop under ideal environmental conditions. The FAO method is based on the Penman-Monteith equation, which takes into account various meteorological variables and crop characteristics. This submodule uses monthly time frame for calculating Reference Evapotranspiration.";
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

export default MonthlyFAOMethod;

// avg min, max, rh, wind, solar rad, T(i+1) known or not
