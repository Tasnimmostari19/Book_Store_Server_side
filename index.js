// password: I1Wkguo92sseKQqD
// username: Geyanpipasha

const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();

const { MongoClient } = require('mongodb');
app.use(cors());
app.use(express.json());

const port = 5000;




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b1ws8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);
// client.connect(err => {
//     const collection = client.db("Geyanpipasha").collection("books");
//     // perform actions on the collection object
//     client.close();
// });

async function run() {
    try {
        await client.connect();
        // console.log('connected');
        const database = client.db("Geyanpipasha");
        const booksCollection = database.collection("books");



        ///get all data
        app.get('/books', async (req, res) => {
            const cursor = booksCollection.find({});
            const books = await cursor.toArray();
            res.send(books);
        })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})





