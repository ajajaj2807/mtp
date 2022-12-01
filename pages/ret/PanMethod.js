import { useEffect, useMemo, useState } from "react";
// import InputTaker from "../../components/InputTaker";
// import GetTableInput from "../../components/GetTableInput";
import { ProgressSteps, Step } from "baseui/progress-steps";
import { Button } from "baseui/button";
import ListInput from "../../components/ListInput";
import Select from "baseui/select/select-component";
import OptionInput from "../../components/OptionInput";
import { Radio, RadioGroup } from "baseui/radio";
const vars = [
  {
    name: "other_data",
    title: "Other Input Data",
    type: "list",
    vars: [
      { name: "avg_wind_speed", title: "Avg. Wind Speed", value: 0 },
      { name: "avg_rh", value: 0, title: "Avg. Relative Humidity" },
      { name: "fetch", value: 0, title: "Fetch" },
    ],
  },
  {
    name: "pan_type",
    title: "Pan Type",
    type: "option",
    options: [
      { name: "Class A Pan", key: "1" },
      { name: "Colorado Sunken Pan", key: "2" },
    ],
    value: "0",
  },
  {
    name: "pan_sitting",
    title: "Pan Sitting",
    type: "option",
    options: [
      { name: "Pan placed in short green crop area", key: "1" },
      { name: "Pan placed in dry fallow area", key: "2" },
    ],
    value: [],
  },
  {
    name: "pan_condition",
    title: "Pan Condition",
    type: "option",
    options: [
      { name: "Pan painted with Black", key: "1" },
      { name: "Pan not painted with Black", key: "2" },
    ],
    value: [],
  },
  {
    name: "screen_condition",
    title: "Pan Screen Condition",
    type: "option",
    options: [
      { name: "Pan mounted with a screen", key: "1" },
      { name: "Pan not mounted with a screen", key: "2" },
    ],
    value: [],
  },
];

const rhOptions = [
  { title: "Low (<40%)", id: "0" },
  { title: "Medium (40 to 70%)", id: "1" },
  { title: "High(>70%)", id: "2" },
];

const wsOptions = [
  { title: "Light (<2)", id: "0" },
  { title: "Moderate (2-5)", id: "1" },
  { title: "Strong (5-8)", id: "2" },
  { title: "Very Strong (>8)", id: "3" },
];

const fetchOptions = [
  { title: "1", id: "0" },
  { title: "10", id: "1" },
  { title: "100", id: "2" },
  { title: "1000", id: "3" },
];

const PanMethod = () => {
  const [variables, setVariables] = useState(vars);
  const [start, setStart] = useState(1);
  const [length, setLength] = useState(7);
  const cols = useMemo(
    () => [
      { field: "key", headerName: "Date" },
      { headerName: "Pan Evaporation Data", field: "pan_evap", editable: true },
    ],
    []
  );
  const [data, setData] = useState([]);
  const [rh, setRh] = useState([]);
  const [ws, setWs] = useState([]);
  const [fet, setFetch] = useState([]);

  const setRHHelper = (val) => {
    setRh(val);
  };

  const setWSHelper = (val) => {
    setWs(val);
  };

  useEffect(() => {
    const current_length = data.length;
    const req = length - current_length;
    for (var i = 0; i < req; i = i + 1) {
      const obj = {};
      cols.forEach((col) => {
        obj[col.field] = 0;
      });
      obj["key"] = i;
      data.push(obj);
    }
  }, [length, data, cols]);
  const [current, setCurrent] = useState(0);
  const [isWeatherDataKnow, setIsWeatherDataKnown] = useState(0);
  const handleOne = (ok) => {
    setIsWeatherDataKnown(ok);
    setCurrent(1);
  };

  return (
    <div>
      <h4>ETo by Pan Method using Exact Weather data</h4>
      <div className="wrapper">
        {/* <InputTaker variables={variables} setVariables={setVariables} /> */}
        {/* <div>
          <GetTableInput cols={cols} data={data} setData={setData} />
        </div> */}
        <ProgressSteps current={current}>
          <Step title="Step 1">
            <p>Are exact weather data known?</p>
            <Button size="compact" onClick={() => handleOne(1)}>
              Yes
            </Button>
            <Button size="compact" onClick={() => handleOne(0)}>
              No
            </Button>
          </Step>
          <Step title="Step 2">
            {isWeatherDataKnow ? (
              <div>
                <ListInput
                  vars={variables[0].vars}
                  variables={variables}
                  name="Please input the known values here"
                  setVariables={setVariables}
                />
              </div>
            ) : (
              <>
                <b>Please choose the most accurate option</b>
                {/* <div> */}
                <h3>Select Mean Relative Humidity:</h3>
                <RadioGroup
                  value={rh}
                  onChange={(e) => setRHHelper(e.currentTarget.value)}
                  name={"Mean Relative Humidity"}
                >
                  {rhOptions.map((option) => (
                    <Radio key={option.id} value={option.id}>
                      {option.title}
                    </Radio>
                  ))}
                </RadioGroup>
                <h3>Select Wind Speed:</h3>
                <RadioGroup
                  value={ws}
                  onChange={(e) => setWSHelper(e.currentTarget.value)}
                  name={"Wind Speed"}
                >
                  {wsOptions.map((option) => (
                    <Radio key={option.id} value={option.id}>
                      {option.title}
                    </Radio>
                  ))}
                </RadioGroup>
                <h3>Select Fetch:</h3>
                <RadioGroup
                  value={fet}
                  onChange={(e) => setFetch(e.currentTarget.value)}
                  name={"Fetch"}
                >
                  {fetchOptions.map((option) => (
                    <Radio key={option.id} value={option.id}>
                      {option.title}
                    </Radio>
                  ))}
                </RadioGroup>
                {/* </div> */}
              </>
            )}
            <Button size="compact" onClick={() => setCurrent(0)}>
              Back
            </Button>
            <Button size="compact" onClick={() => setCurrent(2)}>
              Next
            </Button>
          </Step>
          <Step title="Step 3">
            <p>Please Select Pan Type</p>
            <Button size="compact" onClick={() => setCurrent(1)}>
              Back
            </Button>
            <Button size="compact" onClick={() => setCurrent(2)}>
              Next
            </Button>
          </Step>
        </ProgressSteps>
      </div>
    </div>
  );
};

export default PanMethod;
