import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../components/Counter"

describe("testes em Counter",()=>{
    it("deve aumetar em 3 o contador quando o botão de incrementando for clicado 3 vezez", async ()=>{
        const user= userEvent.setup()
        render (<Counter/>)
        const incrementButton= screen.getByText("+")
       
        await user.click(incrementButton)
        await user.click(incrementButton)
        await user.click(incrementButton)
        const  value3 = screen.getByText("3")
        expect(value3).toBeInTheDocument()
    })
})