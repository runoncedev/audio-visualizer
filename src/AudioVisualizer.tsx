import { useRef, useState } from "react";
import {
  startAudioVisualizer,
  startMicAudioVisualizer,
  type AudioVisualizerSetup,
} from "./startAudioVisualizer";

export default function AudioVisualizer() {
  const [dataArray, setDataArray] = useState<number[]>([]);
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
    const barWidth = 800 / dataArray.length;
    const x = i * barWidth;
    const barHeight = value * 0.2;
    const y = i % 2 ? 100 - barHeight : 100 + barHeight;
    return `${x},${y}`;
  });

  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <button onClick={handleStart}>Start Visualizer</button>
      <button onClick={handleStartMic}>Start Mic Visualizer</button>
      <svg width="800" height="200">
        <polyline
          points={points.join(" ")}
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
