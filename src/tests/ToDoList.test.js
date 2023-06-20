import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList.js";

describe("testes ToDoList", () => {
  it("deve renderizar com o titulo", () => {
    render(<TodoList />);
    const title = screen.getByText(/todo list/i);
    expect(title).toBeInTheDocument();
  });

  it("input incia vazio", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/enter a todo/i);
    expect(input).toHaveValue("");
  });

  it("deve atualizar o valor do input ao digitar nele",async()=>{
    const user= userEvent.setup()

    render(<TodoList/>)
    const input= screen.getByPlaceholderText(/enter a todo/i)

    await user.type(input, "teste")
    expect(input).toHaveValue("teste")

  })
  it("deve renderizar uma nova tarefa ao digitar no input e pressionar a tecla ENTER",async()=>{
    const user= userEvent.setup()

    render(<TodoList/>)
    const input= screen.getByPlaceholderText(/enter a todo/i)
    // simulei que o usuario digitou "teste" e apertou o enter 
    await user.type(input, "teste{enter}")
    // busquei pelo texto que aparece depois de dar o enter e coloquei na varial task
    const task= screen.getByText(/teste/i)
    // espero que esse teste exista no documento
    expect(task).toBeInTheDocument()
  })
  it("deve alterar o status da tarefa quando o botão de alterar status for clicado",async()=>{
    const user= userEvent.setup()

    render(<TodoList/>)
    const input= screen.getByPlaceholderText(/enter a todo/i)
    await user.type(input, "teste{enter}")
    const task= screen.getByText(/teste/i)
    const button= screen.getByText(/toggle/i)

    await user.click(button)
    expect(task).toHaveStyle("text-decoration: line-through")

    await user.click(button)
    expect(task).toHaveStyle("text-decoration: none")
  })

  it("deve remover a tarefa quando o botão de deletar for clicado" , async()=>{
    const user= userEvent.setup()
    render (<TodoList/>)
    // screen.logTestingPlaygroundURL()
    const input= screen.getByPlaceholderText(/enter a todo/i)
    await user.type(input, "teste{enter}")
 
    const button = screen.getByText(/delete/i)
    await user.click(button)

    const task= screen.queryByText(/teste/i)
    expect(task).not.toBeInTheDocument()
    

})


});



 