const express = require('express');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use(express.json()); // Middleware para procesar el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Middleware para procesar el cuerpo de las solicitudes URL-encoded

// Rutas para listar tareas completas e incompletas
app.use('/list-view', listViewRouter);

// Rutas para crear, eliminar y actualizar tareas
app.use('/list-edit', listEditRouter);

// Ruta para obtener la lista de tareas
app.get('/tasks', (req, res) => {
  const tasks = [
    {
      id: '123456',
      isCompleted: false,
      description: 'Walk the dog'
    }
  ];
  res.json(tasks);
});

const port = 3000;
const host = 'localhost';
app.listen(port, host, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
