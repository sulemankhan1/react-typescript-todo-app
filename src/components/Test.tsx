import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

const defaultCode = `function add(a, b) {\n  return a + b;\n}`;
const recordSpeed = 100;
const playSpeed = 100;

const Test: React.FC = () => {
  const [code, setCode] = React.useState(defaultCode);
  const [recording, setRecording] = React.useState([
    { timing: 0, content: defaultCode },
  ]);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordTiming, setRecordTiming] = React.useState(0);
  const [playTiming, setPlayTiming] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    const timerID = setInterval(() => {
      if (isRecording) {
        setRecording([...recording, { timing: recordTiming, content: code }]);
        setRecordTiming(recordTiming + 1);
      }
    }, recordSpeed);
    return () => {
      clearInterval(timerID);
    };
  }, [isRecording, recordTiming]);

  React.useEffect(() => {
    const player = setInterval(() => {
      if (isPlaying) {
        const test = recording.filter((r: any) => r.timing === playTiming);

        if (test === undefined) {
          clearInterval(player);
        } else {
          if (test.length > 0) {
            setCode(test[0].content);
          }
        }
        setPlayTiming(playTiming + 1);
      }
    }, playSpeed);
    return () => {
      clearInterval(player);
    };
  }, [playTiming, isPlaying, recording]);

  const onPlay = () => {
    setIsPlaying(true);
    setCode("");
    // const player = setInterval(() => {

    // }, 1000);
  };

  //   return <h1>{date.toLocaleTimeString()}</h1>;
  return (
    <>
      <h1>
        Click Record and then write some Code then Stop and Click on Play to
        replay what you wrote.
      </h1>
      <p>A Simple Code Recorder</p>
      <h3>{isRecording && "Recording"}</h3>
      <h3>{isPlaying && "Playing"}</h3>
      <button
        type="button"
        onClick={() => setIsRecording(!isRecording)}
        style={{ fontSize: "20px" }}
      >
        {!isRecording ? "Record" : "Stop"}
      </button>
      <button
        type="button"
        onClick={() => {
          if (!isPlaying) {
            setCode("");
          }
          setIsPlaying(!isPlaying);
        }}
        style={{ fontSize: "20px" }}
      >
        {!isPlaying ? "Play" : "Stop"}
      </button>
      <button
        style={{ fontSize: "20px" }}
        onClick={() => {
          setCode(defaultCode);
        }}
      >
        Reset
      </button>
      <CodeEditor
        value={code}
        language="js"
        placeholder="Please enter JS code."
        onChange={(evn: any) => {
          setCode(evn.target.value);
        }}
        padding={55}
        style={{
          fontSize: 28,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </>
  );
};

export default Test;
