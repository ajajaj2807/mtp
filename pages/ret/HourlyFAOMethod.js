import DynamicForm from "../../components/DynamicForm";

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

const HourlyFAOMethod = () => {
  const onFinish = (data) => {
    console.log(data);
  };
  return <DynamicForm config={config} onFinish={onFinish} />;
};

export default HourlyFAOMethod;
