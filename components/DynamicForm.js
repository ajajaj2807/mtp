import { ProgressSteps } from "baseui/progress-steps";
import { useState } from "react";
import ConditionalInput from "./ConditionalInput";
import GetTableInput from "./GetTableInput";
import ListInput from "./ListInput";
import OptionInput from "./OptionInput";
import styles from "../styles/DynamicForm.module.css";

const DynamicForm = ({ config, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  const handleOptionChange = (varName, value) => {
    setFormValues({ ...formValues, [varName]: value });
    console.log(varName, value);
  };

  const handleListChange = (varName, value) => {
    setFormValues({ ...formValues, [varName]: value });
  };

  const handleConditionalChange = (varName, value) => {
    setFormValues({ ...formValues, [varName]: value });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = (step) => {
    // const step = config[currentStep];
    switch (step.type) {
      case "option":
        return (
          <OptionInput
            title={step.title}
            options={step.options}
            onChange={(value) => handleOptionChange(step.name, value)}
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
            onChange={(value) => handleListChange(step.name, value)}
            selectedValue={formValues[step.name]}
          />
        );
      case "conditional":
        return (
          <ConditionalInput
            comps={step.comps}
            title={step.title}
            options={step.options}
            formValues={formValues}
            onChange={(name, value) => handleConditionalChange(name, value)}
          />
        );
      case "grid":
        // const data =
        //   formValues[step.name] !== undefined
        //     ? formValues[step.name]
        //     : Array.from({ length: step.n ? step.n : formValues["n"] }, () =>
        //         step.variables.reduce((obj, variable) => {
        //           obj[variable] = 0;
        //           return obj;
        //         }, {})
        //       );
        return (
          <GetTableInput
            title={step.title}
            data={formValues[step.name]}
            onChange={(value) => handleConditionalChange(step.name, value)}
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
    <div>
      <ProgressSteps currentStep={currentStep} steps={config.length} />
      <div>
        {config[currentStep].map((step) => {
          return renderStepContent(step);
        })}
      </div>
      <div className={styles.actionBar}>
        {currentStep > 0 && (
          <button className={styles.button} onClick={handleBack}>
            Back
          </button>
        )}
        {currentStep < config.length - 1 && (
          <button className={styles.button} onClick={handleNext}>
            Next
          </button>
        )}
        {currentStep === config.length - 1 && (
          <button
            className={styles.button}
            onClick={() => onFinish(formValues)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
