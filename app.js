const express = require('express');
const app = express();


app.use(express.json()); // Middleware para procesar el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Middleware para procesar el cuerpo de las solicitudes URL-encoded

// Middleware para gestionar solicitudes por métodos HTTP válidos
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }
  next();
});


// Middleware para el router list-edit-router
const listEditMiddleware = (req, res, next) => {
  if (req.method === 'POST') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Cuerpo de la solicitud vacío' });
    }
  
    // Si hay información no válida o atributos faltantes, retorna un código de respuesta 400
  }

  if (req.method === 'PUT') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Cuerpo de la solicitud vacío' });
    }
  
    // Si hay información no válida o atributos faltantes, retorna un código de respuesta 400
  }

  next();
};

// Middleware para el direccionador list-view-router
const listViewMiddleware = (req, res, next) => {

  // Si los parámetros no son correctos, retorna un código de respuesta 400
  next();
};

app.use('/list-edit', listEditMiddleware);
app.use('/list-view', listViewMiddleware);

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
