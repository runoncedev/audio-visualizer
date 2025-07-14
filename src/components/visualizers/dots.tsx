type DotsProps = {
  dataArray: number[];
};

export default function Dots({ dataArray }: DotsProps) {
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
      className="bg-white shrink-0 transition stroke-black dark:bg-black dark:stroke-white fill-black dark:fill-white w-full"
    >
      {points.map((point, i) => (
        <circle
          key={i}
          cx={point.split(",")[0]}
          cy={point.split(",")[1]}
          r="2"
        />
      ))}
    </svg>
  );
}
