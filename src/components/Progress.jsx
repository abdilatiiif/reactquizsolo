function Progress({ maxPossiblePoints, index, points }) {
  return (
    <header className="progress">
      <progress max={index} value={index}></progress>
      <p>
        <strong></strong>
      </p>
      <p>
        <strong>
          {points}/{maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
