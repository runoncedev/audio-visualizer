type PolylineProps = {
  dataArray: number[];
};

export default function Polyline({ dataArray }: PolylineProps) {
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
      className="bg-white transition shrink-0 stroke-black dark:bg-black dark:stroke-white w-full"
    >
      <polyline points={points.join(" ")} strokeWidth="1" fill="none" />
    </svg>
  );
}
