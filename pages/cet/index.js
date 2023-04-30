import ModuleLayout from "../../components/ModuleLayout";

const SingleCCA = () => {
  return <div>Single Crop Coefficient Approach</div>;
};

const subModules = [
  {
    title: "Single Crop Coefficient Approach",
    comp: <SingleCCA />,
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
