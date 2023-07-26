const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const { connectDB, Task, deleteTaskById } = require('./db');

dotenv.config(); // Cargar variables de entorno desde el archivo .env

(async () => {
  try {
    // Conectar a MongoDB Atlas
    await connectDB();

    // Middleware para JSON y urlencoded
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Middleware para verificar método HTTP
    app.use((req, res, next) => {
      if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
        return res.status(400).json({ error: 'Método HTTP no válido' });
      }
      next();
    });

    // Rutas
    app.use('/list-view', (req, res, next) => {
      next();
    });
    app.use('/list-view', listViewRouter);

    app.use('/list-edit', listEditRouter);

    // Ruta para obtener los datos de la colección "tasks"
    app.get('/tasks', async (req, res) => {
      try {
        const tasks = await Task.find({});

        res.json(tasks);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
        res.status(500).json({ error: "Error al obtener las tareas" });
      }
    });

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
    
    // Ruta para insertar una tarea en la base de datos "tasks"
    app.post('/tasks', async (req, res) => {
      const { isCompleted, title, description } = req.body;
      
      const task = new Task({        
        isCompleted: false,
        title: 'conection to mongoDB Atlas',
        description:'conection is correct',
      });
    
      try {
        await task.save();
        res.json({ message: "Tarea insertada correctamente" });
      } catch (error) {
        console.error("Error al insertar la tarea:", error);
        res.status(500).json({ error: "Error al insertar la tarea" });
      }
    });

    // Ruta para obtener las tareas completadas
app.get('/completed', async (req, res) => {
  try {
    const completedTasks = await Task.find({ isCompleted: true });

    res.json(completedTasks);
  } catch (error) {
    console.error("Error al obtener las tareas completadas:", error);
    res.status(500).json({ error: "Error al obtener las tareas completadas" });
  }
});
    
    // Ruta para obtener los datos de una tarea específica de la colección "tasks" por su ID
    app.get('/tasks/:taskId', async (req, res) => {
      const taskId = req.params.taskId;
    
      try {
        const task = await Task.findById(taskId);
        res.json(task);
      } catch (error) {
        console.error("Error al obtener la tarea:", error);
        res.status(500).json({ error: "Error al obtener la tarea" });
      }
    });
    
    // Ruta para actualizar una tarea en la base de datos "tasks" por su ID
    app.put('/tasks/:taskId', async (req, res) => {
      const taskId = req.params.taskId;
      const updateData = req.body;
    
      try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        res.json(updatedTask);
      } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        res.status(500).json({ error: "Error al actualizar la tarea" });
      }
    });
    
   //Ruta para borrar una tarea de la base de datos "tasks" por su ID
    app.delete('/tasks/:taskId', async (req, res) => {
      const taskId = req.params.taskId;
    
      try {
        await deleteTaskById(taskId); 
        res.json({ message: "Tarea eliminada correctamente" });
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        res.status(500).json({ error: "Error al eliminar la tarea" });
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

    // Iniciar el servidor
    const port = 3000;
    const host = '127.0.0.1';
    app.listen(port, host, () => {
      console.log(`Servidor iniciado en el puerto ${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
})();

module.exports = app;
