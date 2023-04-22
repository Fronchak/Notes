const { ObjectId } = require('mongodb');
const conn = require('../db/connection');

const NOTE = 'note';

class Note {

    constructor(title, description, id = undefined) {
        this.title = title;
        this.description = description;
        this.id = id;
    }

    async save() {
        const result = await conn.db().collection(NOTE).insertOne({
            title: this.title,
            description: this.description
        });
        const { insertedId } = result;
        const note = await conn.db().collection(NOTE).findOne({ _id: insertedId });
        return note;
    }

    static async findAll() {
        return await conn.db().collection(NOTE).find().toArray();
    }

    static async findById(id) {
        return await conn.db().collection(NOTE).findOne({ _id: new ObjectId(id) });
    }

    async update() {
        await conn.db().collection(NOTE).updateOne({ _id: new ObjectId(this.id) }, {
            $set: {
                title: this.title,
                description: this.description
            }
        });
        return await Note.findById(this.id);
    }

    static async deleteById(id) {
        await conn.db().collection(NOTE).deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = Note;