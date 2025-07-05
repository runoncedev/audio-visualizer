type StraightLinesProps = {
  dataArray: number[];
};

export default function StraightLines({ dataArray }: StraightLinesProps) {
  const oddPoints = dataArray.reduce((points, value, i) => {
    if (i % 2 === 1) {
      const barWidth = 800 / (dataArray.length - 1);
      const x = i * barWidth;
      const barHeight = value * 0.2;
      const y = 100 - barHeight;
      points.push(`${x},${y}`);
    }

    return points;
  }, [] as string[]);

  const evenPoints = dataArray.reduce((points, value, i) => {
    if (i % 2 === 0) {
      const barWidth = 800 / (dataArray.length - 1);
      const x = i * barWidth;
      const barHeight = value * 0.2;
      const y = 100 + barHeight;
      points.push(`${x},${y}`);
    }

    return points;
  }, [] as string[]);

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="bg-white transition stroke-black dark:bg-black dark:stroke-white w-full"
    >
      {oddPoints.map((point, i) => (
        <line
          key={i}
          x1={0}
          y1={point.split(",")[1]}
          x2={800}
          y2={point.split(",")[1]}
          strokeWidth="1"
        />
      ))}
      {evenPoints.map((point, i) => (
        <line
          key={i}
          x1={0}
          y1={point.split(",")[1]}
          x2={800}
          y2={point.split(",")[1]}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
