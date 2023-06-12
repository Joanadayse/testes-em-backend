import { ZodError } from "zod"
import { UserBusiness } from "../../src/business/UserBusiness"
import { LoginSchema } from "../../src/dtos/user/login.dto"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import { NotFoundError } from "../../src/errors/NotFoundError"

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("deve gerar um token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "fulano123"
    })

    const output = await userBusiness.login(input)

    expect(output).toEqual({
      message: "Login realizado com sucesso",
      token: "token-mock-fulano"
    })
  })
  test("email não é string",async()=>{
    expect.assertions(1)

  try{
    const input = LoginSchema.parse({
      // email no formato errado
      email: 7,
      password: "fulano123"
    })
       await userBusiness.login(input)
  }catch(error){
    if(error instanceof ZodError){
      // console.log(error)
      expect(error.issues[0].message).toBe("Expected string, received number")

     

    }
  }
})
  test("email não foi encontrado",async()=>{
    expect.assertions(2)

  try{
    const input = LoginSchema.parse({
      email: "joana@email.com",
      password: "fulano123"
    })
       await userBusiness.login(input)
  }catch(error){
    if(error instanceof NotFoundError){
      console.log(error)
      expect(error.message).toBe("'email' não encontrado")
      expect(error.statusCode).toBe(404)
     

    }
  }
})

})
