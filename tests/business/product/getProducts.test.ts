import { ZodError } from 'zod'
import { ProductBusiness } from '../../../src/business/ProductBusiness'
import { GetProductsSchema } from '../../../src/dtos/product/getProducts.dto'
import { BadRequestError } from '../../../src/errors/BadRequestError'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { ProductDatabaseMock } from '../../mocks/ProductDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'

describe("Testando getProducts", () => {
  const productBusiness = new ProductBusiness(
    new ProductDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve retornar uma lista de produtos", async () => {
     const input= GetProductsSchema.parse({
      token: "token-mock-fulano"
     })

     const output= await productBusiness.getProducts(input)

     expect(output).toHaveLength(2)
     expect(output).toContainEqual(
      {
        id: 'p001',
        name: 'Mouse',
        price: 50,
        createdAt: expect.any(String)
      }
     )

  })

  test ("error- token invalido", async()=>{
    expect.assertions(2)
    try{
      const input= GetProductsSchema.parse({
        token:"token-invalido"
      })
      await productBusiness.getProducts(input)
    }catch(error){
      if(error instanceof BadRequestError){
        expect(error.message).toBe("token inválido")
        expect(error.statusCode).toBe(400)
      }

    }

  })

  test ("error- token string vazia", async()=>{
    expect.assertions(1)
    try{
      const input= GetProductsSchema.parse({
        token:""
      })
      await productBusiness.getProducts(input)
    }catch(error){
      if(error instanceof ZodError){
        expect(error.issues[0].message).toBe( "String must contain at least 1 character(s)")
      
      }

    }

  })

  test ("error- token não sendo string", async()=>{
    expect.assertions(1)
    try{
      const input= GetProductsSchema.parse({
        token:7
      })
      await productBusiness.getProducts(input)
    }catch(error){
      if(error instanceof ZodError){
        expect(error.issues[0].message).toBe( "Expected string, received number")
      
      }

    }

  })

 
})