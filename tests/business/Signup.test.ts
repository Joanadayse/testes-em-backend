import {UserBusiness} from "../../src/business/UserBusiness"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import {IdGeneratorMock} from "../mocks/IdGeneratorMock"
import {TokenManagerMock} from "../mocks/TokenManagerMock"
import {HashManagerMock} from "../mocks/HashManagerMock"
import { SignupInputDTO } from "../../src/dtos/user/signup.dto"

const userBusiness= new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
    
)
describe("Tests no método Signup do userBusiness", () => {
    test("Caso de sucesso, token gerado", async () => {
      const input: SignupInputDTO = {
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123"
      };
  
      const output = await userBusiness.signup(input);
  
      // expect(output.message).toBe("Login realizado com sucesso")
      // expect(output.token).toBe("token-mock-fulano")
      expect(output).toEqual({
        message:"Cadastro realizado com sucesso",
        token: "token-mock"})})})