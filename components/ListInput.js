import { Input } from "baseui/input";
import styles from "../styles/ListInput.module.css";

const ListInput = ({ title, min, max, name, onChange, selectedValue }) => {
  return (
    <div className={styles.container}>
      <p>
        <b>{title}</b>
      </p>
      {
        <div className={styles.inputControl} key={name}>
          <div className={styles.label} style={{ fontWeight: "bold" }}>
            {name}
          </div>
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
                    width: "100%"
                  })
                }
              }}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default ListInput;
