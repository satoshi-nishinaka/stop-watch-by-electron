import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useStopwatch } from 'react-timer-hook';
import React from 'react';

function ResetButton(props: { clickEvent: () => void }) {
  return <button onClick={props.clickEvent}>RESET</button>;
}

function StartPauseButton(props: { running: boolean; clickEvent: () => void }) {
  if (!props.running) {
    return <button onClick={props.clickEvent}>START</button>;
  }

  return <button onClick={props.clickEvent}>PAUSE</button>;
}

const elapse = (
  running: boolean,
  hours: number,
  minutes: number,
  seconds: number
): string => {
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
function Hello() {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  return (
    <div className="App">
      <header className='App-header'>
        Stop Watch
      </header>
      <section className="main">
        <div>
          <div className="timer">
            {elapse(isRunning, hours, minutes, seconds)}
          </div>
        </div>
        <div className="buttons">
          <ResetButton
            clickEvent={() => {
              // 2回ボタンを押すとちゃんとリセットされるんだけど…
              reset();
              pause();
            }}
          />
          <StartPauseButton
            running={isRunning}
            clickEvent={() => {
              if (isRunning) {
                pause();
              } else {
                start();
              }
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
