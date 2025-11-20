import type {ListOfTodos, TodoId, Todo as TodoType } from "../types.d.ts"
import { Todo } from "./Todo"

interface Props {
    todos: ListOfTodos
    onToggleCompleteTodo: ({id,completed}:Pick<TodoType, 'id' | 'completed'>)=>void
    onRemoveTodo: ({id}:TodoId)=>void
    onUpdateTitle: ({id, title}: Pick<TodoType, 'id' | 'title'>) => void
}

export const Todos:React.FC<Props>=({todos,onRemoveTodo,onToggleCompleteTodo, onUpdateTitle})=>{
    return(
        <ul className="todo-list">
            {todos.map(todo=>(
                <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    onToggleCompleteTodo={onToggleCompleteTodo}
                    onRemoveTodo={onRemoveTodo}
                    onUpdateTitle={onUpdateTitle}
                />
            ))}
        </ul>
    )
}