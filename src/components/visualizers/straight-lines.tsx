type StraightLinesProps = {
  dataArray: number[];
};

export default function StraightLines({ dataArray }: StraightLinesProps) {
  const lines = dataArray.map((value) => {
    // Normalize value between 1 and 20
    const normalizedValue = 1 + (value / 255) * 19;
    return normalizedValue;
  });

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="w-full shrink-0 bg-white stroke-black transition dark:bg-black dark:stroke-white"
    >
      {lines.map((value, i) => {
        const padding = 20; // Add 20px padding on each side
        const availableWidth = 800 - padding * 2; // 760px available for lines
        const xPosition = padding + (availableWidth / (lines.length - 1)) * i;
        const strokeWidth = Math.max(1, value); // Scale the value to create visible width differences
        return (
          <line
            key={i}
            x1={xPosition}
            y1={0}
            x2={xPosition}
            y2={200}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </svg>
  );
}
