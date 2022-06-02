import React, { useEffect, useState } from 'react';
import './PredictionDisplay.css';

const PredictionDisplay = (props) => {
	useEffect(() => {
		setPredictionValue(props.predictionValue);
	}, [props.predictionValue])

	const [predictionValue, setPredictionValue] = useState(0);

	return (
		<div className="PredictionDisplay">
			<div className="frame">
				<h1>{predictionValue}</h1>
			</div>
		</div>
	)
}

export default PredictionDisplay;