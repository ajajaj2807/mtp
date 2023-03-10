import DynamicForm from "../../components/DynamicForm";
import Info from "../../components/Info";

const config = [
  [
    {
      name: "lat",
      title: "Latitude (degree)",
      type: "list",
      minValue: 0,
      maxValue: 90
    },
    {
      name: "n",
      type: "list",
      title: "Calculation Period (days)",
      minValue: 0,
      maxValue: 50
    },
    {
      type: "grid",
      name: "min_max_temp_data",
      title: "Input Min and Max Data",
      variables: ["Max Temp (C)", "Min Temp (C)"]
    }
  ]
];

const calculateRETHargreaves = (latitude, maxTemps, minTemps) => {
  const psychrometricConstantPressure = 0.665e-3; // in kPa/K
  const windSpeed = 2; // in m/s
  const G = 0;
  const altitude = 10;

  // Calculate average daily temperatures
  const avgMaxTemp =
    maxTemps.reduce((acc, val) => acc + val, 0) / maxTemps.length;
  const avgMinTemp =
    minTemps.reduce((acc, val) => acc + val, 0) / minTemps.length;

  // Calculate delta (slope) of the saturation vapor pressure curve
  const deltaTemp =
    (4098 *
      (0.6108 * Math.exp((17.27 * avgMaxTemp) / (avgMaxTemp + 237.3)) -
        0.6108 * Math.exp((17.27 * avgMinTemp) / (avgMinTemp + 237.3)))) /
    Math.pow((avgMaxTemp - avgMinTemp) / 2 + 237.3, 2);

  // Loop over daily temperature data and calculate reference ET for each day
  const referenceET = [];
  for (let i = 0; i < maxTemps.length; i++) {
    const tMax = maxTemps[i];
    const tMin = minTemps[i];
    const tMean = (tMax + tMin) / 2;

    const dr =
      (Math.PI / 12) *
      0.082 *
      Math.pow((latitude * Math.PI) / 180, 2) *
      ((24 * 60) / Math.PI) *
      (0.00000278 * 1367);

    const es =
      (0.6108 * Math.exp((17.27 * tMax) / (tMax + 237.3)) +
        0.6108 * Math.exp((17.27 * tMin) / (tMin + 237.3))) /
      2; // saturation vapor pressure
    const ea = es * ((50 - 10) / 100); // actual vapor pressure (assuming 50% relative humidity)
    const pressure = 101.3 * Math.pow((293 - 0.0065 * altitude) / 293, 5.26); // atmospheric pressure
    const gamma =
      (psychrometricConstantPressure * pressure) / (0.622 * deltaTemp); // psychrometric constant
    const slopeSolar =
      (0.408 *
        dr *
        (tMean + 5) *
        (0.6108 * Math.exp((17.27 * tMax) / (tMax + 237.3)) -
          0.6108 * Math.exp((17.27 * tMin) / (tMin + 237.3)))) /
      Math.pow(tMax - tMin, 2); // slope of the solar radiation curve
    const ra =
      ((((24 * 60) / Math.PI) * 0.082) / 2) * dr * (0.75 + 2e-5 * altitude); // extraterrestrial radiation
    const netRadiation = 0.77 * ra * (0.75 + 2e-5 * altitude) * (tMax - tMin); // net radiation
    const slopeHeat = gamma * (900 / (tMean + 273)) * windSpeed * (ea - es); // slope of the temperature curve (heat)
    const referenceETDay =
      (0.408 * deltaTemp * (netRadiation - G) +
        slopeHeat * (slopeSolar + gamma)) /
      (deltaTemp + gamma * (1 + 0.34 * windSpeed)); // reference ET for the day
    referenceET.push(referenceETDay);
  }

  return referenceET;
};

const getVars = (data) => {
  let n, lat, maxTemps, minTemps;
  n = Number(data.n);
  maxTemps = new Array(n);
  minTemps = new Array(n);
  lat = Number(data.lat);

  data.min_max_temp_data.forEach((day, i) => {
    maxTemps[i] = Number(day["Max Temp (C)"]);
    minTemps[i] = Number(day["Min Temp (C)"]);
  });

  return { lat, maxTemps, minTemps };
};

const HargreavesMethod = () => {
  const onFinish = (data) => {
    console.log(data);
    const { lat, maxTemps, minTemps } = getVars(data);
    const res = calculateRETHargreaves(lat, minTemps, maxTemps);
    console.log(res);
  };

  const infoTitle = "Info:";
  const infoContent =
    "The Hargreaves method is a simplified approach for calculating reference evapotranspiration (ET0), which is a measure of the amount of water that would be evaporated and transpired by a standardized reference crop under ideal environmental conditions. The Hargreaves method uses only two meteorological variables, mean daily air temperature and extraterrestrial radiation, to estimate ET0.";
  return (
    <>
      <Info title={infoTitle} content={infoContent} />
      <DynamicForm config={config} onFinish={onFinish} />{" "}
    </>
  );
};

export default HargreavesMethod;
