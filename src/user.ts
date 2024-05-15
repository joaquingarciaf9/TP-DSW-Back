import crypto from 'node:crypto'

export class User{
    constructor(
    public nombre: string, 
    public apellido: string, 
    public tel: string, 
    public email: string, 
    public direccion: string,
    public id = crypto.randomUUID()
    ){}
}