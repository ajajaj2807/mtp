import DynamicForm from "../../components/DynamicForm";

const config = [
  [
    {
      type: "conditional",
      title: "Are data from nearby weather station available?",
      options: [
        {
          key: 0,
          name: "Yes"
        },
        {
          key: 1,
          name: "No"
        }
      ],
      comps: [
        {
          case: "Yes",
          data: [
            {
              type: "info",
              title: "INFO: Please use other modules if data is known."
            }
          ]
        },
        {
          case: "No",
          data: []
        }
      ]
    }
  ],
  [
    {
      name: "n",
      type: "list",
      title: "Calculation Period (months)",
      minValue: 0,
      maxValue: 50
    },
    {
      type: "grid",
      name: "temp_data",
      title: "Input Monthly Temperature Data",
      variables: ["Max Temp (C)", "Min Temp (C)"]
    }
  ],
  [
    {
      type: "option",
      title: "Select monthly avg. Wind Speed at 2m height",
      name: "avg_speed",
      options: [
        { key: 0, name: "Light wind (< 1m/s)" },
        { key: 1, name: "Light to Moderate (1 to 3m/s)" },
        { key: 2, name: "Moderate to Strong (3 to 5m/s)" },
        { key: 3, name: "Strong wind(> 5m/s)" },
        { key: 4, name: "No wind data (consider 2m/s)" }
      ]
    }
  ],
  [{ type: "info", title: "Estimation of relative humidity" }],
  [
    {
      type: "info",
      title:
        "Estimation of Solar Radiation and net radiation, based on location"
    }
  ]
];

const MissingDataFAOMethod = () => {
  const onFinish = (data) => {
    console.log(data);
  };
  return <DynamicForm config={config} onFinish={onFinish} />;
};

export default MissingDataFAOMethod;
