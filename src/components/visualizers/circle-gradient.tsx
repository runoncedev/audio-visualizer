type CircleGradientProps = {
  dataArray: number[];
};

export default function CircleGradient({ dataArray }: CircleGradientProps) {
  // Generate gradient stops based on dataArray
  const stops = dataArray.map((value, i) => {
    // Offset: spread evenly from 0 to 1
    const offset = (i / (dataArray.length - 1)) * 100;
    // Invert: norm=0 (white) at center, norm=1 (black) at edge
    const norm = Math.max(0, Math.min(1, value / 255));
    // Invert color: white (center, norm=0), black (edge, norm=1)
    const color = `rgb(${255 * norm},${255 * norm},${255 * norm})`;
    return <stop key={i} offset={`${offset}%`} stopColor={color} />;
  });

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="bg-white transition  fill-black dark:bg-black dark:fill-white w-full"
    >
      <defs>
        <radialGradient id="circle-gradient" cx="50%" cy="50%" r="50%">
          {stops}
        </radialGradient>
      </defs>
      <circle cx="400" cy="100" r="90" fill="url(#circle-gradient)" />
    </svg>
  );
}
