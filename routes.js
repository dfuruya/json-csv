import express from 'express';
import json2csv from 'json2csv';
import fs from 'fs';

import jsonData from './data.json';

const router = express.Router();

// const setTitle = () => 'Title'
// const setWeekly = () => 'Weekly Schedule'
// const setCover = () => 'Cover Image (Absolute URL)'
// const setType = () => 'Type (Show/Host/Author/Syndicated Author)'
// const setRelated = () => 'Related Show/Host'
// const setDescription = () => 'Description'

// const convertEndTime = endTime => {
//   let time = moment(endTime, 'HH:mm:ss');
//   return ' - ' + time.format('hhA').replace('0', '');
// }

const format = input => {
  const { nodes } = input.data.allStations;
  let arr = [];
  for (let node of nodes) {
    if (node.stationShowsByStationId.nodes.length) {
      const shows = node.stationShowsByStationId.nodes;
      for (let show of shows) {      
        const { name, callsign, twitter, facebook } = node;
        const description = show.showByShowId.showPodcastsByShowId.nodes.length ? show.showByShowId.showPodcastsByShowId.nodes[0].podcastByPodcastId.description : '';
        let obj = {
          'Station': name,
          'call letter': callsign,
          'Title': show.showByShowId.name,
          'Weekly Schedule': show.displaySchedule,
          'Cover Image (Absolute URL)': show.showByShowId.image ? show.showByShowId.image : '',
          'Type (Show/Host/Author/Syndicated Author)': 'Show',
          'Related Show/Host': show.showByShowId.name,
          'Description': description ? description: '',
          // 'Description': show.showByShowId.showPodcastsByShowId.nodes[0].podcastByPodcastId.description || null,
          twitter: twitter ? `https://twitter.com/${twitter}` : '',
          email: '',
          facebook: facebook ? facebook : '',
          instagram: '',
        };
        arr.push(obj);
      }
    }
  }
  return arr;
};

router.get('/', (req, res) => {
  const data = format(jsonData);
  const csv = json2csv({ data });
  fs.writeFile(__dirname + '/exports/file.csv', csv, err => {
    if (err) throw err;
    console.log('CSV file exported!');
  })
  res.status(200).send(jsonData);
});

export default router;
