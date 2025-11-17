import { useState } from 'react'
import { type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType{
    onToggleCompleteTodo: ({id,completed}:Pick<TodoType, 'id' | 'completed'>)=>void
    onRemoveTodo:({id}:TodoId)=>void
    onUpdateTitle: ({id, title}: Pick<TodoType, 'id' | 'title'>) => void
}

export const Todo: React.FC<Props> = ({id,title,completed, onRemoveTodo, onToggleCompleteTodo, onUpdateTitle})=>{
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(title)

    const handleChangeCheckbox=(event:React.ChangeEvent<HTMLInputElement>):void=>{
        onToggleCompleteTodo({
            id,
            completed: event.target.checked
        })
    }

    const handleDoubleClick = (): void => {
        setIsEditing(true)
        setEditedTitle(title)
    }

    const handleBlur = (): void => {
        setIsEditing(false)
        if (editedTitle.trim() !== '') {
            onUpdateTitle({ id, title: editedTitle.trim() })
        } else {
            setEditedTitle(title)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            handleBlur()
        } else if (event.key === 'Escape') {
            setIsEditing(false)
            setEditedTitle(title)
        }
    }

    return (
        <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={completed}
                    onChange={handleChangeCheckbox}
                />
                <label onDoubleClick={handleDoubleClick}>
                    {title}
                </label>
                <button 
                    className='destroy'
                    onClick={() => {
                        onRemoveTodo({id})
                    }}
                />
            </div>
            {isEditing && (
                <input
                    className="edit"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            )}
        </li>
    )
}