export interface AudioVisualizerSetup {
  analyser: AnalyserNode;
  dataArray: Uint8Array;
}

export async function startAudioVisualizer(): Promise<AudioVisualizerSetup> {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });

  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 32;

  source.connect(analyser);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  return {
    analyser,
    dataArray,
  };
}

export async function startMicAudioVisualizer(): Promise<AudioVisualizerSetup> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 32;

  source.connect(analyser);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  return {
    analyser,
    dataArray,
  };
}
