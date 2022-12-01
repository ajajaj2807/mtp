import { Select } from "baseui/select";
import { useState } from "react";
import styles from "../styles/ModuleLayout.module.css";

const ModuleLayout = ({ subModules, title }) => {
  const [value, setValue] = useState([]);
  const options = subModules;
  console.log(value);
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Select
        options={options}
        value={value}
        labelKey="title"
        valueKey="title"
        placeholder="Select Method"
        onChange={({ value }) => setValue(value)}
        overrides={{
          Root: {
            style: () => ({
              width: "50%",
            }),
          },
        }}
      />
      {value && value[0]?.comp}
    </div>
  );
};

export default ModuleLayout;
