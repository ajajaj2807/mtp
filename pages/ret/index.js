import ModuleLayout from "../../components/ModuleLayout";
import DailyFAOMethod from "./DailyFAOMethod";
import HargreavesMethod from "./HargreavesMethod";
import HourlyFAOMethod from "./HourlyFAOMethod";
import MissingDataFAOMethod from "./MissingDataFAOMethod";
import MonthlyFAOMethod from "./MonthlyFAOMethod";
import PanMethod from "./PanMethod";

const subModules = [
  {
    title: "ETo by Pan Method",
    comp: <PanMethod />,
  },
  {
    title: "ETo by Hargreaves Method",
    comp: <HargreavesMethod />,
  },
  {
    title: "ETo by Hourly FAO Penman-Monteith Method",
    comp: <HourlyFAOMethod />,
  },
  {
    title: "ETo by Daily FAO Penman-Monteith Method",
    comp: <DailyFAOMethod />,
  },
  {
    title: "ETo by Monthly FAO Penman-Monteith Method",
    comp: <MonthlyFAOMethod />,
  },
  {
    title: "ETo by Missing Data FAO Method",
    comp: <MissingDataFAOMethod />,
  },
];

const Ret = () => {
  return (
    <div>
      <ModuleLayout
        subModules={subModules}
        title="Reference Evapotranspiration"
      />
    </div>
  );
};

export default Ret;
