const express = require('express');
const app = express();
const listViewRouter = require('./list-review-router');
const listEditRouter = require('./list-edit-router');

app.use(express.json()); // Middleware para procesar el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Middleware para procesar el cuerpo de las solicitudes URL-encoded

// Middleware a nivel de aplicación para gestionar métodos HTTP válidos
app.use((req, res, next) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }

  next();
});

// Middleware para gestionar parámetros correctos en el direccionador list-view-router
app.use('/list-view', (req, res, next) => {
  // Verificar si los parámetros son correctos (por ejemplo, si existen y tienen el formato adecuado)
  // Si los parámetros no son correctos, se puede devolver un código de respuesta 400 y un mensaje de error
  // En caso contrario, llamar a next() para pasar al siguiente middleware o enrutador
  next();
});

// Rutas para listar tareas completas e incompletas
app.use('/list-view', listViewRouter);

// Rutas para crear, eliminar y actualizar tareas
app.use('/list-edit', listEditRouter);

// Ruta para obtener la lista de tareas
app.get('/tasks', (req, res) => {
  console.log('Solicitud GET recibida en la ruta /tasks');

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

const port = 3000;
const host = 'localhost';
app.listen(port, host, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
