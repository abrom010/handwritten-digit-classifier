import React, { useState } from 'react';
import './App.css';

import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import PredictionButton from './components/PredictionButton/PredictionButton';
import PredictionDisplay from './components/PredictionDisplay/PredictionDisplay';

// do my predictions like a basketball score widget

const App = () => {
	const [handwrittenNumber, setHandwrittenNumber] = useState();
	const [predictionValue, setPredictionValue] = useState(0);

	return (
		<div className="App">
			<div className="outer-container">
				<div className="drawing-container">
					<DrawingCanvas setHandwrittenNumber={setHandwrittenNumber} />
					<PredictionButton handwrittenNumber={handwrittenNumber} setPredictionValue={setPredictionValue} />
				</div>

				<PredictionDisplay predictionValue={predictionValue} />
			</div>
		</div>
	)
}

export default App;