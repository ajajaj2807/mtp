import { Input } from "baseui/input";
import styles from "../styles/ListInput.module.css";

const config = {
  temp: [10, 39],
  n: [1, 50],
  lat: [0, 180],
  ws: [0, 30],
  rh: [0, 100],
  fetch: [1, 1000],
  iw: [0, 30],
  desired_r: [0, 1],
};

const checkLimit = (var_name, value) => {
  const val = Number(value);
  if (!val) {
    return true;
  }
  console.log(var_name, value, val);
  if (
    config.hasOwnProperty(var_name) &&
    config[var_name][0] <= val &&
    config[var_name][1] >= val
  ) {
    return true;
  }
  return false;
};

const ListInput = ({ title, min, max, name, onChange, selectedValue }) => {
  const isValid = checkLimit(name, selectedValue);

  return (
    <div className={styles.container}>
      <p>
        <b>{title}</b>
      </p>
      {
        <div className={styles.inputControl} key={name}>
          {/* <div className={styles.label} style={{ fontWeight: "bold" }}>
            {name}
          </div> */}
          <div className={styles.input}>
            <Input
              value={selectedValue}
              placeholder="0"
              onChange={(e) => onChange(e.target.value)}
              overrides={{
                Input: {
                  style: () => ({
                    outline: "#99f solid",
                    backgroundColor: "#d6d6d6",
                    width: "100%",
                  }),
                },
              }}
            />
            {isValid !== undefined && isValid == false && (
              <span className={styles.error}>
                Invalid input. Please give input between {config[name][0]} and{" "}
                {config[name][1]}
              </span>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default ListInput;
