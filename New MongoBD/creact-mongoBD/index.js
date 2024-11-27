const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
//users-10
//3rk6q0mOSJfoAj0S

const uri =
  'mongodb+srv://users-10:3rk6q0mOSJfoAj0S@cluster0.whh17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db('userDB');
    const userCollaction = database.collection('users');
    app.get('/users', async (req, res) => {
      const cursor = userCollaction.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user', user);
      const result = await userCollaction.insertOne(user);

      res.send(result);
    });
    //delete
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log('user delete', id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollaction.deleteOne(query);
      res.send(result);
    });
    //update
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollaction.findOne(query);
      res.send(result);
    });
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('simpole crud is running');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
