type TurbulenceProps = {
  dataArray: number[];
};

export default function Turbulence({ dataArray }: TurbulenceProps) {
  return (
    <svg
      width="800"
      height="200"
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="displacementFilter">
        <feTurbulence
          type="turbulence"
          baseFrequency={Math.max(0.01, Math.min(0.1, dataArray[0] / 2550))}
          numOctaves={Math.max(1, Math.min(5, Math.floor(dataArray[1] / 51)))}
          result="turbulence"
        />
        <feDisplacementMap
          in2="turbulence"
          in="SourceGraphic"
          scale={Math.max(10, Math.min(100, dataArray[2]))}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      <circle
        cx="100"
        cy="100"
        r={100}
        className="fill-white dark:fill-white"
        filter="url(#displacementFilter)"
      />
    </svg>
  );
}
