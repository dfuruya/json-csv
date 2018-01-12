# Setup

- Set up a route for your desired data (see `server/routes.js`). Note that you will need to use the params `/:colName` in order for `exportEach` and `exportAll` helpers to work (see points below)

- There is a route helper named `exportEach` that will export out CSVs for each item in the array being passed in. If you need to export out the entire list (e.g. all 'Stations', all 'Podcasts', etc), you should use `exportAll`. **_NOTE: You will need to set up your format function accordingly (refer to the next step)_**

- Construct a formatting function according to the requested CSV output (see `server/routes/stations.js` as an example), which will feed into the desired export function

- Chain them in your route

# Usage

- Hit the endpoint you set up, using the name of first column in the data (e.g. 'http://localhost:8080/stations/Station')
