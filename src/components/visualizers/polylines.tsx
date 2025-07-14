type PolylineProps = {
  dataArray: number[];
};

export default function Polyline({ dataArray }: PolylineProps) {
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
      className="bg-white shrink-0 transition stroke-black dark:bg-black dark:stroke-white w-full"
    >
      <polyline points={oddPoints.join(" ")} strokeWidth="1" fill="none" />
      <polyline points={evenPoints.join(" ")} strokeWidth="1" fill="none" />
    </svg>
  );
}
