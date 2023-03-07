import DynamicForm from "../../components/DynamicForm";

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
      name: "iw",
      type: "list",
      title: "Irrigation Depth (mm)",
      minValue: 0,
      maxValue: 50
    },
    {
      name: "desired_r",
      type: "list",
      title: "Desirable IW/CPE Ratio",
      minValue: 0,
      maxValue: 50
    },
    {
      type: "grid",
      name: "pe_data",
      title: "Input Pan Evaporation Data ",
      variables: ["PE (mm/day)"]
    }
  ]
];

const IWCPEMethod = () => {
  const onFinish = (data) => {
    console.log(data);
  };
  return <DynamicForm config={config} onFinish={onFinish} />;
};

export default IWCPEMethod;
