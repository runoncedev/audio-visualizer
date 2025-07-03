import { useRef, useState } from "react";
import {
  startAudioVisualizer,
  startMicAudioVisualizer,
  type AudioVisualizerSetup,
} from "./startAudioVisualizer";

export default function AudioVisualizer() {
  const [dataArray, setDataArray] = useState<number[]>(new Array(128).fill(0));
  const setupRef = useRef<AudioVisualizerSetup | null>(null);

  const handleStart = async () => {
    const setup = await startAudioVisualizer();
    setupRef.current = setup;

    const draw = () => {
      requestAnimationFrame(draw);
      setup.analyser.getByteFrequencyData(setup.dataArray);
      setDataArray([...setup.dataArray]);
    };

    draw();
  };

  const handleStartMic = async () => {
    const setup = await startMicAudioVisualizer();
    setupRef.current = setup;

    const draw = () => {
      requestAnimationFrame(draw);
      setup.analyser.getByteFrequencyData(setup.dataArray);
      setDataArray([...setup.dataArray]);
    };

    draw();
  };

  const points = dataArray.map((value, i) => {
    const barWidth = 800 / (dataArray.length - 1);
    const x = i * barWidth;
    const barHeight = value * 0.2;
    const y = i % 2 ? 100 - barHeight : 100 + barHeight;
    return `${x},${y}`;
  });

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-black">
      <div className="flex gap-4 absolute top-0 left-0 text-white">
        <button onClick={handleStart}>Share screen</button>
        <button onClick={handleStartMic}>Start mic</button>
      </div>
      <svg
        width="800"
        height="200"
        viewBox="0 0 800 200"
        className="bg-black stroke-white w-full"
      >
        <polyline points={points.join(" ")} strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}
