import { UserBusiness } from "../../src/business/UserBusiness"
import { DeleteUserScherma } from "../../src/dtos/user/deleteUser.dto"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("Testando deleteUserById", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("somente ADM podem deletar", async () => {
    const input = DeleteUserScherma.parse({
      token: "token-mock-astrodev",
      idToDelete:"id-mock-fulano"
    })

    const output = await userBusiness.deleteUser(input)

    expect(output).toBe(undefined)
  })
})