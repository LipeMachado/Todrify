import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { myTodos } from "./data/todo"
import { List } from './components/List'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast'
import { Toaster } from './components/Toaster'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { Columns, Rows } from 'lucide-react'

export function App() {
  const [todos, setTodos] = useState(myTodos)
  const [value, setValue] = useState<string>('')
  const [toggleGrid, setToggleGrid] = useState(false)

  //Local Storage
  const saveToLocalStorage = (todos: any) => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }

  //retrieve from local storage
  useEffect(() => {
    const localTodos = localStorage.getItem('todos')
    if (localTodos) {
      setTodos(JSON.parse(localTodos))
    }
    //grid from local storage
    const localGrid = localStorage.getItem('toggleGrid')
    if (localGrid) {
      setToggleGrid(JSON.parse(localGrid))
    }
  }, [])

  //delete from local storage
  const removeItemFromLocalStorage = (id: string) => {
    const filtered = todos.filter((todo) => {
      return todo.id !== id
    })

    localStorage.setItem('todos', JSON.stringify(filtered))
  }

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

    //send to local storage
    saveToLocalStorage(newTodos)

    setValue('')
  }

  const removeTodo = (id: string) => {
    removeItemFromLocalStorage(id)
    const filtered = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(filtered)
  }

  //handle grid
  const gridHandler = () => {
    setToggleGrid(!toggleGrid)
    localStorage.setItem('toggleGrid', JSON.stringify(!toggleGrid))
  }

  const handleCompleted = (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }

      return todo
    })

    setTodos(newTodos)
    saveToLocalStorage(newTodos)
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
      <div className="min-h-screen py-20 px-[25rem] bg-bg3 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center bg-bg2 border-[1px] border-icons3 rounded-2xl mb-4 py-8 px-4 shadow-shadow3"
        >
          <h1
            className="text-clamph1 font-extrabold text-primaryGreen"
          >
            Task Diária
          </h1>
          <div className="my-4 mx-0 relative text-clampinput w-3/5 flex items-center justify-center text-gray-2">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Adicione uma tarefa"
              className="text-clampinputbutton text-inherit bg-transparent border-[1px] border-icons3 rounded-[7px] py-[.8rem] px-4 text-gray-2 w-full focus:outline-none placeholder:text-gray-3 active:border-icons focus:border-icons"
            />
            <div>
              <button
                className="absolute top-0 right-0 cursor-pointer py-0 px-4 border-none bg-primaryGreen h-full rounded-r-[7px] text-white text-clampinputbutton transition-colors hover:bg-primary2"
              >
                + Add Tarefa
              </button>
            </div>
          </div>
        </form>

        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={todos.map((todo) => todo.id)}>
            <ul className="overflow-hidden bg-bg2 p-[5rem] rounded-2xl shadow-shadow3 border-[1px] border-icons3">
              <div className="flex justify-between items-center mb-8">
                <p className="text-clampinput font-semibold text-gray-2">
                  Prioridade
                </p>
                <div className="">
                  <button
                    className="py-[.5rem] px-4 rounded-[7px] bg-buttonGradient11 border-[1px] border-icons3 text-clampinputbutton cursor-pointer text-gray-1 transition-colors"
                    onClick={gridHandler}
                  >
                    {toggleGrid ? <Columns /> : <Rows />}
                  </button>
                </div>
                <p className="text-clampinput font-semibold text-danger">Alta</p>
              </div>
              <div className={`${toggleGrid ? 'grid gap-4' : 'flex flex-col gap-2'} grid-cols-1 sm:grid-cols-2 transition-all`}>
                {
                  todos.map((todo) => {
                    const { id, name, completed } = todo
                    return <List
                      key={id}
                      name={name}
                      id={id}
                      completed={completed}
                      removeTodo={removeTodo}
                      handleCompleted={handleCompleted}
                    />
                  })
                }
              </div>
              <div className="mt-8 flex justify-end">
                <p className="text-clampinput font-semibold text-clip-gradient select-none">Baixa</p>
              </div>
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </>
  )
}