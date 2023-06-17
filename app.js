const express = require('express');
const app = express();
const http = express('http');

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
