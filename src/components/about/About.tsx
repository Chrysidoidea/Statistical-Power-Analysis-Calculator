import { useAppContext } from "../../context/AppContext";
import { transitionEffect } from "../../lib/handleAnimation";

const About: React.FC = () => {
  const { fade, setFade, setInputType } = useAppContext();

  return (
    <div id="about" className={fade ? "fade" : "unfade"}>
      <h1 id="about-purpose-header">Purpose</h1>
      <p id="about-purpose">
        In scientific experiments, ensuring that a study has enough statistical
        power is critical for detecting true effects. Underpowered studies may
        lead to false conclusions, whereas overpowered studies can waste
        resources. This calculator provides a quick, intuitive way to ensure
        your experiment is optimally designed.
      </p>

      <h2 id="about-features-header">Key Features</h2>

      <ul id="about-features-list">
        <li>
          Calculate the required sample size for your study based on desired
          power and effect size.
        </li>
        <li>Evaluate the effect size of your experiment with Cohen’s d.</li>
        <li>
          Perform statistical power calculations to ensure the strength of your
          study design.
        </li>
        <li>
          Input data manually or upload files (.csv/.xlsx) for quick analysis.
        </li>
      </ul>

      <h2 id="about-howto-header">How the Calculator Works</h2>

      <p id="about-howto">
        To use this tool, input your <b>Control Group</b> and{" "}
        <b>Treatment Group</b> data, and set your desired
        <b>Statistical Power</b> and <b>Significance Level (Alpha)</b>. The
        calculator leverages key statistical principles to perform the following
        calculations:
      </p>

      <ol id="about-calculations-list">
        <li>
          <b>Effect Size (Cohen's d):</b> The effect size quantifies the
          difference between the means of the control and treatment groups
          relative to their pooled standard deviation. It is computed as:
          <br />
          <code>
            d = (M<sub>1</sub> - M<sub>2</sub>) / SD<sub>pooled</sub>
          </code>
          <br />
          Where M<sub>1</sub> and M<sub>2</sub> are the means of the control and
          treatment groups, and SD<sub>pooled</sub> is the pooled standard
          deviation:
          <br />
          <code>
            SD<sub>pooled</sub> = √(((n<sub>1</sub> - 1) * SD<sub>1</sub>
            <sup>2</sup> + (n<sub>2</sub> - 1) * SD<sub>2</sub>
            <sup>2</sup>) / (n<sub>1</sub> + n<sub>2</sub> - 2))
          </code>
        </li>

        <li>
          <b>Statistical Power:</b> Power is the probability that the test will
          correctly reject a false null hypothesis (i.e., detect a true effect).
          It is calculated as:
          <br />
          <code>Power = 1 - β</code>
          <br />
          The calculator estimates power based on the input sample size, effect
          size, and significance level using the formula:
          <br />
          <code>
            Z<sub>power</sub> = d * √(n) - Z<sub>α</sub>
          </code>
          <br />
          Here, Z<sub>α</sub> is the z-score corresponding to the significance
          level (α), and n is the total sample size.
        </li>

        <li>
          <b>Sample Size Calculation:</b> The required sample size for a given
          power level is computed by rearranging the power formula to solve for
          n:
          <br />
          <code>
            n = ((Z<sub>α</sub> + Z<sub>β</sub>)<sup>2</sup>) / d<sup>2</sup>
          </code>
          <br />
          Where Z<sub>β</sub> is the z-score corresponding to the desired power,
          and d is the effect size.
        </li>
      </ol>

      <p id="about-howto-summary">
        By providing the data, significance level, and desired power, this
        calculator efficiently performs these statistical analyses, helping you
        plan experiments with sufficient power to detect true effects,
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
          aria-label="Go back to previous page"
          className={"switcher" + (fade ? " fade" : "")}
          onClick={() => {
            transitionEffect({ setFade });
            setTimeout(() => {
              setInputType("neutral");
            }, 100);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default About;
