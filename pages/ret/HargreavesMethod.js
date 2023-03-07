import DynamicForm from "../../components/DynamicForm";

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

const HargreavesMethod = () => {
  const onFinish = (data) => {
    console.log(data);
  };
  return <DynamicForm config={config} onFinish={onFinish} />;
};

export default HargreavesMethod;
