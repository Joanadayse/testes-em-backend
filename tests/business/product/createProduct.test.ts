import { ZodError } from 'zod'
import { ProductBusiness } from '../../../src/business/ProductBusiness'
import { GetProductsSchema } from '../../../src/dtos/product/getProducts.dto'
import { BadRequestError } from '../../../src/errors/BadRequestError'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { ProductDatabaseMock } from '../../mocks/ProductDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'
import { CreateProductSchema } from '../../../src/dtos/product/createProduct.dto'

describe("Testando createProducts", () => {
  const productBusiness = new ProductBusiness(
    new ProductDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve criar um produto", async () => {
     const input= CreateProductSchema.parse({
      name:"usb",
      price:40,
      token:  "token-mock-astrodev"
     })

     const output= await productBusiness.createProduct(input)

    expect(output.message).toBe("Producto cadastrado com sucesso")

  })

  test("error- token inválido", async () => {
    expect.assertions(2)

    try {
      
      const input = CreateProductSchema.parse({
        name:"usb",
        price:20,
       token:"token-errado"
      })

      const output = await productBusiness.createProduct(input)

    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.statusCode).toBe(400)
        expect(error.message).toBe("token inválido")
      }
    }
  })

  test("error- somente admins podem acessar", async()=>{
    expect.assertions(2)
    try{
      const input= CreateProductSchema.parse({
        name:"usb",
        price:20,
        token:"token-mock-fulano"
      })
      await productBusiness.createProduct(input)
    }catch(error){
      if(error instanceof BadRequestError){
        expect(error.statusCode).toBe(400)
        expect(error.message).toBe("somente admins podem acessar")
      
      }

    }

  })

  test ("error- name precisa ser uma string", async()=>{
    expect.assertions(1)
    try{
      const input= CreateProductSchema.parse({
        name:3,
        price:20,
        token:"token-mock-fulano"
      })
      await productBusiness.createProduct(input)
    }catch(error){
      if(error instanceof ZodError){
        expect(error.issues[0].message).toBe( "Expected string, received number")
      
      }

    }

  })
  test ("error- name string vazia", async()=>{
    expect.assertions(1)
    try{
      const input= CreateProductSchema.parse({
        name:"",
        price:20,
        token:"token-mock-fulano"
      })
      await productBusiness.createProduct(input)
    }catch(error){
      if(error instanceof ZodError){
        expect(error.issues[0].message).toBe( "String must contain at least 2 character(s)"
        )
      
      }

    }

  })
  test ("error- price precisa ser um number", async()=>{
    expect.assertions(1)
    try{
      const input= CreateProductSchema.parse({
        name:"usb",
        price:"20",
        token:"token-mock-fulano"
      })
      await productBusiness.createProduct(input)
    }catch(error){
      if(error instanceof ZodError){
        console.log(error.message)
        expect(error.issues[0].message).toBe("Expected number, received string")
      
      }

    }

  })

 
})