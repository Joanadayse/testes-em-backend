import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import UserCard from "../components/UserCard"

jest.mock("axios")

const mockcard = {
    data: {
        firstName: "Oleta",
        lastName: "Abbott",
        bank: {
            cardExpire: "10/23",
            cardNumber: "3589640949470047"
        } }
}

describe("testes no UserCard", ()=>{
    beforeEach(()=>{
        axios.mockReset()
    })

    test("Renderiza Card",()=>{
        axios.get.mockResolvedValueOnce(mockcard)
        render(<UserCard/>)
        // screen.logTestingPlaygroundURL()
        
        const loading = screen.getByText(/loading\.\.\./i)
        expect(loading).toBeInTheDocument()
    })
    test("Renderiza componentes do Card",async()=>{
        axios.get.mockResolvedValueOnce(mockcard)
        render(<UserCard/>)
        // screen.logTestingPlaygroundURL()
         await waitFor(()=>{
            
         })
    })

  
})