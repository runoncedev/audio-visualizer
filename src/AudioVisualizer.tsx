import { useRef, useState } from "react";

import Button from "./components/button";
import Circles from "./components/visualizers/circles";
import Dots from "./components/visualizers/dots";
import Polyline from "./components/visualizers/polyline";
import Polylines from "./components/visualizers/polylines";

export default function AudioVisualizer() {
  const [dataArray, setDataArray] = useState<number[]>(new Array(128).fill(0));

  const [isPlaying, setIsPlaying] = useState(false);

  // Refs used for stopping
  const animationFrameIdRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleStart = async (stream: MediaStream) => {
    setIsPlaying(true);

    audioCtxRef.current = new AudioContext();
    sourceRef.current = audioCtxRef.current.createMediaStreamSource(stream);

    const analyser = audioCtxRef.current.createAnalyser();
    analyser.fftSize = 32;

    sourceRef.current.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameIdRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      setDataArray([...dataArray]);
    };

    draw();
  };

  const handleStop = () => {
    setIsPlaying(false);

    streamRef.current?.getTracks().forEach((track) => track.stop());

    audioCtxRef.current?.close();
    sourceRef.current?.disconnect();

    setDataArray(new Array(128).fill(0));

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
  };

  return (
    <div className="transition flex flex-col items-center justify-center h-dvh bg-white dark:bg-black">
      <div className="flex gap-4 absolute top-2 left-2">
        {!isPlaying && (
          <>
            {navigator.mediaDevices?.getUserMedia && (
              <Button
                onClick={async () => {
                  const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                  });

                  streamRef.current = stream;

                  stream.getTracks().forEach((track) => {
                    track.addEventListener("ended", () => {
                      handleStop();
                    });
                  });

                  handleStart(stream);
                }}
              >
                Start mic
              </Button>
            )}
            {navigator.mediaDevices?.getDisplayMedia && (
              <Button
                onClick={async () => {
                  const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true,
                  });

                  streamRef.current = stream;

                  stream.getTracks().forEach((track) => {
                    track.addEventListener("ended", () => {
                      handleStop();
                    });
                  });

                  handleStart(stream);
                }}
              >
                Share screen
              </Button>
            )}
          </>
        )}
        {isPlaying && <Button onClick={handleStop}>Stop</Button>}
      </div>
      <Polyline dataArray={dataArray} />
      <Dots dataArray={dataArray} />
      <Circles dataArray={dataArray} />
      <Polylines dataArray={dataArray} />
    </div>
  );
}
