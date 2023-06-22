import {render , screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "../ProductsList/ProductCard"

const productMock = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
}

const addToCardMock= jest.fn()

describe("testes do ProductCard",()=>{
    test("renderização do componente",()=>{
        render(
        <ProductCard
        product={productMock}
        addToCart={addToCardMock}
        
        />
        )
        screen.logTestingPlaygroundURL()
    })
    test("renderização dos itens do mock",()=>{
        render(
        <ProductCard
        product={productMock}
        addToCart={addToCardMock}
        
        />
        )
        // screen.logTestingPlaygroundURL()
        const image= screen.getByRole('img', {
            name: /fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i
          })

        const title= screen.getByRole('heading', {
            name: /fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i
          })

        const price= screen.getByText(/\$109\.95/i)

        const button= screen.getByRole('button', {
            name: /buy/i
          })

        expect(image).toBeInTheDocument() 
        expect(title).toBeInTheDocument() 
        expect(price).toBeInTheDocument() 
        expect(button).toBeInTheDocument() 
    })
    test("quando o botão de comprar for clicado,deve adicionar o produto ao carrinho ",async()=>{
      const user= userEvent.setup()
      
        render(
        <ProductCard
        product={productMock}
        addToCart={addToCardMock}    
        />
        )

        const button= screen.getByText("Buy")
        await user.click(button)

        // se foi chamado uma vez
        expect(addToCardMock).toHaveBeenCalledTimes(1)
        // chamado com parametros(mock)
        expect(addToCardMock).toBeCalledWith(productMock)
        // rodou ate o final
        expect(addToCardMock).toHaveReturned()
        
 
    })
})