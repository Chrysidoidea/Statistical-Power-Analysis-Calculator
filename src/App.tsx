import "./App.css";
import { calculatePower } from "./core/calculator";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons/faCloudArrowUp";
import { handleFileUpload } from "./core/dataParser";

export const App = () => {
  const [inputType, setInputType] = useState("neutral");
  const [fade, setFade] = useState(false);
  const [alpha, setAlpha] = useState(0.05);
  const [desiredPower, setDesiredPower] = useState(0.8);
  const [sampleSize, setSampleSize] = useState(30);

  document
    .getElementById("dataFile")
    ?.addEventListener("change", handleFileUpload);
  const transitionEffect = () => {
    setFade(true);

    setTimeout(() => {
      setFade(false);
    }, 200);
  };

  return (
    <>
      <h1 id="header">Statistical Power Analysis Calculator</h1>
      <p id="description">
        This <b>Statistical Power Analysis Calculator</b> is a web-based tool
        designed to help scientists and interns calculate key statistical
        metrics like
        <b> effect size (Cohen’s d)</b>, <b>statistical power</b>, and the{" "}
        <b>required sample size </b>
        for experiments. These calculations are crucial for planning and
        interpreting experiments in research, helping to ensure that studies are
        sufficiently powered to detect meaningful effects.
      </p>
      {inputType === "about" && (
        <div id="about" className={fade ? "fade" : "unfade"}>
          <h1 id="about-purpose-header">Purpose</h1>
          <p id="about-purpose">
            In scientific experiments, ensuring that a study has enough
            statistical power is critical for detecting true effects.
            Underpowered studies may lead to false conclusions, whereas
            overpowered studies can waste resources. This calculator provides a
            quick, intuitive way to ensure your experiment is optimally
            designed.
          </p>

          <h2 id="about-features-header">Key Features</h2>

          <ul id="about-features-list">
            <li>
              Calculate the required sample size for your study based on desired
              power and effect size.
            </li>
            <li>Evaluate the effect size of your experiment with Cohen’s d.</li>
            <li>
              Perform statistical power calculations to ensure the strength of
              your study design.
            </li>
            <li>
              Input data manually or upload files (.csv/.xlsx) for quick
              analysis.
            </li>
          </ul>
          <h2 id="about-howto-header">How the Calculator Works</h2>

          <p id="about-howto">
            To use this tool, input your <b>Control Group</b> and{" "}
            <b>Treatment Group</b> data, and set your desired{" "}
            <b>Statistical Power</b>
            and <b>Significance Level (Alpha)</b>. The calculator leverages key
            statistical principles to perform the following calculations:
          </p>

          <ol id="about-calculations-list">
            <li>
              <b>Effect Size (Cohen's d): </b>
              The effect size quantifies the difference between the means of the
              control and treatment groups relative to their pooled standard
              deviation. It is computed as:
              <br></br>
              <code>
                d = (M<sub>1</sub> - M<sub>2</sub>) / SD<sub>pooled</sub>
              </code>
              <br></br>
              Where M<sub>1</sub> and M<sub>2</sub> are the means of the control
              and treatment groups, and SD<sub>pooled</sub> is the pooled
              standard deviation:
              <br></br>
              <code>
                SD<sub>pooled</sub> = √(((n<sub>1</sub> - 1) * SD<sub>1</sub>
                <sup>2</sup> + (n<sub>2</sub> - 1) * SD<sub>2</sub>
                <sup>2</sup>) / (n<sub>1</sub> + n<sub>2</sub> - 2))
              </code>
            </li>

            <li>
              <b>Statistical Power: </b>
              Power is the probability that the test will correctly reject a
              false null hypothesis (i.e., detect a true effect). It is
              calculated as:
              <br></br>
              <code>Power = 1 - β</code>
              <br></br>
              The calculator estimates power based on the input sample size,
              effect size, and significance level using the formula:
              <br></br>
              <code>
                Z<sub>power</sub> = d * √(n) - Z<sub>α</sub>
              </code>
              <br></br>
              Here, Z<sub>α</sub> is the z-score corresponding to the
              significance level (α), and n is the total sample size.
            </li>

            <li>
              <b>Sample Size Calculation: </b>
              The required sample size for a given power level is computed by
              rearranging the power formula to solve for n:
              <br></br>
              <code>
                n = ((Z<sub>α</sub> + Z<sub>β</sub>)<sup>2</sup>) / d
                <sup>2</sup>
              </code>
              <br></br>
              Where Z<sub>β</sub> is the z-score corresponding to the desired
              power, and d is the effect size.
            </li>
          </ol>

          <p id="about-howto-summary">
            By providing the data, significance level, and desired power, this
            calculator efficiently performs these statistical analyses, helping
            you plan experiments with sufficient power to detect true effects,
            minimizing the risk of Type I and Type II errors.
          </p>
          <h2 id="about-privacy-header">Privacy</h2>

          <p id="about-privacy">
            All data uploaded is processed only within your browser and is not
            stored or transmitted to any servers. Your experimental data remains
            completely confidential and secure.
          </p>
          <div className="switcherContainer">
            <button
              className={"switcher" + (fade ? " fade" : "")}
              onClick={() => {
                transitionEffect();
                setTimeout(() => {
                  setInputType("neutral");
                }, 100);
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {inputType === "neutral" && (
        <section>
          <button
            className={"switcher" + (fade ? " fade" : "")}
            onClick={() => {
              transitionEffect();
              setTimeout(() => {
                setInputType("manual");
              }, 100);
            }}
          >
            Enter Data Manually
          </button>
          <button
            className={"switcher" + (fade ? " fade" : "")}
            onClick={() => {
              transitionEffect();
              setTimeout(() => {
                setInputType("upload");
              }, 100);
            }}
          >
            Upload CSV/Excel
          </button>
          <button
            className={"switcher" + (fade ? " fade" : "")}
            onClick={() => {
              transitionEffect();
              setTimeout(() => {
                setInputType("about");
              }, 100);
            }}
          >
            About
          </button>
        </section>
      )}
      {inputType === "manual" && (
        <form action="" id="powerForm" className={fade ? "fade" : "unfade"}>
          <FontAwesomeIcon
            id="close"
            onClick={() => {
              document.getElementById("results")!.innerHTML = "";
              transitionEffect();
              setTimeout(() => {
                setInputType("neutral");
              }, 100);
            }}
            icon={faTimes}
          ></FontAwesomeIcon>
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

          <label htmlFor="alpha">Significance Level (Alpha):</label>
          <input
            type="number"
            id="alpha"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            required
          />

          <label htmlFor="desiredPower">
            Desired Power (e.g., 0.8 equal 80%)
          </label>
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

          <button type="button" id="button" onClick={calculatePower}>
            Calculate
          </button>
        </form>
      )}
      {inputType === "upload" && (
        <form action="" id="powerForm" className={fade ? "fade" : "unfade"}>
          <FontAwesomeIcon
            id="close"
            onClick={() => {
              document.getElementById("results")!.innerHTML = "";
              transitionEffect();
              setTimeout(() => {
                setInputType("neutral");
              }, 100);
            }}
            icon={faTimes}
          ></FontAwesomeIcon>
          <p>Only .csv and .xlsx files are supported</p>
          <label htmlFor="dataFile" id="dataFileLabel">
            <input type="file" id="dataFile" accept=".csv, .xlsx" />
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              className="uploadIcon"
            ></FontAwesomeIcon>
          </label>
          <label htmlFor="alpha">Significance Level (Alpha):</label>
          <input
            type="number"
            id="alpha"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            required
          />
          <label htmlFor="desiredPower">
            Desired Power (e.g., 0.8 equal 80%)
          </label>
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
            placeholder="e.g., 10"
            value={sampleSize}
            onChange={(e) => setSampleSize(parseInt(e.target.value))}
          />

          <div id="container"></div>
        </form>
      )}
      <div id="results"></div>
      <footer id="footer">v0.0.1 </footer>
    </>
  );
};

export default App;
