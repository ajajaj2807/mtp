import DynamicForm from "../../components/DynamicForm";

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
        { name: "Placed in a short green crop", key: 1 },
        { name: "Placed in tall crops and enclosed by a small area", key: 2 }
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
      variables: ["RET", "Depth (mm)"],
      n: 7
    }
  ]
];

const PanMethod = () => {
  const onFinish = (data) => {
    console.log(data);
  };
  return <DynamicForm config={config} onFinish={onFinish} />;
};

export default PanMethod;
