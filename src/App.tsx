import { useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import video from "./assets/video.webm";
function App() {
	const canvas = useRef<HTMLCanvasElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const stepCountRef = useRef<number>();

	const draw = () => {
		if (!videoRef.current || !canvas.current) return;
		const ctx = canvas.current?.getContext("2d");
		ctx?.drawImage(
			videoRef.current,
			0,
			0,
			canvas.current?.width,
			canvas.current?.height
		);
	};

	const drawLoop = () => {
		draw();
		stepCountRef.current = window.requestAnimationFrame(drawLoop);
	};

	const drawPause = () => {
		window.cancelAnimationFrame(stepCountRef?.current ?? 0);
		stepCountRef.current = undefined;
	};

	const init = () => {
		const ctx = canvas.current?.getContext("2d");
		if (ctx && videoRef.current) {
			ctx.filter = "blur(1px)";

			videoRef.current.addEventListener("loadeddata", draw, false);
			videoRef.current.addEventListener("seeked", draw, false);
			videoRef.current.addEventListener("play", drawLoop, false);
			videoRef.current.addEventListener("pause", drawPause, false);
			videoRef.current.addEventListener("ended", drawPause, false);
		}
	};

	const cleanup = () => {
		if (!videoRef.current) return;

		videoRef.current.removeEventListener("loadeddata", draw);
		videoRef.current.removeEventListener("seeked", draw);
		videoRef.current.removeEventListener("play", draw);
		videoRef.current.removeEventListener("pause", draw);
		videoRef.current.removeEventListener("ended", draw);
	};

	useEffect(() => {
		init();

		return cleanup();
	}, []);

	return (
		<>
			<div className='wrapper'>
				<video
					controls
					style={{ width: "1000px", height: "600px", objectFit: "cover" }}
					ref={videoRef}
					className='video'>
					<source src={video} type='video/webm' />
					<canvas
						width='10'
						height='6'
						aria-hidden='true'
						className='canvas'
						id='js-canvas'
						ref={canvas}></canvas>
				</video>
			</div>
		</>
	);
}

export default App;
