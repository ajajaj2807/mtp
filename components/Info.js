import styles from "../styles/Info.module.css";

const Info = ({ content, title }) => {
  return (
    <div className={styles.container}>
      <b>{title ? title : null} </b>
      {content}
    </div>
  );
};

export default Info;
