const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Simulando base de datos en memoria
let usuarios = [
  { id: 1, email: "admin@gmail.com", contraseña: "123456" }
];
let idCounter = 2;

//CREATE - Registrar usuario
app.post('/api/registro', (req, res) => {
  const { email, contraseña } = req.body;

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    return res.status(400).send('El usuario ya existe');
  }

  const nuevoUsuario = { id: idCounter++, email, contraseña };
  usuarios.push(nuevoUsuario);
  res.send('Usuario registrado correctamente');
});

//READ - Ver todos los usuarios
app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

//READ - Ver un usuario por ID
app.get('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  res.json(usuario);
});

//UPDATE - Actualizar usuario
app.put('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  const { email, contraseña } = req.body;
  usuario.email = email || usuario.email;
  usuario.contraseña = contraseña || usuario.contraseña;
  res.json(usuario);
});

//DELETE - Eliminar usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Usuario no encontrado');
  usuarios.splice(index, 1);
  res.send('Usuario eliminado');
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
