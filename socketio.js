
'use strict';

var LessonModel = require('./models/lesson.model.js');

function onDisconnect(/*socket*/) {}


function onConnect(socket) {
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });

  socket.on('join', data => {
    socket.join(data.channel, () => {
      socket.broadcast.to(data.channel).emit('new user', data.content);
    });
  });

  socket.on('mouse:down', function (data) {
    socket.broadcast.emit('mouse:down', data);
  })
  socket.on('mouse:up', function (data) {
    socket.broadcast.emit('mouse:up', data);
    // LessonModel.createOrUpdate(data);
  })
  socket.on('mouse:move', function (data) {
    socket.broadcast.emit('mouse:move', data);
  })
  socket.on('object:added', function (data) {
    socket.broadcast.emit('object:added', data);
    // LessonModel.createOrUpdate(data);
  })
  socket.on('object:removed', function (data) {
    socket.broadcast.emit('object:removed', data);
    // LessonModel.createOrUpdate(data);
  })
  socket.on('object:modified', function (data) {
    socket.broadcast.emit('object:modified', data);
    // LessonModel.createOrUpdate(data);
  })
  socket.on('object:rotating', function (data) {
    socket.broadcast.emit('object:rotating', data);
  })
  socket.on('object:scaling', function (data) {
    socket.broadcast.emit('object:scaling', data);
  })
  socket.on('object:moving', function (data) {
    socket.broadcast.emit('object:moving', data);
  })
  socket.on('object:selected', function (data) {
    socket.broadcast.emit('object:selected', data);
  })
  socket.on('before:selection:cleared', function (data) {
    socket.broadcast.emit('before:selection:cleared', data);
  })
  socket.on('selection:cleared', function (data) {
    socket.broadcast.emit('selection:cleared', data);
  })
  socket.on('selection:updated', function (data) {
    socket.broadcast.emit('selection:updated', data);
  })
  socket.on('path:created', function (data) {
    socket.broadcast.emit('path:created', data);
  })

  socket.on('canvas:update', function (data) {
    socket.broadcast.emit('canvas:update', data);
    LessonModel.createOrUpdate(data);
  })

}

var socketioHandle = function (socketio) {
  socketio.on('connection', function(socket) {
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
}

module.exports = socketioHandle;
