import type { JSX } from "react"
import { useState } from "react"
import { Todos } from "./components/Todos.tsx"
import { type TodoTitle, type TodoId, type Todo as TodoType, type FilterValue } from "./types"
import { TODO_FILTERS } from "./consts.ts"
import { Footer } from "./components/Footer.tsx"
import { Header } from "./components/Header.tsx"


const mockTodos=[
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

const App=(): JSX.Element =>{
  const [todos,setTodos]=useState(mockTodos)
  const [filterSelected,setFilterSelected]=useState <FilterValue>(TODO_FILTERS.ALL)

  const handleRemove=({id}:TodoId):void=>{
    const newTodos=todos.filter(todo=>todo.id!==id)
    setTodos(newTodos)
  }

  const handleCompleted=({id,completed}:Pick<TodoType, 'id' |
    'completed'>):void=>{
      const newTodos=todos.map(todo=>{
        if (todo.id===id){
          return {
            ... todo,
            completed
          }
        }
        return todo
      })
      setTodos(newTodos)
    }

    const handleUpdateTitle = ({id, title}: Pick<TodoType, 'id' | 'title'>): void => {
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

    const handleFilterChange=(filter:FilterValue):void=>{
      setFilterSelected(filter)
    }

    const handleRemoveCompleted=():void=>{
      const newTodos=todos.filter(todo=>!todo.completed)
      setTodos(newTodos)
    }

    const activeCount=todos.filter(todo => !todo.completed).length
    const completedCount=todos.length-activeCount
    const filteredTodos =todos.filter(todo=>{
      if (filterSelected===TODO_FILTERS.ACTIVE) return !todo.completed
      if (filterSelected===TODO_FILTERS.COMPLETED) return todo.completed
      return todo
    }
      
    )

    const handleAddTodo=({title}:TodoTitle):void =>{
      const newTodo={
        title,
        id: crypto.randomUUID(),
        completed: false
      }
      const newTodos=[... todos,newTodo]
      setTodos(newTodos)
    }
  return (
    <div className="todoapp">
      <Header saveTodo={handleAddTodo} />
      <Todos
      onToggleCompleteTodo={handleCompleted}
      onRemoveTodo={handleRemove}
      onUpdateTitle={handleUpdateTitle}
      todos={filteredTodos}/>
      <Footer
        activeCount={activeCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        completedCount={completedCount}
        onClearCompleted={handleRemoveCompleted}      />
    </div>
  )
}

export default App