const express = require('express');
const router = express.Router();
const Task = require('./db').Task;




router.get('/', async (req, res) => {
  try {
    // Realizar la consulta a la base de datos para obtener todas las tareas
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});


// Ruta para obtener todas las tareas
router.get('/', (req, res) => {
  console.log('Solicitud GET recibida en la ruta /list-view');

  const tasks = [
    {     
      isCompleted: false,
      title: 'Task name',
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
      isCompleted: true,
      title: 'Task name',
      description: 'Complete task 1'
    },
    {      
      isCompleted: true,
      title: 'Task name',
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
    isCompleted: false,
    title: 'Task name',
    description: 'Task description'
  };

  res.json(task);
});

module.exports = router;
