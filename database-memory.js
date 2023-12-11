import { randomUUID } from "crypto"

export class DatabaseMemory{
#Loja_de_hardware = new Map()

list(search){
    return Array.from(this.#Loja_de_hardware.entries()).map((Loja_de_hardwareArray) =>{
    // acessando primeira posição
        const id = Loja_de_hardwareArray[0]
        const data = Loja_de_hardwareArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(placa_de_video => {
        if (search){
            return placa_de_video.marca.includes(search)
        }
        return true
    })
}
create(placa_de_video){
    const placa_de_videoId = randomUUID()
    this.#Loja_de_hardware.set(placa_de_videoId, placa_de_video)
}
update(id, placa_de_video){
    this.#Loja_de_hardware.set(id, placa_de_video)
}
delete(id, placa_de_video){
    this.#Loja_de_hardware.delete(id, placa_de_video)
}
}