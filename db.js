const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Definir el esquema para el modelo Task
const taskSchema = new mongoose.Schema({
  isCompleted: Boolean,
  title: String,
  description: String,
});

// Crear el modelo Task a partir del esquema
const Task = mongoose.model('Task', taskSchema);

const connectDB = async () => {
  try { 
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión exitosa a MongoDB Atlas');
    return true; // Devolvemos "true" para indicar éxito
  }
  catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
    throw error; // Lanzar un error para que se capture en el archivo serverAtlas.js
  }
};

async function deleteTaskById(taskId) {
  try {
    const result = await Task.findByIdAndDelete(taskId);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { connectDB, Task, deleteTaskById };
