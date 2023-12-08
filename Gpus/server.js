import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/gpu', (request, reply) => {
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

server.get('/gpu', (request) => {
    const search = request.query.search
    console.log(search)
    const gpus = database.list(search)
    console.log(gpus)
    return gpus
})

server.put('/gpus/:id', (request, reply) => {
    const gpuId = request.params.id
    const {marca, fabricante, preço} = request.body
    const gpu = database.update(gpuId, {
        marca: marca,
        fabricante: fabricante,
        preço: preço,
    })
    return reply.status(204).send()
})

server.delete('/gpus/:id', (request, reply) => {
    const gpuId = request.params.id

    database.delete(gpuId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})