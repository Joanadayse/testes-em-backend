import { ZodError } from "zod"
import { UserBusiness } from "../../../src/business/UserBusiness"
import { LoginSchema } from "../../../src/dtos/user/login.dto"
import { SignupSchema } from "../../../src/dtos/user/signup.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("deve gerar token ao cadastrar", async () => {
    const input = SignupSchema.parse({
      name: "Ciclana",
      email: "ciclana@email.com",
      password: "ciclana321"
    })

    const output = await userBusiness.signup(input)

    expect(output).toEqual({
      message: "Cadastro realizado com sucesso",
      token: "token-mock"
    })
  })


  test ("error- name deve possuir pelo 2 caracteres", async()=>{
    expect.assertions(1)
    try{
      const input= SignupSchema.parse({
        name:"",
        email:"fulano@email.com",
        password:"fulano123"
      })

  
    }catch(error){

      if(error instanceof ZodError){
        // console.log(error)
       expect (error.issues[0].message).toBe("String must contain at least 2 character(s)")
      }

    }
  })

  test ("error- email não é uma string", async()=>{
    expect.assertions(1)
    try{
      const input= SignupSchema.parse({
        name: "Fulano",
        email:3,
        password:"fulano123"
      })

    }catch(error){

      if(error instanceof ZodError){
        // console.log(error.message)
       expect (error.issues[0].message).toBe( "Expected string, received number")
      }

    }
  })
  test ("error- password não é uma string", async()=>{
    expect.assertions(1)
    try{
      const input= SignupSchema.parse({
        name: "Fulano",
        email:"fulano@email.com",
        password:3
      })

    }catch(error){

      if(error instanceof ZodError){
        // console.log(error.message)
       expect (error.issues[0].message).toBe( "Expected string, received number")
      }

    }
  })
})