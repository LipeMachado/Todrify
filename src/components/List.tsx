import { CheckCircle2 } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import { useMemo } from "react"

interface ListProps {
    id: string
    name: string
    completed: boolean
    removeTodo: (id: string) => void
    handleCompleted: (id: string) => void
}

export function List({ name, completed, id, removeTodo, handleCompleted }: ListProps) {

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

    const randomColors = [
        'from-pink-700/30 via-violet-800/30 to-gray-900/30',
        'from-violet-700/30 via-blue-800/30 to-gray-900/30',
        'from-emerald-500/30 via-lime-700/30 to-gray-900/30'
    ];

    const randomizeColor = () => {
        const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
        return randomColor;
    };

    const randomColorMemo = useMemo(() => {
        return randomizeColor();
    }, [])

    return (
        <>
            <div
                className="bg-bg2 relative"
                style={style}
                {...attributes}
                {...listeners}
                ref={setNodeRef}
            >
                <li
                    className={`bg-gradient-to-r ${randomColorMemo} py-4 px-8 rounded-[5px] list-none border-[1px] border-icons shadow-shadow3 hover:cursor-pointer active:transform active:scale-[0.98]`}
                    onDoubleClick={() => removeTodo(id)}
                >
                    <p className={`text-clampinputbutton ${completed ? 'line-through' : ''} ${completed ? 'text-primaryGreen' : 'text-white'}`}>{name}</p>
                </li>
                <div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 px-[.9rem] py-[.4rem] text-clampicon text-inherit flex items-center justify-center"
                    onDoubleClick={() => handleCompleted(id)}
                >
                    <CheckCircle2 color={`${completed ? '#6FCF97' : '#ffffff'}`} />
                </div>
            </div>
        </>
    )
}