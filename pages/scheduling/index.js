import ModuleLayout from "../../components/ModuleLayout";
import IWCPEMethod from "./IWCPEMethod";

const subModules = [
  {
    title: "IW/CPE Method",
    comp: <IWCPEMethod />
  }
];

const Scheduling = () => {
  return (
    <div>
      <ModuleLayout subModules={subModules} title="Irrigation Scheduling" />
    </div>
  );
};

export default Scheduling;
