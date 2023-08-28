import { useEffect, useRef } from "react";
import "./App.css";
import video1 from "./assets/video-1.mp4";
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
			ctx.filter = "blur(2px)";

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
		<div className='wrapper'>
			<video controls ref={videoRef} className='video'>
				<source src={video1} type='video/webm' />
			</video>
			<canvas
				width='10'
				height='6'
				aria-hidden='true'
				className='canvas'
				ref={canvas}></canvas>
		</div>
	);
}

export default App;
