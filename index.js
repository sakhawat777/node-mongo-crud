const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
// import objectId from mongodb
const objectId = require('mongodb').ObjectId;
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
	// Make API From Database
	app.get('/products', (req, res) => {
		collection
			.find({})
			// limit 4 products
			// .limit(4)
			.toArray((err, documents) => {
				res.send(documents);
			});
	});
	// Update
	app.get('/product/:id', (req, res) => {
		collection
			.find({ _id: objectId(req.params.id) })
			.toArray((err, documents) => {
				res.send(documents[0]);
			});
	});
	// Data post From Frontend Submit Form
	app.post('/addProduct', (req, res) => {
		const product = req.body;
		collection.insertOne(product).then((result) => {
			console.log('Data added Successfully');
			// res.send('Success');
			res.redirect('/');
		});
	});
	// Update / Edit
	app.patch('/update/:id', (req, res) => {
		collection
			.updateOne(
				{ _id: objectId(req.params.id) },
				{
					$set: {
						name: req.body.name,
						price: req.body.price,
						quantity: req.body.quantity,
					},
				}
			)
			.then((result) => {
				console.log(result);
			});
	});
	// Delete
	app.delete('/delete/:id', (req, res) => {
		collection.deleteOne({ _id: objectId(req.params.id) }).then((result) => {
			res.send(result.deletedCount > 0);
		});
	});
});

app.listen(3000);
