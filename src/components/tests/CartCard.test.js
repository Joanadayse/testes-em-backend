import {render , screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CartCard from "../Cart/CartCard"


const productMock = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
}

const removeFromCart= jest.fn()

describe("testes do CartCard",()=>{
    test("renderização dos itens do mock", ()=>{
        render(
            <CartCard
            product={productMock}
            removeFromCart={removeFromCart}
            />
        )

        //  screen.logTestingPlaygroundURL()

        const image= screen.getByRole('img', {
            name: /fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i
          })

          const title= screen.getByRole('heading', {
            name: /fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i
          })

        const price= screen.getByText(/\$109\.95/i)

        const button= screen.getByRole('button', {
            name: /remove/i
          })

        expect(image).toBeInTheDocument() 
        expect(title).toBeInTheDocument() 
        expect(price).toBeInTheDocument() 
        expect(button).toBeInTheDocument() 
    })

    test("Quando o botão de remover for clicado, o item deve ser removido do carrinhi",async()=>{
        const user= userEvent.setup()

        render(
            <CartCard
            product={productMock}
            removeFromCart={removeFromCart}
            />
        )

            //  screen.logTestingPlaygroundURL()

            const button= screen.getByText("Remove")
            await user.click(button)

            expect(removeFromCart).toHaveBeenCalledTimes(1)
            // chamado com parametros(mock)
            expect(removeFromCart).toBeCalledWith(productMock)
            // rodou ate o final
            expect(removeFromCart).toHaveReturned()
            


    })
})