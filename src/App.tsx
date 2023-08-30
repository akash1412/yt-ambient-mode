import { useRef } from "react";
import "./App.css";
import video1 from "./assets/video-1.mp4";
import AmbientMode from "./components/AmbientMode";
function App() {
	return (
		<AmbientMode>
			<video controls>
				<source src={video1} type='video/webm' />
			</video>
		</AmbientMode>
	);
}

export default App;
