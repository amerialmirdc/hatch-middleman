import axios from 'axios'
import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://amerial:DGdadJcdn6vXwgJe@cluster0.dqskw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a new client and connect to MongoDB
const client = new MongoClient(uri);


export default async function handler(req, res) {
    const token = req.headers['authorization']
    const data = req.body

    const config = {
        headers: {
            "Authorization": token
        }
    }

    if(token){
        return await new Promise((resolve, reject) => {
            axios.post('https://ras-backend.ap.ngrok.io/api/hatch-readings', data, config)
            .then(response => {
                // console.log('data', response.data)
              res.status(200).json({ data: response.data });


              // insert data to mongodb

                async function run() {
                    try {
                      // Connect to the "insertDB" database and access its "haiku" collection
                      const database = client.db("dost");
                      const hatch_readings = database.collection("hatch-readings");

                      // Insert the defined document into the "haiku" collection
                      const data = {
                        id: response.data?.data?.id,
                        ...response.data?.data?.attributes
                      }
                      const result = await hatch_readings.insertOne(data);
                      // Print the ID of the inserted document
                      console.log(`A document was inserted with the _id: ${result.insertedId}`);
                    } finally {
                       // Close the MongoDB client connection
                      await client.close();
                    }
                  }
                  // Run the function and handle any errors
                  run().catch(console.dir);


              resolve();
            })
            .catch(err => {
                console.log(err.response)
                res.status(500).json({
                    message: "not authorized!"
                })  
                resolve();
            });
          });
    }else{
        return res.status(403).json({message: 'Unauthorized access'})
    }
}