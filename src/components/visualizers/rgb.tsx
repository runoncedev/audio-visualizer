type RGBProps = {
  dataArray: number[];
};

export default function RGB({ dataArray }: RGBProps) {
  const normalizeValue = (value: number): number => {
    return Math.min(Math.max((value / 255) * 123 + 10, 10), 133);
  };

  const [, valueB] = dataArray;
  const normalizedValueB = normalizeValue(valueB);

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="w-full shrink-0 bg-white stroke-black transition dark:bg-black dark:stroke-white"
    >
      <circle
        cx="50%"
        cy="100"
        r={normalizedValueB}
        fill="black"
        stroke="transparent"
      />
      <circle
        cx="266"
        cy="100"
        r={normalizedValueB}
        fill="white"
        stroke="transparent"
      />
      <circle
        cx="532"
        cy="100"
        r={normalizedValueB}
        fill="white"
        stroke="transparent"
      />
    </svg>
  );
}
