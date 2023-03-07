import DynamicForm from "../../components/DynamicForm";

const config = [
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
      name: "temp_and_rh_data",
      title: "Input Hourly Temperature and RH",
      variables: ["Avg Min Temp (C)", "Avg Max Temp (C)", "Relative Humidity"]
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
              name: "monthly_wind_speed_data",
              title: "Input Monthly Speed Data",
              variables: ["Monthly Wind Speed"]
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
      type: "conditional",
      title: "Is T(i+1) known?",
      options: [
        { name: "Yes", key: 0 },
        { name: "No", key: 1 }
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
              maxValue: 50
            }
          ]
        },
        {
          case: "No",
          data: [
            {
              name: "t(i-1)",
              type: "list",
              title: "T(i-1)",
              minValue: 0,
              maxValue: 50
            }
          ]
        }
      ]
    }
  ]
];

const MonthlyFAOMethod = () => {
  const onFinish = (data) => {
    console.log(data);
  };
  return <DynamicForm config={config} onFinish={onFinish} />;
};

export default MonthlyFAOMethod;
