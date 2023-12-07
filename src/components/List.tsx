import { CheckCircle2 } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'

interface ListProps {
    id: string
    name: string
    completed: boolean
    removeTodo: (id: string) => void
}

export function List({ name, completed, id, removeTodo }: ListProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transition,
        transform
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <>
            <div className="" style={style} {...attributes} {...listeners} ref={setNodeRef}>
                <li onDoubleClick={() => removeTodo(id)}>
                    <p>{name}</p>
                </li>
                <div>
                    <CheckCircle2 />
                </div>
            </div>
        </>
    )
}