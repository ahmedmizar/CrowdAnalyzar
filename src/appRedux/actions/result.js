const displayResult = (result) => {
  return {
    type: "FETCH_RESULT",
    payload: result,
  };
}
export default displayResult