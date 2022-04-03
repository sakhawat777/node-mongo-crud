const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const uri =
	'mongodb+srv://sakhawat:mongo3562@cluster0.tsfjt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.get('/', (req, res) => {
	res.send('Hello i am working');
});

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
	const collection = client.db('Sakhawatdb').collection('user');
	// perform actions on the collection object
	console.log('Database connected');
	client.close();
});

app.listen(3000);
