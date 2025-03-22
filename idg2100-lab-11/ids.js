const { MongoClient } = require('mongodb');

// MongoDB URI and Database Details
const uri = 'mongodb://localhost:27018';
const dbName = 'testDB';
const collectionName = 'randomNumbers';

async function generateNCheckRandIds() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const randomIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);

        for (const id of randomIds) {
            const existing = await collection.findOne({ random_id: id });

            if (existing) {
                console.log(`ID ${id} already exists in the collection`);
            } else {
                await collection.insertOne({ random_id: id});
                console.log(`ID ${id} inserted into the collection`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

generateNCheckRandIds();