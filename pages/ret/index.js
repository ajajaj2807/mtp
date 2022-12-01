import ModuleLayout from "../../components/ModuleLayout";
import PanMethod from "./PanMethod";

const HargreavesMethod = () => {
  return <div>Hargreaves Method</div>;
};

const FAOPenmanMethod = () => {
  return <div>FAO Penman Method</div>;
};

const subModules = [
  {
    title: "Pan Method",
    comp: <PanMethod />,
  },
  {
    title: "Hargreaves Method",
    comp: <HargreavesMethod />,
  },
  {
    title: "FAO Penman-Monteith Method",
    comp: <FAOPenmanMethod />,
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
