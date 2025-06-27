function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        {" "}
        You score {points} out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore"></p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
