const { Router } = require('express')

const { Question } = require('../../../models')

const router = new Router({ mergeParams: true })


router.get('/', (req, res) => {
  try {
    const question = Question.get().filter((quest) => quest.quizId === parseInt(req.params.quizId, 10))
    res.status(200).json(question)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = Question.getById(req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const question = Question.create({ ...req.body, quizId: parseInt(req.params.quizId, 10) })
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    Question.delete(req.params.questionId)
    res.status(201).json()
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(201).json(Question.update(req.params.quizId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
