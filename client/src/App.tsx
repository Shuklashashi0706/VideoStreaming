import { VideoPlayer } from "6pp";
import { useState } from "react";
const App = () => {
  const [quality, setQuality] = useState<number>(480);
  return (
    <>
      <div className="">
        <VideoPlayer
          src="http://localhost:3000/video"
          setQuality={setQuality}
        />
      </div>
    </>
  );
};

export default App;
