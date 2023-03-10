import { ALIGN, Radio, RadioGroup } from "baseui/radio";
import { useState } from "react";
import styles from "../styles/ListInput.module.css";
import GetTableInput from "./GetTableInput";
import ListInput from "./ListInput";
import OptionInput from "./OptionInput";

const ConditionalInput = ({ comps, title, options, onChange, formValues }) => {
  const [selectedOption, setSelectedOption] = useState(-1);
  const renderComp = (step) => {
    switch (step.type) {
      case "option":
        return (
          <OptionInput
            title={step.title}
            options={step.options}
            onChange={(value) => onChange(step.name, value)}
            selectedOption={formValues[step.name]}
            name={step.name}
          />
        );
      case "list":
        return (
          <ListInput
            title={step.title}
            min={step.min}
            max={step.max}
            name={step.name}
            onChange={(value) => onChange(step.name, value)}
            selectedValue={formValues[step.name]}
          />
        );

      case "grid":
        const data = formValues[step.name]
          ? formValues[step.name]
          : Array.from({ length: step.n ? step.n : formValues["n"] }, () =>
              step.variables.reduce((obj, variable) => {
                obj[variable] = 0;
                return obj;
              }, {})
            );
        return (
          <GetTableInput
            title={step.title}
            data={data}
            onChange={(value) => onChange(step.name, value)}
            n={step.n ? step.n : formValues["n"]}
            variables={step.variables}
          />
        );
      case "info":
        return (
          <div>
            <h2>{step.title}</h2>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <>
      <div className={styles.container}>
        <p>
          <b>{title}</b>
        </p>
      </div>
      <div style={{ margin: "10px auto" }}>
        <RadioGroup
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.currentTarget.value)}
          align={ALIGN.vertical}
        >
          {options.map((option) => (
            <Radio key={option.key} value={option.name}>
              {option.name}
            </Radio>
          ))}
        </RadioGroup>
      </div>
      {comps.map((comp) => {
        if (comp.case === selectedOption) {
          return comp.data.map((step) => renderComp(step));
        }
        return null;
      })}
    </>
  );
};

export default ConditionalInput;
