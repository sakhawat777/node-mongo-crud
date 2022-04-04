const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const uri =
	'mongodb+srv://sakhawat:mongo3562@cluster0.tsfjt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
	const collection = client.db('organicProduct').collection('Products');
	// perform actions on the collection object
	app.post('/addProduct', (req, res) => {
		const product = req.body;
		collection.insertOne(product).then((result) => {
			console.log('Data added Successfully');
			res.send('Success');
		});
	});
});

app.listen(3000);
