type PolygonProps = {
  dataArray: number[];
};

export default function Polygon({ dataArray }: PolygonProps) {
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

    const points = group.map((value, i) => {
      // Normalize value between 0 and 1
      const normalizedValue = (value - min) / range;

      const y = baseY - normalizedValue * groupHeight;
      const x = i * xStep;

      return `${x},${y}`;
    });

    return {
      polyline: (
        <polyline
          key={groupIdx}
          points={points.join(" ")}
          fill="none"
          stroke="white"
          strokeWidth={2}
          opacity={0.8}
        />
      ),
      points,
    };
  });

  // Create the filled polygon between the two polylines
  let polygon = null;
  if (lines.length === 2) {
    // First group points in order, second group points in reverse order
    const polygonPoints = [
      ...lines[0].points,
      ...lines[1].points.slice().reverse(),
    ].join(" ");
    polygon = (
      <polygon
        points={polygonPoints}
        // fill="rgba(255,255,255,0.2)"
        stroke="none"
      />
    );
  }

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="bg-white transition dark:fill-white stroke-black dark:bg-black dark:stroke-white w-full"
    >
      {polygon}
    </svg>
  );
}
