import ModuleLayout from "../../components/ModuleLayout";

const HargreavesMethod = () => {
  return <div>IW/CPE Method</div>;
};

const FAOPenmanMethod = () => {
  return <div>Soil-Water Balance Method</div>;
};

const subModules = [
  {
    title: "IW/CPE Method",
    comp: <HargreavesMethod />,
  },
  {
    title: "Soil-Water Balance Method",
    comp: <FAOPenmanMethod />,
  },
];

const Scheduling = () => {
  return (
    <div>
      <ModuleLayout subModules={subModules} title="Irrigation Scheduling" />
    </div>
  );
};

export default Scheduling;
