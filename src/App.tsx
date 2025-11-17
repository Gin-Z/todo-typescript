import type { JSX } from "react"
import { Todos } from "./components/Todos.tsx"
import { Footer } from "./components/Footer.tsx"
import { Header } from "./components/Header.tsx"
import { useTodos } from "./hooks/useTodos.ts"
import { useFilters } from "./hooks/useFilters.ts"
import { Copyright } from "./components/Copyright.tsx"

const App = (): JSX.Element => {
  const {
    todos,
    handleRemove,
    handleCompleted,
    handleUpdateTitle,
    handleRemoveCompleted,
    handleAddTodo
  } = useTodos()

  const {
    filterSelected,
    handleFilterChange,
    filteredTodos,
    activeCount,
    completedCount
  } = useFilters(todos)
  return (
    <div className="todoapp">
      <Header saveTodo={handleAddTodo} />
      <Todos
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        onUpdateTitle={handleUpdateTitle}
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        completedCount={completedCount}
        onClearCompleted={handleRemoveCompleted}
      />
      <Copyright />
    </div>
  )
}

export default App