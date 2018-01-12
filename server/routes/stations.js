// TODO: hit graphQL for data, instead of using static file
import jsonData from 'root/data/allStations.json';

export const formatAllStationShows = (req, res, next) => {
  const { nodes } = jsonData.data.allStations;
  let stationsArr = [];
  for (let node of nodes) {
    if (node.stationShowsByStationId.nodes.length) {
      let arr = [];
      const shows = node.stationShowsByStationId.nodes;
      const { name, callsign, twitter, facebook } = node;
      for (let show of shows) {      
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
          twitter: twitter ? `https://twitter.com/${twitter}` : '',
          email: '',
          facebook: facebook ? facebook : '',
          instagram: '',
        };
        arr.push(obj);
      }
      stationsArr.push(arr);
    }
  }
  // 'stationsArr' is a 2D array, where each item is a Stations array 
  // and each item in that is a station show
  req.body = stationsArr;
  next();
};
