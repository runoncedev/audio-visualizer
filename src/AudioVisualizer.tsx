import { useRef, useState } from "react";

import { twMerge } from "tailwind-merge";
import Button from "./components/button";
import Circles from "./components/visualizers/circles";
import Division from "./components/visualizers/division";
import Dots from "./components/visualizers/dots";
import Polygon from "./components/visualizers/polygon";
import Polyline from "./components/visualizers/polyline";
import Polylines from "./components/visualizers/polylines";
import StraightLines from "./components/visualizers/straight-lines";

const formatSampleRate = (sampleRate: number): string => {
  if (sampleRate >= 1000) {
    return `${(sampleRate / 1000).toFixed(1)} kHz`;
  }
  return `${sampleRate} Hz`;
};

const defaultDataArray = new Array(16).fill(0);

export default function AudioVisualizer() {
  const [dataArray, setDataArray] = useState<number[]>(defaultDataArray);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Refs used for stopping
  const animationFrameIdRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileAudioCtxRef = useRef<AudioContext | null>(null);
  const fileSourceRef = useRef<AudioBufferSourceNode | null>(null);

  console.log(
    "sample rate!",
    formatSampleRate(audioCtxRef.current?.sampleRate ?? 0),
  );

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
    fileSourceRef.current?.stop();
    fileAudioCtxRef.current?.close();

    setDataArray(defaultDataArray);

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
  };

  const visualizers = [
    <Polyline dataArray={dataArray} />,
    <Dots dataArray={dataArray} />,
    <Circles dataArray={dataArray} />,
    <Polylines dataArray={dataArray} />,
    <StraightLines dataArray={dataArray} />,
    <Division dataArray={dataArray} />,
    <Polygon dataArray={dataArray} />,
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-white p-4 transition dark:bg-black">
      <div className="flex flex-col flex-wrap items-start gap-4 self-start sm:flex-row">
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
                disabled={isLoading}
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
                disabled={isLoading}
              >
                Share screen
              </Button>
            )}
            <div className="flex items-center gap-2">
              <input
                className={twMerge(
                  "w-full min-w-0 shrink rounded-lg border border-transparent text-slate-300 transition file:mr-4 file:h-full file:px-4 file:py-2 hover:border-slate-400 hover:text-slate-500 dark:text-slate-600 dark:hover:border-slate-500 dark:hover:text-slate-400",
                  isLoading && "text-slate-500",
                )}
                type="file"
                accept="audio/*"
                disabled={isLoading}
                onChange={async (event) => {
                  const file = event.target.files?.[0];

                  if (!file) return;

                  setIsLoading(true);

                  try {
                    // Create audio context and source from file
                    const audioCtx = new AudioContext();
                    fileAudioCtxRef.current = audioCtx;

                    const arrayBuffer = await file.arrayBuffer();
                    const audioBuffer =
                      await audioCtx.decodeAudioData(arrayBuffer);

                    // Create a buffer source
                    const source = audioCtx.createBufferSource();
                    fileSourceRef.current = source;
                    source.buffer = audioBuffer;

                    // Create a MediaStreamDestination to get a stream
                    const destination = audioCtx.createMediaStreamDestination();

                    // Connect to both the destination (for analysis) and speakers (for audio output)
                    source.connect(destination);
                    source.connect(audioCtx.destination);

                    // Start playing
                    source.start();

                    // Get the stream and pass it to handleStart
                    const stream = destination.stream;
                    streamRef.current = stream;

                    source.addEventListener("ended", () => {
                      handleStop();
                    });

                    stream.getTracks().forEach((track) => {
                      track.addEventListener("ended", () => {
                        handleStop();
                      });
                    });

                    handleStart(stream);
                    setIsLoading(false);
                  } catch (error) {
                    console.error("Error loading audio file:", error);
                    setIsLoading(false);
                  }
                }}
              />
              {isLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin stroke-slate-400 dark:stroke-slate-300"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
            </div>
          </>
        )}
        {isPlaying && <Button onClick={handleStop}>Stop</Button>}
      </div>
      {visualizers.map((visualizer, index) => (
        <div key={index} className="max-w-[600px]">
          {visualizer}
        </div>
      ))}
    </div>
  );
}
