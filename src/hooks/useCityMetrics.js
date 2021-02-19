export const useCityMetrics = (firstData, secondData) => {
  let firstDataMetrics = [];
  let firstTownColorCodes = [];
  let firstTownScores = [];
  let secondDataMetrics = [];
  let secondTownScores = [];
  let secondTownColorCodes = [];
  let initialFirstTown = 'berlin';
  let initialSecondTown = 'london';
  //FIRST DATA SET
  //Housing1
  firstData?.data?.categories.filter(
    (item) =>
      item.name === 'Housing' &&
      firstDataMetrics.push(item.name) &&
      firstTownScores.push(item.score_out_of_10) &&
      firstTownColorCodes.push(item.color)
  );
  //HealthCare1
  firstData?.data?.categories.filter(
    (item) =>
      item.name === 'Healthcare' &&
      firstDataMetrics.push(item.name) &&
      firstTownScores.push(item.score_out_of_10) &&
      firstTownColorCodes.push(item.color)
  );
  //Internet Access1
  firstData?.data?.categories.filter(
    (item) =>
      item.name === 'Internet Access' &&
      firstDataMetrics.push(item.name) &&
      firstTownScores.push(item.score_out_of_10) &&
      firstTownColorCodes.push(item.color)
  );
  //Safety1
  firstData?.data?.categories.filter(
    (item) =>
      item.name === 'Safety' &&
      firstDataMetrics.push(item.name) &&
      firstTownScores.push(item.score_out_of_10) &&
      firstTownColorCodes.push(item.color)
  );
  //Education1
  firstData?.data?.categories.filter(
    (item) =>
      item.name === 'Education' &&
      firstDataMetrics.push(item.name) &&
      firstTownScores.push(item.score_out_of_10) &&
      firstTownColorCodes.push(item.color)
  );
  //Cost of Living1
  firstData?.data?.categories.filter(
    (item) =>
      item.name === 'Cost of Living' &&
      firstDataMetrics.push(item.name) &&
      firstTownScores.push(item.score_out_of_10) &&
      firstTownColorCodes.push(item.color)
  );

  //SECOND DATA SET
  //Housing2
  secondData?.data?.categories.filter(
    (item) =>
      item.name === 'Housing' &&
      secondDataMetrics.push(item.name) &&
      secondTownScores.push(item.score_out_of_10) &&
      secondTownColorCodes.push(item.color)
  );
  //HealthCare2
  secondData?.data?.categories.filter(
    (item) =>
      item.name === 'Healthcare' &&
      secondDataMetrics.push(item.name) &&
      secondTownScores.push(item.score_out_of_10) &&
      secondTownColorCodes.push(item.color)
  );
  //Internet Access2
  secondData?.data?.categories.filter(
    (item) =>
      item.name === 'Internet Access' &&
      secondDataMetrics.push(item.name) &&
      secondTownScores.push(item.score_out_of_10) &&
      secondTownColorCodes.push(item.color)
  );
  //Safety2
  secondData?.data?.categories.filter(
    (item) =>
      item.name === 'Safety' &&
      secondDataMetrics.push(item.name) &&
      secondTownScores.push(item.score_out_of_10) &&
      secondTownColorCodes.push(item.color)
  );
  //Education2
  secondData?.data?.categories.filter(
    (item) =>
      item.name === 'Education' &&
      secondDataMetrics.push(item.name) &&
      secondTownScores.push(item.score_out_of_10) &&
      secondTownColorCodes.push(item.color)
  );
  //Cost of Living2
  secondData?.data?.categories.filter(
    (item) =>
      item.name === 'Cost of Living' &&
      secondDataMetrics.push(item.name) &&
      secondTownScores.push(item.score_out_of_10) &&
      secondTownColorCodes.push(item.color)
  );

  return {
    firstDataMetrics,
    firstTownColorCodes,
    firstTownScores,
    secondDataMetrics,
    secondTownColorCodes,
    secondTownScores,
    initialFirstTown,
    initialSecondTown,
  };
};
