import ModuleLayout from "../../components/ModuleLayout";
import DailyFAOMethod from "./DailyFAOMethod";
import HargreavesMethod from "./HargreavesMethod";
import HourlyFAOMethod from "./HourlyFAOMethod";
import MissingDataFAOMethod from "./MissingDataFAOMethod";
import MonthlyFAOMethod from "./MonthlyFAOMethod";
import PanMethod from "./PanMethod";

const subModules = [
  {
    title: "Pan Method",
    comp: <PanMethod />
  },
  {
    title: "Hargreaves Method",
    comp: <HargreavesMethod />
  },
  {
    title: "Hourly FAO Penman-Monteith Method",
    comp: <HourlyFAOMethod />
  },
  {
    title: "Daily FAO Penman-Monteith Method",
    comp: <DailyFAOMethod />
  },
  {
    title: "Monthly FAO Penman-Monteith Method",
    comp: <MonthlyFAOMethod />
  },
  {
    title: "Missing Data FAO Method",
    comp: <MissingDataFAOMethod />
  }
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
