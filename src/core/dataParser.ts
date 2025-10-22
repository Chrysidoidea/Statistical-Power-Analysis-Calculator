import Papa from "papaparse";
import { runAnalysis } from "./calculatorFile";
export const handleFileUpload = (event: Event) => {
  console.log("file uploaded");
  const fileeInput = event.target as HTMLInputElement;
  const file = fileeInput.files?.[0];

  if (file) {
    Papa.parse(file, {
      complete: function (results) {
        const data = results.data;
        processCSVData(data as Record<string, string>[]);
      },
      header: true,
    });
  }
}
export const processCSVData = (data: Record<string, string>[]) => {
  const columnNames = Object.keys(data[0]);

  const variableSelectHTML = `
    <label for="dependentVariable">Select Dependent Variable:</label>
    <select id="dependentVariable">
        ${columnNames
          .map((col) => `<option value="${col}">${col}</option>`)
          .join("")}
    </select>

    <label for="groupVariable">Select Group Variable:</label>
    <select id="groupVariable">
        ${columnNames
          .map((col) => `<option value="${col}">${col}</option>`)
          .join("")}
    </select>
    <button type="button" id="button">Calculate</button>
`;

  document.getElementById("container")!.innerHTML = variableSelectHTML;
  document.getElementById("button")!.addEventListener("click", () => runAnalysis(data));

}