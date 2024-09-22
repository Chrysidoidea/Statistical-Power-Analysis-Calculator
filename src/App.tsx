import "./App.css";
import { useAppContext } from "./context/AppContext";
import { handleFileUpload } from "./core/dataParser";
import Form from "./components/form/Form";
import About from "./components/about/About";
import Menu from "./components/menu/Menu";

export const App = () => {
  const { inputType } = useAppContext();

  document
    .getElementById("dataFile")
    ?.addEventListener("change", handleFileUpload);

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
      {inputType === "about" && <About />}
      {inputType === "neutral" && <Menu />}
      {(inputType === "manual" || inputType === "upload") && (
        <>
          <Form />
          <div id="results"></div>
        </>
      )}
      <footer id="footer">v0.0.1 </footer>
    </>
  );
};

export default App;
