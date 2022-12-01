import { Input } from "baseui/input";
import styles from "../styles/ListInput.module.css";

const ListInput = ({ vars, variables, name, setVariables }) => {
  const setValue = (val, v_name) => {
    const new_vars = [...vars];
    new_vars = new_vars.map((v) => {
      if (v.name == v_name) {
        v.value = val;
      }
      return v;
    });
    const new_variables = [...variables];
    new_variables.map((v) => {
      if (v.name == name) {
        v.vars = new_vars;
      }
    });
    setVariables(new_variables);
  };
  return (
    <div className={styles.container}>
      <p>
        <b>{name}</b>
      </p>
      {vars.map((v) => (
        <div className={styles.inputControl} key={v.name}>
          <div className={styles.label}>{v.title}</div>
          <div className={styles.input}>
            <Input
              value={v.value}
              placeholder="0"
              onChange={(e) => setValue(e.target.value, v.name)}
              overrides={{
                Input: {
                  style: () => ({
                    outline: "#99f solid",
                    backgroundColor: "#d6d6d6",
                  }),
                },
              }}
            ></Input>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListInput;
