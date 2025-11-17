import type { TodoTitle } from "../types"
import { CreateTodo } from "./CreateTodo"

interface Props{
    saveTodo:({title}:TodoTitle)=>void
}

export const Header: React.FC<Props>=({saveTodo})=>{
    return (
        <header className="header">
            <h1>Todo Typescript</h1>
            <CreateTodo saveTodo={saveTodo}/>
        </header>
    )
}