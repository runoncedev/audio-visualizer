type CirclesProps = {
  dataArray: number[];
};

export default function Circles({ dataArray }: CirclesProps) {
  const points = dataArray.map((value, i) => {
    const barWidth = 800 / (dataArray.length - 1);
    const x = i * barWidth;
    const barHeight = value * 0.2;
    const y = i % 2 ? 100 - barHeight : 100 + barHeight;
    return `${x},${y}`;
  });

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="bg-white transition stroke-black fill-black dark:bg-black dark:stroke-white dark:fill-white w-full"
    >
      {points.map((point, i) => {
        const value = Number(point.split(",")[1]);
        const radius = Math.max(1, Math.abs(value - 100) / 3);
        const spacing = 800 / (points.length - 1); // Calculate spacing based on SVG width
        return <circle key={i} cx={i * spacing} cy={100} r={radius} />;
      })}
    </svg>
  );
}
