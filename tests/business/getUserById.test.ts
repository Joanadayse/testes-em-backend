import { UserBusiness } from "../../src/business/UserBusiness"
import { DeleteUserScherma } from "../../src/dtos/user/deleteUser.dto"
import { GetUsersSchema } from "../../src/dtos/user/getUsers.dto"
import { LoginSchema } from "../../src/dtos/user/login.dto"
import { USER_ROLES } from "../../src/models/User"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("Testando getUserById", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("id precisa ser válido!", async () => {
    const input = GetUsersSchema.parse({
      token: "token-mock-astrodev",
      q:"id-mock-astrodev"
    })

    const output = await userBusiness.getUserById(input)

    expect(output.name).toBe("Astrodev")
    expect(output.email).toBe("astrodev@email.com")
    // expect(output.name).toBe("Astrodev")
  })
})