var express = require('express');
var router = express.Router();
var LessonModel = require('../models/lesson.model.js');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).json("not found");
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).json(err);
  };
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'edu' });
});

router.get('/lessons', function (req, res, next) {
  LessonModel.find({})
    .then(respondWithResult(res))
    .catch(handleError(res));
});

router.get('/lessons/:id', function (req, res, next) {
  LessonModel.findOne(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
});

router.post('/lessons', function (req, res, next) {
  LessonModel.create(req.body)
    .then(respondWithResult(res))
    .catch(handleError(res));
});

router.put('/lessons/:id', function (req, res, next) {
  LessonModel.update({_id: rq.params.id}, req.body)
    .then(respondWithResult(res))
    .catch(handleError(res));
});

router.delete('/lessons/:id', function (req, res, next) {
  LessonModel.remove(req.params.id)
    .then(respondWithResult(res))
    .catch(handleError(res));
})

module.exports = router;
