import xlsx from 'node-xlsx';
import fs from 'fs';

/* Parsing the Excel file and storing in a JSON file */
const workSheetsFromFile = xlsx.parse(`${__dirname}/data.xlsx`);
// console.log(workSheetsFromFile[0].data[0]);
const excelData = workSheetsFromFile[0].data;
const dataObj = {
  data: excelData
};
const jsonData = JSON.stringify(dataObj);
fs.writeFile('data.json', jsonData, 'utf8', () =>
  console.log('Successfully Write')
);

/* Reading the JSON file */
const data = fs.readFileSync('data.json', 'utf8');
if (data) {
  const jsonObj = JSON.parse(data);
  console.log(jsonObj.industryTitles[1]);
}
