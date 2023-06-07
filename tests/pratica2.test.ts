import {pratica2} from "../src/pratica2"

describe("funcionamento da função pratica2",()=>{
    test("retorna true para numero par",()=>{
        const result= pratica2(4)
        expect(result).toBe(true)
    })
    test("retorna false para numero impar",()=>{
        const result= pratica2(3)
        expect(result).toBe(false)
    })
    test("retorna null para numero não-inteiro",()=>{
        const result= pratica2(4.44)
        expect(result).toBe(null)
    })
    test("retorna null para não-numero",()=>{
        const result= pratica2("string" as any)
        expect(result).toBe(null)
    })
})