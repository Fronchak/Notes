const { MongoClient } = require('mongodb')

const url = "mongodb://localhost:27017/notesDB";

const conn = new MongoClient(url);

module.exports = conn;