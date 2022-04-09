const betIsCorrect = (betResult: string, actualResult: string) => {
  if (betResult === actualResult) {
    return true;
  }

  if (betResult.includes("-")) {
    const range = betResult.split("-");
    const from = +range[0];
    const to = +range[1];
    return +actualResult >= from && +actualResult <= to;
  }

  if (betResult === "row1") {
    return +actualResult % 3 === 0 && +actualResult !== 0;
  }

  if (betResult === "row2") {
    return (+actualResult + 1) % 3 === 0;
  }

  if (betResult === "row3") {
    return (+actualResult + 2) % 3 === 0;
  }

  if (betResult === "even") {
    return +actualResult % 2 === 0 && +actualResult !== 0;
  }

  if (betResult === "odd") {
    return +actualResult % 2 !== 0;
  }

  if (betResult === "red") {
    return [
      "1",
      "3",
      "5",
      "7",
      "9",
      "12",
      "14",
      "16",
      "18",
      "19",
      "21",
      "23",
      "25",
      "27",
      "30",
      "32",
      "34",
      "36",
    ].includes(actualResult);
  }

  if (betResult === "black") {
    return [
      "2",
      "4",
      "6",
      "8",
      "10",
      "11",
      "13",
      "15",
      "17",
      "20",
      "22",
      "24",
      "26",
      "28",
      "29",
      "31",
      "33",
      "35",
    ].includes(actualResult);
  }

  return false;
};

export default betIsCorrect;
