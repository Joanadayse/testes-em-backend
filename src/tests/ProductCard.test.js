import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductCard from "../components/ProductCard"

jest.mock("axios")

const axiosResponseMock = {
    data: {
        title: "Bananinha",
        description: "É a famosa bananinha!",
        price: 50,
        thumbnail: "url-bananinha.jpg"
    }
}

describe("testes no ProductCard",()=>{
    beforeEach(()=>{
        axios.mockReset()
    })

    test("Renderiza" ,async()=>{
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        render(<ProductCard/>)

        const loading = screen.getByText(/loading\.\.\./i)
        expect(loading).toBeInTheDocument()
        const text = screen.queryByText(/bananinha/i);
        expect(text).not.toBeInTheDocument()

    // antes do card ser renderizado
        // screen.logTestingPlaygroundURL()

    // depois do card ser renderizado
        await waitFor(()=>{
            const title= screen.getByRole('heading',{
                name:/bananinha/i
            })

            const image= screen.getByAltText(/thumbnail for bananinha/i)
            const description = screen.getByText("É a famosa nananinha!")
            const price= screen.getByText(/\$0/i)

            expect(title).toBeInTheDocument()
            expect(image).toBeInTheDocument()
            expect(description).toBeInTheDocument()
            expect(price).toBeInTheDocument()
        

    })

    expect(loading).not.toBeInTheDocument()
})

})