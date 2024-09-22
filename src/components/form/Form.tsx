import { useAppContext } from "../../context/AppContext";
import { transitionEffect } from "../../lib/handleAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { calculatePower } from "../../core/calculator";

const Form = () => {
  const {
    setFade,
    fade,
    inputType,
    setInputType,
    alpha,
    setAlpha,
    desiredPower,
    setDesiredPower,
    sampleSize,
    setSampleSize,
  } = useAppContext();
  return (
    <form action="" id="powerForm" className={fade ? "fade" : "unfade"}>
      <FontAwesomeIcon
        id="close"
        onClick={() => {
          document.getElementById("results")!.innerHTML = "";
          transitionEffect({ setFade });
          setTimeout(() => {
            setInputType("neutral");
          }, 100);
        }}
        icon={faTimes}
      ></FontAwesomeIcon>
      {inputType === "upload" ? (
        <>
          <p>Only .csv and .xlsx files are supported</p>
          <label htmlFor="dataFile" id="dataFileLabel">
            <input type="file" id="dataFile" accept=".csv, .xlsx" />
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              className="uploadIcon"
            ></FontAwesomeIcon>
          </label>
        </>
      ) : null}
      {inputType === "manual" ? (
        <>
          <label htmlFor="controlGroup">
            {" "}
            Control Group Data (comma-separated):
          </label>
          <input
            type="text"
            id="controlGroup"
            placeholder="e.g., 140, 135, 142"
            required
          />

          <label htmlFor="treatmentGroup">
            {" "}
            Treatment Group Data (comma-separated):
          </label>
          <input
            type="text"
            id="treatmentGroup"
            placeholder="e.g., 132, 130, 128"
            required
          />
        </>
      ) : null}

      <label htmlFor="alpha">Significance Level (Alpha):</label>
      <input
        type="number"
        id="alpha"
        step="0.01"
        value={alpha}
        onChange={(e) => setAlpha(parseFloat(e.target.value))}
        required
      />

      <label htmlFor="desiredPower">Desired Power (e.g., 0.8 equal 80%)</label>
      <input
        type="number"
        step="0.01"
        id="desiredPower"
        value={desiredPower}
        onChange={(e) => setDesiredPower(parseFloat(e.target.value))}
        required
      />

      <label htmlFor="sampleSize">
        Sample Size (Optional, for Power Calculation)
      </label>
      <input
        type="number"
        id="sampleSize"
        placeholder="e.g., 30"
        value={sampleSize}
        onChange={(e) => setSampleSize(parseInt(e.target.value))}
      />
      {inputType === "manual" ? (
        <button type="button" id="button" onClick={calculatePower}>
          Calculate
        </button>
      ) : (
        <div id="container"></div>
      )}
    </form>
  );
};

export default Form;
