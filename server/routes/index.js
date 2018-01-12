import json2csv from 'json2csv';
import fs from 'fs';
import path from 'path';

const exportPath = path.resolve('exports') + '/';

// Exports a CSV file for each 'thing' (e.g. Stations, Podcasts, etc)
// NOTE: req.body should be a collection of collections
export const exportEach = (req, res) => {
  const { colName } = req.params;
  const formatted = req.body;
  let count = 0;
  for (let data of formatted) {
    exportCsv(data, colName);
    count++;
  }
  console.log(`${count} CSV file(s) exported!`);
  res.status(200).send(formatted);  
};

// Exports a single CSV file of everything
// NOTE: req.body should be a flat collection
export const exportAll = (req, res) => {
  const { colName } = req.params;
  const formatted = req.body;
  exportCsv(formatted, colName);
  console.log(`Master CSV file exported!`);
  res.status(200).send(formatted);
};

// Helper for creating CSV file
const exportCsv = (data, colName) => {
  const filename = data[0][colName];
  const csv = json2csv({ data });
  fs.writeFile(`${exportPath}/${filename}.csv`, csv, err => {
    if (err) throw err;
  });
};
