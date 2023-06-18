const express = require('express');
const listViewRouter = express.Router();

// Ruta para listar las tareas completas
listViewRouter.get('/completed', (req, res) => {
  // Lógica para obtener las tareas completas
  const completedTasks = [
    {
      id: '123457',
      isCompleted: true,
      description: 'Do the laundry'
    }
  ];
  res.json(completedTasks);
});

// Ruta para listar las tareas incompletas
listViewRouter.get('/incomplete', (req, res) => {
  // Lógica para obtener las tareas incompletas
  const incompleteTasks = [
    {
      id: '123458',
      isCompleted: false,
      description: 'Buy groceries'
    }
  ];
  res.json(incompleteTasks);
});

module.exports = listViewRouter;
