import {exercicio1} from "../src/exercicio1"

describe("exercicios",()=>{
     test("Retorna null caso não seja string",()=>{
        const result = exercicio1(33 as any)
        expect(result).toEqual(null)
     })

})