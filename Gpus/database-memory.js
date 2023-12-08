import { randomUUID } from "crypto"

export class DatabaseMemory{
#gpus = new Map()

list(search){
    return Array.from(this.#gpus.entries()).map((gpusArray) =>{
    // acessando primeira posição
        const id = gpusArray[0]
        const data = gpusArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(gpu => {
        if (search){
            return gpu.marca.includes(search)
        }
        return true
    })
}
create(gpu){
    const gpuId = randomUUID()
    this.#gpus.set(gpuId, gpu)
}
update(id, gpu){
    this.#gpus.set(id, gpu)
}
delete(id, gpu){
    this.#gpus.delete(id, gpu)
}
}