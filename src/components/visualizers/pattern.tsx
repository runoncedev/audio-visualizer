type PatternProps = {
  dataArray: number[];
};

export default function Pattern({ dataArray }: PatternProps) {
  const normalizeValue = (value: number): number => {
    return Math.min(Math.max((value / 255) * 19 + 1, 1), 20);
  };

  const [, , , , , value] = dataArray;
  const normalizedValueA = normalizeValue(value);

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="w-full shrink-0 bg-white stroke-black transition dark:bg-black dark:stroke-white"
    >
      <defs>
        <pattern id="ring" width="5%" height="20%">
          <circle cx="20" cy="20" r={normalizedValueA} fill="black" />
        </pattern>
      </defs>
      <rect width="800" height="200" fill="url(#ring)" stroke="transparent" />
    </svg>
  );
}
