import express from "express";
import { User } from "./user.js";
const app = express();
app.use(express.json());
const users = [
    new User('valentin', 'feldkircher', '3412788291', 'random@gmail.com', 'francia 954'),
];
app.get('/api/users', (req, res) => {
    res.json({ data: users });
});
app.get('/api/users/:id', (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
    if (!user) {
        res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.json({ data: user });
});
app.post('/api/users', (req, res) => {
    const { nombre, apellido, tel, email, direccion } = req.body;
    const user = new User(nombre, apellido, tel, email, direccion);
    users.push(user);
    res.status(201).send({ message: 'Usuario creado con exito', data: user });
});
app.listen(3000, () => {
    console.log('Server runnning on http://localhost:3000/');
});
//# sourceMappingURL=index.js.map