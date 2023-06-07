import {fixacao} from "../src/fixacao"

describe("exercicio de fiação",()=>{
     test("Retorna um array vario caso não seja string",()=>{
        const result = fixacao(33 as any)
        expect(result).toEqual([])
     })
     test("Retorna true para resultado correto",()=>{
        const result = fixacao("teste")
        expect(result).toEqual(["t", "e", "s","t","e"])
     })
})