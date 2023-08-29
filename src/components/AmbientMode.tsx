import React from "react";
import useAmbientMode from "../hooks/useAmbientMode";

interface Props {
	children: React.ReactElement<HTMLVideoElement>;
	videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}
const AmbientMode = (props: Props) => {
	const { children } = props;
	const { canvasRef, videoRef } = useAmbientMode();

	return (
		<div className='wrapper'>
			{React.Children.map(children, child => {
				if (React.isValidElement(child) && child.type === "video") {
					return React.cloneElement(child, {
						ref: element => {
							if (videoRef && element) {
								videoRef.current = element;
							}
						},
					} as React.DetailedReactHTMLElement<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>);
				}
				return child;
			})}
			<canvas
				width='10'
				height='6'
				aria-hidden='true'
				className='canvas'
				ref={canvasRef}></canvas>
		</div>
	);
};

export default AmbientMode;
