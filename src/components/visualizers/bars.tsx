type BarsProps = {
  dataArray: number[];
};

export default function Bars({ dataArray }: BarsProps) {
  const bars = dataArray.map((value) => {
    // Normalize value between 1 and 200
    const normalizedValue = 1 + (value / 255) * 199;
    return normalizedValue;
  });

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="w-full shrink-0 bg-white stroke-black transition dark:bg-black dark:stroke-white"
    >
      {bars.map((height, i) => {
        const padding = 20; // Add 20px padding on each side
        const availableWidth = 800 - padding * 2; // 760px available for bars
        const xPosition = padding + (availableWidth / (bars.length - 1)) * i;
        const barHeight = Math.max(1, height); // Scale the value to create visible height differences
        const yPosition = 200 - barHeight; // Position bars from bottom up

        return (
          <rect
            key={i}
            x={xPosition - 0.5} // Center the 1px wide bar on the x position
            y={yPosition}
            width={1}
            height={barHeight}
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}
