import { useState } from "react";
import DynamicForm from "../../components/DynamicForm";
import Info from "../../components/Info";
import Results from "../../components/Results";

const config = [
  [
    {
      type: "conditional",
      title: "Are exact weather data known?",
      options: [
        { key: 0, name: "Yes" },
        { key: 1, name: "No" }
      ],
      comps: [
        {
          case: "Yes",
          data: [
            {
              name: "ws",
              type: "list",
              title: "Wind Speed",
              minValue: 0,
              maxValue: 50
            },
            {
              name: "rh",
              type: "list",
              title: "Relative Humidity",
              minValue: 0,
              maxValue: 50
            },
            {
              name: "fetch",
              type: "list",
              title: "Fetch",
              minValue: 0,
              maxValue: 50
            }
          ]
        },
        {
          case: "No",
          data: [
            {
              type: "option",
              name: "rh",
              title: "Relative Humidity",
              options: [
                { name: "Low (<40%)", key: 0 },
                { name: "Medium (40 to 70%)", key: 1 },
                { name: "High (>70%)", key: 2 }
              ]
            },
            {
              type: "option",
              name: "ws",
              title: "Wind Speed",
              options: [
                { name: "Light (< 2m/s)", key: 0 },
                { name: "Moderate (2 to 5 m/s)", key: 1 },
                { name: "Strong (5 to 8 m/s)", key: 2 },
                { name: "Very Strong (> 8m/s)", key: 3 }
              ]
            },
            {
              type: "option",
              name: "fetch",
              title: "Fetch",
              options: [
                { name: "1m", key: 0 },
                { name: "10m", key: 1 },
                { name: "100m", key: 2 },
                { name: "1000m", key: 3 }
              ]
            }
          ]
        }
      ]
    }
  ],
  [
    {
      type: "option",
      name: "pan_type",
      title: "Select Pan Type",
      options: [
        { name: "Class A Pan", key: 0 },
        { name: "Colorado Sunken Pan", key: 1 }
      ]
    },
    {
      type: "option",
      name: "pan_sitting",
      title: "Select Pan Sitting",
      options: [
        { name: "Placed in a dry fallow area", key: 0 },
        { name: "Placed in a short green crop", key: 1 }
      ]
    }
  ],
  [
    {
      type: "option",
      name: "pan_condition",
      title: "Select Pan Condition",
      options: [
        { name: "Pan painted with black", key: 0 },
        { name: "Pan not painted with black", key: 1 },
        { name: "Pan mounted with a screen", key: 2 },
        { name: "Pan not mounted with a screen", key: 3 }
      ]
    }
  ],
  [
    {
      type: "grid",
      name: "pan_evap_data",
      title: "Input Pan Evaporation Data",
      variables: ["Pan Evaporation Rate (mm/day)"],
      n: 7
    }
  ]
];

const kp_values = {
  "Class A Pan": {
    "Placed in a short green crop": {
      "Low (<40%)": {
        "Light (< 2m/s)": 0.7,
        "Moderate (2 to 5 m/s)": 0.6,
        "Strong (5 to 8 m/s)": 0.6,
        "Very Strong (> 8m/s)": 0.5
      },
      "Medium (40 to 70%)": {
        "Light (< 2m/s)": 0.8,
        "Moderate (2 to 5 m/s)": 0.75,
        "Strong (5 to 8 m/s)": 0.65,
        "Very Strong (> 8m/s)": 0.55
      },
      "High (>70%)": {
        "Light (< 2m/s)": 0.85,
        "Moderate (2 to 5 m/s)": 0.8,
        "Strong (5 to 8 m/s)": 0.7,
        "Very Strong (> 8m/s)": 0.6
      }
    },
    "Placed in a dry fallow area": {
      "Low (<40%)": {
        "Light (< 2m/s)": 0.75,
        "Moderate (2 to 5 m/s)": 0.65,
        "Strong (5 to 8 m/s)": 0.65,
        "Very Strong (> 8m/s)": 0.6
      },
      "Medium (40 to 70%)": {
        "Light (< 2m/s)": 0.85,
        "Moderate (2 to 5 m/s)": 0.8,
        "Strong (5 to 8 m/s)": 0.7,
        "Very Strong (> 8m/s)": 0.6
      },
      "High (>70%)": {
        "Light (< 2m/s)": 0.85,
        "Moderate (2 to 5 m/s)": 0.8,
        "Strong (5 to 8 m/s)": 0.7,
        "Very Strong (> 8m/s)": 0.6
      }
    }
  },
  "Colorado Sunken Pan": {
    "Placed in a short green crop": {
      "Low (<40%)": {
        "Light (< 2m/s)": 1,
        "Moderate (2 to 5 m/s)": 0.85,
        "Strong (5 to 8 m/s)": 0.75,
        "Very Strong (> 8m/s)": 0.65
      },
      "Medium (40 to 70%)": {
        "Light (< 2m/s)": 1,
        "Moderate (2 to 5 m/s)": 0.85,
        "Strong (5 to 8 m/s)": 0.75,
        "Very Strong (> 8m/s)": 0.7
      },
      "High (>70%)": {
        "Light (< 2m/s)": 1,
        "Moderate (2 to 5 m/s)": 0.9,
        "Strong (5 to 8 m/s)": 0.75,
        "Very Strong (> 8m/s)": 0.7
      }
    },
    "Placed in a dry fallow area": {
      "Low (<40%)": {
        "Light (< 2m/s)": 0.85,
        "Moderate (2 to 5 m/s)": 0.75,
        "Strong (5 to 8 m/s)": 0.65,
        "Very Strong (> 8m/s)": 0.55
      },
      "Medium (40 to 70%)": {
        "Light (< 2m/s)": 0.85,
        "Moderate (2 to 5 m/s)": 0.75,
        "Strong (5 to 8 m/s)": 0.65,
        "Very Strong (> 8m/s)": 0.6
      },
      "High (>70%)": {
        "Light (< 2m/s)": 0.85,
        "Moderate (2 to 5 m/s)": 0.75,
        "Strong (5 to 8 m/s)": 0.65,
        "Very Strong (> 8m/s)": 0.65
      }
    }
  }
};

