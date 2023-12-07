import { ChangeEvent, FormEvent, useState } from 'react'
import { myTodos } from "./data/todo"
import { List } from './components/List'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast'
import { Toaster } from './components/Toaster'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

export function App() {
  const [todos, setTodos] = useState(myTodos)
  const [value, setValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value || value.length < 3) {
      return toast.error('Deve ter pelo menos 3 caracteres.')
    }

    const newTodos = [...todos, {
      id: uuid(),
      name: value,
      completed: false
    }]

    setTodos(newTodos)

    setValue('')
  }

  const removeTodo = (id: string) => {
    const filtered = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(filtered)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        //create new array with new order
        const newItems = [...items]
        //reomeove the item from old index
        newItems.splice(oldIndex, 1)
        //insert the item at a new index
        newItems.splice(newIndex, 0, items[oldIndex])

        return newItems
      })
    }
  }

  return (
    <>
      <Toaster />
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Adicione uma tarefa"
            />
            <div>
              <button>+ Add Tarefa</button>
            </div>
          </div>
        </form>

        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={todos.map((todo) => todo.id)}>
            <ul>
              {
                todos.map((todo) => {
                  const { id, name, completed } = todo
                  return <List
                    key={id}
                    name={name}
                    id={id}
                    completed={completed}
                    removeTodo={removeTodo}
                  />
                })
              }
            </ul>
          </SortableContext>
        </DndContext>

      </div>
    </>
  )
}