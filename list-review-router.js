const express = require('express');
const router = express.Router();

// Ruta para obtener todas las tareas
router.get('/', (req, res) => {
  console.log('Solicitud GET recibida en la ruta /list-view');

  const tasks = [
    {
      id: '123456',
      isCompleted: false,
      description: 'writhe in english'
    }
  ];

  tasks[0].description = 'Walk the cat';

  res.json(tasks);
});

// Ruta para obtener las tareas completadas
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

// Ruta para obtener una tarea por su ID
router.get('/:taskId', (req, res) => {
  console.log(`Solicitud GET recibida en la ruta /list-view/${req.params.taskId}`);

  // Obtén el ID de la tarea de los parámetros de la solicitud
  const taskId = req.params.taskId;

  // Realiza las operaciones necesarias para obtener la tarea por su ID

  const task = {
    id: taskId,
    isCompleted: false,
    description: 'Task description'
  };

  res.json(task);
});

module.exports = router;
