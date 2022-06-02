const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');



// GET prediction
// app.get('/api/prediction', (req, res) => {
// 	// console.log(req.body);
// 	const input = req.params.handwrittenNumber;
// 	const prediction = model.predict(tf.tensor([input], [1, 1]));
// 	console.log(prediction);
// 	// const prediction = parseInt(input) + 1;
// 	// res.json(req.body);
// });


app.post('/api/prediction', async (req, res) => {
	const model = await tf.loadLayersModel('file://trained_model/model.json');
	const input = req.body.handwrittenNumber;

	const tensr = tf.tensor(input, [1, 28, 28, 1], 'int32');
	const prediction = model.predict(tensr);
	const predictionDigit = await prediction.array().then(arr => {
		let max = 0;
		let j = 0;
		for (let i = 0; i < 10; i++) {
			if (arr[0][i] > max) {
				max = arr[0][i];
				j = i;
			}
		}
		return j;
	});
	return res.json(predictionDigit);
});

const port = 5000;

app.listen(port, () => console.log('Server started on port ' + port));