// import axios from 'axios';
// import * as React from 'react';

// export const usePageLoad = () => {
//     const [error, setLoading] = React.useState(false);

//   React.useEffect(() => {
//     setLoading(true);
//     let metricNames = [];
//     let firstTownColorCodes = [];
//     let firstTownScores = [];
//     let secondTownScores = [];
//     let secondTownColorCodes = [];

//     const { firstTown, secondTown } = town;
//     const metrics =
//       'Housing' || 'Healthcare' || 'Internet Access' || 'Safety' || 'Education' || 'Cost of Living';
//     const fetchData = async () => {
//       try {
//         const firstTownResponse = await axios.get(`${TOWN_METRICS_URL}slug:${firstTown}/scores/`);
//         const secondTownResponse = await axios.get(`${TOWN_METRICS_URL}slug:${secondTown}/scores/`);

//         for (const dataObj of firstTownResponse?.data?.categories) {
//           if (dataObj.name === metrics) {
//             firstTownColorCodes.push(dataObj.color);
//             firstTownScores.push(dataObj.score_out_of_10);
//             metricNames.push(dataObj.name);
//           }
//         }
//         for (const dataObj of secondTownResponse?.data?.categories) {
//           if (dataObj.name === metrics) {
//             secondTownColorCodes.push(dataObj.color);
//             firstTownScores.push(dataObj.score_out_of_10);
//             metricNames.push(dataObj.name);
//           }
//         }

//         setCityMetrics([
//           {
//             type: 'scatterpolar',
//             r: firstTownScores,
//             theta: metricNames,
//             fill: 'toself',
//             name: firstTown,
//             marker: { color: firstTownColorCodes },
//           },
//           {
//             type: 'scatterpolar',
//             r: secondTownScores,
//             theta: metricNames,
//             fill: 'toself',
//             name: secondTown,
//             marker: { color: secondTownColorCodes },
//           },
//         ]);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [town]);

//   return[];
// };
