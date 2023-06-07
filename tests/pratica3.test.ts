import {pratica3} from "../src/pratica3"

describe("Funcionamento da função pratica 3",()=>{
    test("1,logica funcionando com numeros inteiros",()=>{
        const inputA= 4
        const inputB= 2
        const result= pratica3(inputA,inputB)
        expect(result).toEqual({sun:6,multiplication:8})
    })
    test("2,logica funcionando com numeros não-inteiros",()=>{
        const inputA= 2.5
        const inputB= 2
        const result= pratica3(inputA,inputB)
        expect(result).toEqual({sun:4.5,multiplication:5})
    })
    test("Lógica funcionando com  1 valor zero", ()=>{
        const inputA = 0
        const inputB = 2
        const result = pratica3(inputA, inputB)
        expect(result).toEqual({sun:2, multiplication: 0})
    })
    test("4,logica funcionando com 2 valores zero",()=>{
        const inputA= 0
        const inputB= 0
        const result= pratica3(inputA,inputB)
        expect(result).toEqual({sun:0,multiplication:0})
    })
    test("5, o resultado é um objeto",()=>{
        const inputA= 5
        const inputB= 1
        const result= pratica3(inputA,inputB)
        expect(typeof(result)).toBe("object")
    })
    test("6,Erro com soma incorreta",()=>{
        const inputA= 10
        const inputB= 10
        const result= pratica3(inputA,inputB)
        expect(result).not.toEqual({sun:11,multiplication:100})
    })
    test("7,Erro com um valor não sendo numero",()=>{
        const inputA= "string" as any
        const inputB= 2
        const result= pratica3(inputA,inputB)
        expect(result).toEqual(null)
    })
    test("8,Retorna null com os 2 valores não sendo numeros",()=>{
        const inputA= "string" as any
        const inputB= true as any
        const result= pratica3(inputA,inputB)
        expect(result).toEqual(null)
    })
 
})