import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import styles from "../styles/OptionInput.module.css";

const OptionInput = ({ name, selectedOption, options, title, onChange }) => {
  return (
    <div className={styles.container}>
      <p>
        <b>{title}</b>
      </p>
      <RadioGroup
        value={selectedOption}
        onChange={(e) => onChange(e.currentTarget.value)}
        name={name}
        align={ALIGN.vertical}
      >
        {options.map((option) => (
          <Radio key={option.key} value={option.name}>
            {option.name}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};

export default OptionInput;
