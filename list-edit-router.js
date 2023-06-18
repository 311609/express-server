const express = require('express');
const router = express.Router();

// Ruta para crear una tarea
router.post('/', (req, res) => {
  console.log('Solicitud POST recibida en la ruta /list-edit');

  // Obtén los datos de la tarea del cuerpo de la solicitud
  const { id, isCompleted, description } = req.body;

  // Realiza las operaciones necesarias para crear la tarea

  res.json({ message: 'Tarea creada exitosamente' });
});

// Ruta para eliminar una tarea
router.delete('/:taskId', (req, res) => {
  console.log('Solicitud DELETE recibida en la ruta /list-edit/:taskId');

  // Obtén el ID de la tarea de los parámetros de la solicitud
  const taskId = req.params.taskId;

  // Realiza las operaciones necesarias para eliminar la tarea

  res.json({ message: 'Tarea eliminada exitosamente' });
});

// Ruta para actualizar una tarea
router.put('/:taskId', (req, res) => {
  console.log('Solicitud PUT recibida en la ruta /list-edit/:taskId');

  // Obtén el ID de la tarea de los parámetros de la solicitud
  const taskId = req.params.taskId;

  // Obtén los nuevos datos de la tarea del cuerpo de la solicitud
  const { isCompleted, description } = req.body;

  // Realiza las operaciones necesarias para actualizar la tarea

  res.json({ message: 'Tarea actualizada exitosamente' });
});

module.exports = router;
