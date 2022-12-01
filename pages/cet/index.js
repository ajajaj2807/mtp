import ModuleLayout from "../../components/ModuleLayout";

const PanMethod = () => {
  return <div>Single Crop Coefficient Approach</div>;
};

const HargreavesMethod = () => {
  return <div>Dual Crop Coefficient Approach</div>;
};

const FAOPenmanMethod = () => {
  return <div>ET Under Soil-Water Stress Condition</div>;
};

const subModules = [
  {
    title: "Single Crop Coefficient Approach",
    comp: <PanMethod />,
  },
  {
    title: "Dual Crop Coefficient Approach",
    comp: <HargreavesMethod />,
  },
  {
    title: "ET Under Soil-Water Stress Condition",
    comp: <FAOPenmanMethod />,
  },
];

const Cet = () => {
  return (
    <div>
      <ModuleLayout subModules={subModules} title="Crop Evapotranspiration" />
    </div>
  );
};

export default Cet;
