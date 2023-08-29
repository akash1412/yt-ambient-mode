import { useRef } from "react";
import "./App.css";
import video1 from "./assets/video-1.mp4";
import AmbientMode from "./components/AmbientMode";
function App() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	return (
		<>
			<AmbientMode videoRef={videoRef}>
				<video controls ref={videoRef} className='video'>
					<source src={video1} type='video/webm' />
				</video>
			</AmbientMode>
		</>
	);
}

export default App;