const getKpKnown = (pan_type, pan_sitting, ws, fetch, rh) => {
  let Kp = null;
  ws = Number(ws);
  rh = Number(rh);
  fetch = Number(fetch);

  if (pan_type === "Class A Pan") {
    if (pan_sitting === "Placed in a short green crop") {
      Kp =
        0.108 -
        0.0286 * ws +
        0.0422 * Math.log(fetch) +
        0.1434 * Math.log(rh) -
        0.000631 * Math.log(fetch) ** 2 * Math.log(rh);
    } else {
      Kp =
        0.61 +
        0.00341 * rh -
        0.000162 * ws * rh -
        0.00000959 * ws * fetch +
        0.00327 * ws * Math.log(fetch) -
        0.00289 * ws * Math.log(86.4 * ws) -
        0.0106 * Math.log(86.4 * ws) * Math.log(fetch) +
        0.00063 * Math.log(fetch) ** 2 * Math.log(86.4 * ws);
    }
  } else {
    if (pan_sitting === "Placed in a short green crop") {
      Kp =
        0.87 +
        0.119 * Math.log(fetch) -
        0.0157 * Math.log(86.4 * ws) ** 2 * rh -
        0.000053 * Math.log(86.4 * ws) * Math.log(fetch) * rh;
    } else {
      Kp =
        1.145 -
        0.08 * ws +
        0.000903 * ws ** 2 * Math.log(rh) -
        0.0964 * Math.log(fetch) +
        0.0031 * ws * Math.log(fetch) +
        0.0015 * Math.log(fetch) ** 2 * Math.log(rh);
    }
  }

  return Kp;
};

const getKpUnknown = (pan_type, pan_sitting, ws, fetch, rh) => {
  let Kp = 0;

  Kp = kp_values[pan_type][pan_sitting][rh][ws];

  return Kp;
};

const getPanCoefficient = (input_data) => {
  const { ws, rh, fetch, pan_type, pan_sitting, pan_condition } = input_data;

  const wsn = Number(ws);

  const isExactDataAvailable = !isNaN(wsn);
  let Kp = null;

  if (isExactDataAvailable) {
    Kp = getKpKnown(pan_type, pan_sitting, ws, fetch, rh);
  } else {
    // console.log("good");
    Kp = getKpUnknown(pan_type, pan_sitting, ws, fetch, rh);
  }
  return Kp;
};

const getET = (Kp, EpanArray) => {
  const EtArray = [];

  for (let i = 0; i < EpanArray.length; i++) {
    const Et = Kp * EpanArray[i]["Pan Evaporation Rate (mm/day)"];
    EtArray.push(Et);
  }

  return EtArray;
};

const infoTitle = "Info:";
const infoContent =
  "The pan evaporation method is a simple and widely used approach for estimating reference evapotranspiration (ET0), which is a measure of the amount of water that would be evaporated and transpired by a standardized reference crop under ideal environmental conditions. The pan evaporation method is based on the principle that the rate of water evaporation from a pan is related to the potential evapotranspiration from a nearby crop.";

const PanMethod = () => {
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [res, setRes] = useState("");

  const handleResultClose = () => {
    setIsResultOpen(false);
  };

  const onFinish = (data) => {
    const Kp = getPanCoefficient(data);
    const result = getET(Kp, data.pan_evap_data);
    setRes(result);
    setIsResultOpen(true);
  };

  return (
    <>
      <Info title={infoTitle} content={infoContent} />
      <DynamicForm config={config} onFinish={onFinish} />
      <Results
        isOpen={isResultOpen}
        handleClose={handleResultClose}
        title="Results"
      >
        <b>Yayy!!</b>
        {res}
      </Results>
    </>
  );
};

export default PanMethod;
