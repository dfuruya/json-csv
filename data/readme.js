/*

allStations.json data pulled using the following graphQL query:

query {
  allStations {
    nodes {
      name
      callsign
      twitter
      facebook
      stationShowsByStationId {
        nodes {
          displaySchedule
          showByShowId {
            name
            image
            showPodcastsByShowId {
              nodes {
                podcastByPodcastId {
                  description
                }
              }
            }
          }
        }
      }
    }
  }
}

*/