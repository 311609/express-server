const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
const listReviewRouter = require('./list-review-router');
const listEditRouter = require('./list-edit-router');

dotenv.config(); // Cargar variables de entorno desde el archivo .env

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }
  next();
});

app.use('/list-review', (req, res, next) => {
  next();
});

app.use('/list-review', listReviewRouter);

app.use('/list-edit', listEditRouter);

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

// Ruta de autenticación (inicio de sesión)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar las credenciales del usuario
  if (username === 'admin' && password === 'password') {
    // Generar el token JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Middleware para validar el token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autenticación inválido' });
    }
    req.user = user;
    next();
  });
};

// Ruta protegida que requiere autenticación
app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'Ruta protegida accesada con éxito' });
});

const port = 3000;
const host = 'localhost';
app.listen(port, host, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
