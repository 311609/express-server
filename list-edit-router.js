const express = require('express');
const router = express.Router();
const Task = require('./db').Task;


router.get('/completed', (_req, res) => {
  console.log('Solicitud GET recibida en la ruta /list-view/completed');

  const completedTasks = [
    {      
      isCompleted: true,
      title: 'Conection with MongoDB Atlas',
      description: 'Complete task 1'
    },
    {      
      isCompleted: true,
      title: 'practice with MongoDb Atlas',
      description: 'Complete task 2'
    }
  ];

  // Realiza los cambios necesarios en la respuesta
  completedTasks[0].description = 'Updated task 1';

  res.json(completedTasks);
});

module.exports = router;
