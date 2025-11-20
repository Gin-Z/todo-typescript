import { useState } from "react"
import type { Todo, TodoId, TodoTitle } from "../types.d.ts"

const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Ir al cine.",
    completed: true
  },
  {
    id: "2",
    title: "Aprender React con Typescript.",
    completed: false
  },
  {
    id: "3",
    title: "Bañarse.",
    completed: false
  }
]

export const useTodos = () => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<Todo, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleUpdateTitle = ({ id, title }: Pick<Todo, 'id' | 'title'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleRemoveCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo: Todo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return {
    todos,
    handleRemove,
    handleCompleted,
    handleUpdateTitle,
    handleRemoveCompleted,
    handleAddTodo
  }
}