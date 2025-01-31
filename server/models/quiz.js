const mongo = require('mongoose')
const Schema = mongo.Schema;

let quizSchema = new Schema({
    title: {
        type: String,
        unique: true, // ทำให้ title ต้องไม่ซ้ำ
        required: true, // ให้ title เป็นฟิลด์ที่จำเป็นต้องมี
    },
    image: {
        type: String
    },
    choices: [
        {
            choice: {
                type: String
            },
            answer: {
                type: Boolean
            }
        }
    ],
    author: {
        type: String
    }
}, {
    collection: 'quiz', 
})

module.exports = mongo.model('Quizs', quizSchema)