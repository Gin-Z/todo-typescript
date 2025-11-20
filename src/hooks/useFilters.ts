import { useState } from "react"
import type { FilterValue, Todo } from "../types.d.ts"
import { TODO_FILTERS } from "../consts"

export const useFilters = (todos: Todo[]) => {
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return true
  })

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  return {
    filterSelected,
    handleFilterChange,
    filteredTodos,
    activeCount,
    completedCount
  }
}