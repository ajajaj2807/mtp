import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import styles from "../styles/OptionInput.module.css";

const OptionInput = ({ name, value, options, variables, setVariables }) => {
  const setValue = (val) => {
    const new_vars = [...variables];
    new_vars = new_vars.map((v) => {
      if (v.title == name) {
        v.value = val;
      }
      return v;
    });
    setVariables(new_vars);
  };
  return (
    <div className={styles.container}>
      <p>
        <b>{name}</b>
      </p>
      <RadioGroup
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        name={name}
        align={ALIGN.vertical}
      >
        {options.map((option) => (
          <Radio key={option.key} value={option.key}>
            {option.name}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};

export default OptionInput;
