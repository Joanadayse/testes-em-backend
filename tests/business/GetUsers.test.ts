import {UserBusiness} from "../../src/business/UserBusiness"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import {IdGeneratorMock} from "../mocks/IdGeneratorMock"
import {TokenManagerMock} from "../mocks/TokenManagerMock"
import {HashManagerMock} from "../mocks/HashManagerMock"
import { GetUsersInputDTO } from "../../src/dtos/user/getUsers.dto"
import { USER_ROLES } from "../../src/models/User"

const userBusiness= new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
    
)
describe("Tests no método getUsers do userBusiness", () => {
    test("Caso de sucesso, retorna lista de users", async () => {
      const input: GetUsersInputDTO = {
        q: "",
        token: "token-mock-astrodev",
      };
  
      const output = await userBusiness.getUsers(input);
  
      // expect(output.message).toBe("Login realizado com sucesso")
      // expect(output.token).toBe("token-mock-fulano")
      expect(output).toHaveLength(2)
      expect(output).toContainEqual({
        id: "id-mock-astrodev",
        name: "Astrodev",
        email: "astrodev@email.com",
        role: USER_ROLES.ADMIN,
        createdAt: expect.any(String)
       })
    })
    })