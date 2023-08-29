import { useEffect, useRef } from "react";

const useAmbientMode = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const stepCountRef = useRef<number>();

	const draw = () => {
		if (!videoRef.current || !canvasRef.current) return;
		const ctx = canvasRef.current?.getContext("2d");
		ctx?.drawImage(
			videoRef.current,
			0,
			0,
			canvasRef.current?.width,
			canvasRef.current?.height
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
		if (!videoRef.current) return;

		const ctx = canvasRef.current?.getContext("2d");
		if (ctx) {
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

	return { videoRef, canvasRef };
};

export default useAmbientMode;
