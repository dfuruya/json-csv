import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import FileStreamRotator from 'file-stream-rotator';
import path from 'path';
import routes from './routes';

const port = process.env.PORT || 8080;
const app = express();

const logDirectory = 'server/log';

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: `${logDirectory}/access-%DATE%.log`,
  frequency: 'daily',
  verbose: false,
});

// ensure exports directory exists
const exportPath = path.resolve('exports') + '/';
fs.existsSync(exportPath) || fs.mkdirSync(exportPath);

app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, () => { console.log(`Listening on port ${port}`) });
