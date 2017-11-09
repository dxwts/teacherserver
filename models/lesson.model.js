'use strict';

var Promise = require("bluebird");
var Datastore = require('nedb');
var db = new Datastore({
    filename: __dirname + '/../db/lessons.db',
    autoload: true
  });

var  LessonModel = function () {

}

LessonModel.prototype.save = function() {
  return new Promise((resolve, reject) => {
    db.insert(this, (err, doc) => {
      if (err) {
        return reject(err);
      }
      return resolve(doc);
    });
  });
};

LessonModel.prototype.remove = function () {
  return new Promise((resolve, reject) => {
    db.remove({_id: this._id}, err => {
      if (err) {
        return reject(err);
      }
      return resolve('success');
    });
  });
};

LessonModel.create = function(doc) {
  return new Promise((resolve, reject) => {
    db.insert(doc, (err, doc) => {
      if (err) {
        return reject(err);
      }
      return resolve(doc);
    });
  });
};

LessonModel.update = function (query, doc, options = {}) {
  return new Promise((resolve, reject) => {
    db.update(query, doc, options, err => {
      if (err) {
        return reject(err);
      }
      return resolve('success');
    });
  });
};

LessonModel.find = function (query = {}) {
  return new Promise((resolve, reject) => {
    db.find(query, (err, docs) => {
      if (err) {
        return reject(err);
      }
      return resolve(docs);
    })
  });
};

LessonModel.findOne = function (id) {
  return new Promise((resolve, reject) => {
    db.findOne({_id: id}, (err, doc) => {
      if (err) {
        return reject(err);
      }
      return resolve(doc);
    });
  });
};

LessonModel.remove = function (id, options = {}) {
  return new Promise((resolve, reject) => {
    db.remove({_id: id}, options, err => {
      if (err) {
        return reject(err);
      }
      return resolve('success');
    });
  });
};

LessonModel.createOrUpdate = function (doc) {
  return new Promise((resolve, reject) => {
    if (doc._id) {
      db.update(query, doc, options, err => {
        if (err) {
          return reject(err);
        }
        return LessonModel.findOne(doc._id)
          .then(res => {
            return resolve(res);
          });
      });
    } else {
      db.insert(doc, (err, doc) => {
        if (err) {
          return reject(err);
        }
        return resolve(doc);
      });
    }
  });
}

module.exports = LessonModel;
