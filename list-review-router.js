const express = require('express');
const router = express.Router();

router.get('/completed', (req, res) => {
  console.log('Solicitud GET recibida en la ruta /list-view/completed');

  const completedTasks = [
    {
      id: '123456',
      isCompleted: true,
      description: 'Complete task 1'
    },
    {
      id: '789012',
      isCompleted: true,
      description: 'Complete task 2'
    }
  ];

  // Realiza los cambios necesarios en la respuesta
  completedTasks[0].description = 'Updated task 1';

  res.json(completedTasks);
});

module.exports = router;
