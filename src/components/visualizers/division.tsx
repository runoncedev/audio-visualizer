type DivisionProps = {
  dataArray: number[];
};

export default function Division({ dataArray }: DivisionProps) {
  const groupHeight = 100;

  const groups = [
    dataArray.slice(0, dataArray.length / 2),
    dataArray.slice(dataArray.length / 2),
  ];

  // For each group, create a polyline
  const lines = groups.map((group, groupIdx) => {
    const baseY = groupHeight * (groupIdx + 1);
    const xStep = 800 / (group.length - 1);

    const min = Math.min(...group);
    const max = Math.max(...group);
    const range = max - min || 1;

    const points = group
      .map((value, i) => {
        // Normalize value between 0 and 1
        const normalizedValue = (value - min) / range;

        const y = baseY - normalizedValue * groupHeight;
        const x = i * xStep;

        return `${x},${y}`;
      })
      .join(" ");

    return (
      <polyline
        key={groupIdx}
        points={points}
        fill="none"
        strokeWidth={1}
        opacity={0.8}
      />
    );
  });

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="bg-white shrink-0 transition stroke-black dark:bg-black dark:stroke-white w-full"
    >
      {lines}
    </svg>
  );
}
