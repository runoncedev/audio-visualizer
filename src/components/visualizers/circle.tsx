type CircleProps = {
  dataArray: number[];
};

export default function Circle({ dataArray }: CircleProps) {
  const [valueA, valueD] = dataArray;

  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      className="w-full shrink-0 bg-white stroke-black transition dark:bg-black dark:stroke-white"
    >
      <circle cx="50%" cy="50%" r={valueA * 0.5} fill="black" />
      <circle cx="50%" cy="50%" r={valueD * 0.5} fill="white" />
    </svg>
  );
}
