import express, { NextFunction, Request, Response } from "express"
import { User } from "./user.js"
const app = express()
app.use(express.json())

const users = [
    new User(
        'valentin',
        'feldkircher',
        '3412788291',
        'random@gmail.com',
        'francia 954'
    ),
]

function sanitizeUserInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        tel: req.body.tel,
        email: req.body.email,
        direccion: req.body.direccion,
    }

    next()
}

app.get('/api/users', (req, res) => {
    res.json({data:users})
})

app.get('/api/users/:id', (req, res) => {
    const user = users.find((user) => user.id === req.params.id)
    if(!user){
        res.status(404).send({message:'Usuario no encontrado'})
    }
    res.json({data:user})
})

app.post('/api/users', sanitizeUserInput, (req, res) => {
    const input = req.body.sanitizedInput

    const user = new User(
        input.nombre, 
        input.apellido, 
        input.tel, 
        input.email, 
        input.direccion
    )
    users.push(user)
    res.status(201).send({message:'Usuario creado con exito', data:user})
})

app.put('/api/users/:id', sanitizeUserInput, (req, res) =>{
    const userIdx = users.findIndex((user) => user.id === req.params.id) 

    if(userIdx === -1){
        res.status(404).send({message: 'Usuario no encontrado'})
    }
  
    users[userIdx] = {...users[userIdx], ...req.body.sanitizedInput}

    res.status(200).send({message: 'Usuario actualizado exitosamente', data: users[userIdx]})
})

app.listen(3000, () => {
    console.log('Server runnning on http://localhost:3000/')
  })