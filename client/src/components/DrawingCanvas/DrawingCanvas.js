import React, { useEffect, useState, useRef } from 'react';
import './DrawingCanvas.css';
const DrawingCanvas = () => {
	const canvasRef = useRef(null);


	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');

		canvas.width = 28;
		canvas.height = 28;

		context.fillStyle = '#FFFFFF';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		let x = 0;
		let y = 0;
		let isDrawing = false;

		canvas.addEventListener('mousedown', e => {
			x = e.offsetX;
			y = e.offsetY;
			isDrawing = true;
		});

		canvas.addEventListener('mousemove', e => {
			let scale = 28.0 / 300.0;
			if (isDrawing === true) {
				drawLine(context, x * scale, y * scale, e.offsetX * scale, e.offsetY * scale);
				x = e.offsetX;
				y = e.offsetY;
			}
		});

		window.addEventListener('mouseup', e => {
			let scale = 28.0 / 300.0;
			if (isDrawing === true) {
				drawLine(context, x * scale, y * scale, e.offsetX * scale, e.offsetY * scale);
				x = 0;
				y = 0;
				isDrawing = false;
			}
		});

		function drawLine(context, x1, y1, x2, y2) {
			context.beginPath();
			context.strokeStyle = 'black';
			context.lineWidth = 3;
			context.lineCap = 'round';
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.stroke();
			context.closePath();
		}

	}, [])



	return (
		<canvas ref={canvasRef} className="DrawingCanvas" />
	)
}

export default DrawingCanvas;