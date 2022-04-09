import betIsCorrect from "./betIsCorrect";

export const getPaymentFactor = (betResult: string, actualResult: string) => {
  if (!betIsCorrect(betResult, actualResult)) {
    return 0;
  }

  if (+betResult > 0 && +betResult <= 36) {
    return 36;
  }
  if (["1-12", "13-24", "25-36", "row1", "row2", "row3"].includes(betResult)) {
    return 3;
  }
  if (["1-18", "19-36", "red", "black", "even", "odd"].includes(betResult)) {
    return 2;
  }

  console.warn("Unknown bet result", betResult);
  return 0;
};
