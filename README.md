# React Audio Visualizer

Basic SVG audio visualizer using React and TypeScript.

Supports screen share or mic and can be stopped.

Basic styling done with Tailwind, can be easily stripped off.

Most of the magic is in `src/AudioVisualizer.tsx`, specially in `handleStart` function which receives a `MediaStream` from `getUserMedia()` for mic input or `getDisplayMedia()` for screen share.
