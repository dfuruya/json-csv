import express from 'express';
import { formatAllStationShows } from 'root/server/routes/stations';
import { exportEach } from 'root/server/routes';

const router = express.Router();

router.get('/stations/:colName', formatAllStationShows, exportEach);

export default router;
