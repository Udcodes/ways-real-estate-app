// import axios from 'axios';
// import { useState } from 'react';

// export const useGetCityMetrics = async (town) => {
//   const TOWN_METRICS_URL = 'https://api.teleport.org/api/urban_areas/';
//   let initialFirstTown = 'Berlin';
//   let initialSecondTown = 'Dortmund';
//   const [cityMetrics, setCityMetrics] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [firstData, setFirstData] = useState(null);
//   const [secondData, setSecondData] = useState(null);
//   setLoading(true);
//   const { firstTown, secondTown } = town;
//   const firstTownResponse = await axios.get(
//     `${TOWN_METRICS_URL}slug:${firstTown || initialFirstTown}/scores/`
//   );
//   const secondTownResponse = await axios.get(
//     `${TOWN_METRICS_URL}slug:${secondTown || initialSecondTown}/scores/`
//   );
//   axios.all([firstTownResponse, secondTownResponse]).then(
//     axios.spread((...allData) => {
//       setFirstData(allData[0]);
//       setSecondData(allData[1]);

//       console.log(firstData);
//       console.log(secondData);

//       getMetrics(firstData, secondData);
//       setCityMetrics([
//         {
//           type: 'scatterpolar',
//           r: firstTownScores,
//           theta: firstDataMetrics,
//           fill: 'toself',
//           name: firstTown || initialFirstTown,
//           marker: { color: firstTownColorCodes },
//         },
//         {
//           type: 'scatterpolar',
//           r: secondTownScores,
//           theta: secondDataMetrics,
//           fill: 'toself',
//           name: secondTown || initialSecondTown,
//           marker: { color: secondTownColorCodes },
//         },
//       ]);
//       setLoading(false);
//     })
//   );
//   // useEffect(() => {
//   //   useGetCityMetrics(town);
//   // }, []);
//   return { cityMetrics, loading };
// };
