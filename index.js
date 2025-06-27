const express = require('express');
const app = express();
const PORT = 3000;

// Simulando base de datos en memoria (no persistente)
const usuarios = [
  { email: "admin@gmail.com", contraseña: "123456" }
];

app.use(express.json()); // Permite procesar JSON en las peticiones

// Ruta para registrar un nuevo usuario
app.post('/api/registro', (req, res) => {
  const { email, contraseña } = req.body;

  // Validación: evitar registros duplicados
  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    return res.status(400).send('El usuario ya está registrado');
  }

  usuarios.push({ email, contraseña });
  res.send('Usuario registrado correctamente');
});

//  Ruta para autenticación (login)
app.post('/api/login', (req, res) => {
  const { email, contraseña } = req.body;

  const usuario = usuarios.find(u => u.email === email && u.contraseña === contraseña);
  if (usuario) {
    res.send('Autenticación satisfactoria');
  } else {
    res.status(401).send('Error en la autenticación');
  }
});

//  Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
