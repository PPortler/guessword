const express = require('express')
const quizRoute = express.Router();

let QuizModels = require('../models/quiz');

quizRoute.route('/').get(async (req, res, next) => {
    try {
        const data = await QuizModels.find();
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

quizRoute.route('/add_quiz').post(async (req, res, next) => {
    try {
        const data = await QuizModels.create(req.body);
        res.status(201).json(data)
    } catch (err) {
        next(err)
    }
})

quizRoute.route('/:id').get(async (req, res, next) => {
    try {
        const data = await QuizModels.findById(req.params.id);
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

quizRoute.route('/update_quiz/:id').put(async (req, res, next) => {
    try {
        const data = await QuizModels.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(data)
        console.log('Quiz successfully updated');
    } catch (err) {
        next(err)
    }
})

quizRoute.route('/delete_quiz/:id').delete(async (req, res, next) => {
    try {
        const data = await QuizModels.findByIdAndDelete(req.params.id)
        res.status(200).json({
            msg: 'Quiz deleted successfully',
            data: data
        });
    } catch (err) {
        next(err)
    }
})



module.exports = quizRoute;