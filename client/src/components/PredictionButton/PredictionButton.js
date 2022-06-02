import React from 'react';
import './PredictionButton.css'

const PredictionButton = (props) => {

	const predict = (input) => {
		fetch('/api/prediction',
			{
				method: 'POST',
				body: JSON.stringify(input),
				headers: { "Content-type": "application/json; charset=UTF-8" }
			}
		).then(res => res.json())
			.then(data => { props.setPredictionValue(data); });

	}

	const handwrittenNumber = [];
	for (let i = 0; i < 784; i++) {
		handwrittenNumber.push(Math.floor((Math.random() * 10)));
	}

	const getDataFromDrawing = () => {
		const canvas = document.querySelector("canvas");
		const context = canvas.getContext('2d');
		const canvasData = context.getImageData(0, 0, canvas.width, canvas.height);

		let pixels = canvasData.data;
		let grayscale = []
		for (var i = 0; i < pixels.length; i += 4) {

			let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

			grayscale.push(lightness);
		}
		// context.putImageData(canvasData, 0, 0);
		// const canvasDataArray2d = Array.prototype.slice.call(canvasData);
		// console.log(grayscale);
		return grayscale;
	}

	return (
		<div className="PredictionButton">
			<button onClick={() => predict({ 'handwrittenNumber': getDataFromDrawing() })}>Predict</button>
		</div>
	)
}

// class PredictionButton extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.predict = this.predict.bind(this);
// 	}

// 	predict(input) {
// 		fetch('/api/prediction',
// 			{
// 				method: 'POST',
// 				body: JSON.stringify(input),
// 				headers: { "Content-type": "application/json; charset=UTF-8" }
// 			}
// 		).then(res => res.json())
// 			.then(data => this.props.changePredictionValue(data));
// 	}

// 	render() {
// 		const input = { "handwrittenNumber": 5 }
// 		return (
// 			<div className="PredictionButton">
// 				<button onClick={() => this.predict(input)}>Predict</button>
// 			</div>
// 		)
// 	}
// }

export default PredictionButton;
