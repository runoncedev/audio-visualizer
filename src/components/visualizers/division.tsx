type DivisionProps = {
  dataArray: number[];
};

export default function Division({ dataArray }: DivisionProps) {
  const numGroups = 2;
  const svgWidth = 800;
  const svgHeight = 200;
  const groupHeight = svgHeight / numGroups;
  const groupSize = Math.ceil(dataArray.length / numGroups);

  // Split dataArray into 10 groups
  const groups = Array.from({ length: numGroups }, (_, i) =>
    dataArray.slice(i * groupSize, (i + 1) * groupSize)
  );

  // For each group, create a polyline
  const lines = groups.map((group, groupIdx) => {
    const baseY = groupHeight * (groupIdx + 1); // bottom of the group band
    const xStep = svgWidth / (group.length - 1 || 1);

    // Normalize group values
    const min = Math.min(...group);
    const max = Math.max(...group);
    const range = max - min || 1;

    const points = group
      .map((value, i) => {
        // Normalize value between 0 and 1
        const norm = (value - min) / range;
        // y: 0 (top of band) to groupHeight (bottom of band)
        const y = baseY - norm * groupHeight;
        const x = i * xStep;
        return `${x},${y}`;
      })
      .join(" ");
    return (
      <polyline
        key={groupIdx}
        points={points}
        fill="none"
        stroke="white"
        strokeWidth={2}
        opacity={0.8}
      />
    );
  });

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="bg-white transition stroke-black dark:bg-black dark:stroke-white w-full"
    >
      {lines}
    </svg>
  );
}
