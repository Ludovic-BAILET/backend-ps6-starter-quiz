const { Router } = require('express')

const { Quiz, Question } = require('../../models')
const QuestionsRouter = require('./questions')

const router = new Router()

router.use('/:quizId/questions', QuestionsRouter)


router.get('/', (req, res) => {
  try {
    const quizzes = Quiz.get()
    const questions = Question.get()
    for (let j = 0; j < quizzes.length; j += 1) {
      const quiz = quizzes[j]
      const listQuestion = []
      for (let i = 0; i < questions.length; i += 1) {
        const question = questions[i]
        if (quiz.id === question.quizId) listQuestion.push(question)
      }
      quiz.questions = listQuestion
    }
    console.log(quizzes)
    res.status(200).json(quizzes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quiz = Quiz.getById(req.params.quizId)
    const questions = Question.get()
    const listQuestion = []
    for (let i = 0; i < questions.length; i += 1) {
      const question = questions[i]
      if (quiz.id === question.quizId) listQuestion.push(question)
    }
    quiz.questions = listQuestion
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    Quiz.delete(req.params.quizId)
    res.status(201).json()
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(201).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router
