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
      title: "Calculation Period (days)",
      minValue: 0,
      maxValue: 50,
    },
    {
      name: "iw",
      type: "list",
      title: "Irrigation Depth (mm)",
      minValue: 0,
      maxValue: 50,
    },
    {
      name: "desired_r",
      type: "list",
      title: "Desirable IW/CPE Ratio",
      minValue: 0,
      maxValue: 50,
    },
    {
      type: "grid",
      name: "pe_data",
      title: "Input Pan Evaporation Data ",
      variables: ["PE (mm/day)"],
    },
  ],
];

const IWCPEMethod = () => {
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [res, setRes] = useState("");

  const handleResultClose = () => {
    setIsResultOpen(false);
  };

  const scheduleIrrigation = (data) => {
    const numDays = Number(data.n);
    const irrigationDepth = Number(data.iw);
    const iwCpeRatio = Number(data.desired_r);
    const panEvapData = data.pe_data.map((day, i) => {
      let val = day["PE (mm/day)"];
      val = Number(val);
      return val
    });

    // Calculate the total water requirement for the given number of days
    const totalWaterRequirement = numDays * irrigationDepth * iwCpeRatio;

    // Calculate the total pan evaporation for the given number of days
    const totalPanEvap = panEvapData.reduce((acc, curr) => acc + curr, 0);

    // Calculate the irrigation scheduling for each day
    const irrigationSchedule = panEvapData.map((panEvap) => {
      const irrigation = (panEvap / totalPanEvap) * totalWaterRequirement;
      return irrigation.toFixed(2);
    });

    return irrigationSchedule;
  };

  const onFinish = (data) => {
    console.log(data);
    const res = scheduleIrrigation(data);
    setRes(res);
    setIsResultOpen(true);
  };

  const infoTitle = "Info:";
  const infoContent = "Using IWCPE Method to schedule Irrigation";

  return (
    <>
      <Info title={infoTitle} content={infoContent} />
      <DynamicForm config={config} onFinish={onFinish} />{" "}
      <Results
        isOpen={isResultOpen}
        handleClose={handleResultClose}
        title="Irrigation Scheduling by IWCPE Method"
      >
        <b>Here are your results:</b>
        <NumericTable data={res} type="is" />
      </Results>
    </>
  );
};

export default IWCPEMethod;
