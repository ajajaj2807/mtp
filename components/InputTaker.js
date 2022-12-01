import OptionInput from "./OptionInput";
import ListInput from "./ListInput";
import styles from "../styles/InputTaker.module.css";

const InputTaker = ({ variables, setVariables }) => {
  return (
    <div className={styles.container}>
      {variables.map((variable) => {
        if (variable.type == "option") {
          return (
            <OptionInput
              key={variable.name}
              options={variable.options}
              value={variable.value}
              name={variable.title}
              variables={variables}
              setVariables={setVariables}
            />
          );
        }
        if (variable.type == "list") {
          return (
            <ListInput
              vars={variable.vars}
              variables={variables}
              setVariables={setVariables}
              name={variable.title}
              key={variable.name}
            />
          );
        }
      })}
    </div>
  );
};

export default InputTaker;
