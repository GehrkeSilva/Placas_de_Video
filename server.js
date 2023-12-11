import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/placa_de_video', (request, reply) => {
// Acessando dados do corpo da requisição
    const {marca, fabricante, preço} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        marca: marca,
        fabricante: fabricante,
        preço: preço,
    })

    return reply.status(201).send
})

server.get('/placa_de_video', (request) => {
    const search = request.query.search
    console.log(search)
    const Loja_de_hardware = database.list(search)
    console.log(Loja_de_hardware)
    return Loja_de_hardware
})

server.put('/Loja_de_hardware/:id', (request, reply) => {
    const placa_de_videoId = request.params.id
    const {marca, fabricante, preço} = request.body
    const placa_de_video = database.update(placa_de_videoId, {
        marca: marca,
        fabricante: fabricante,
        preço: preço,
    })
    return reply.status(204).send()
})

server.delete('/Loja_de_hardware/:id', (request, reply) => {
    const placa_de_videoId = request.params.id

    database.delete(placa_de_videoId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})