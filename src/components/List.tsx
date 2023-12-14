import { CheckCircle2, Trash } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useMemo, useRef } from "react"
import { gsap } from 'gsap'

interface ListProps {
    id: string
    name: string
    completed: boolean
    removeTodo: (id: string) => void
    handleCompleted: (id: string) => void
}

export function List({ name, completed, id, removeTodo, handleCompleted }: ListProps) {

    const todoRef = useRef(null)
    const nameRef = useRef(null)

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
    ];

    const randomizeColor = () => {
        const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
        return randomColor;
    };

    const randomColorMemo = useMemo(() => {
        return randomizeColor();
    }, [])

    const animateAndRemoveFromDom = () => {
        gsap.to(todoRef.current, {
            duration: 0.5,
            opacity: 0,
            x: 50,
            onComplete: () => {
                removeTodo(id)
            }
        })
    }

    useEffect(() => {
        gsap.from(nameRef.current, {
            duration: 0.5,
            opacity: 0,
            y: 20,
            rotationX: 180,
            delay: -0.1,
            onComplete: () => {
                gsap.to(nameRef.current, {
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                })
            }
        })
    }, [completed])

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
                    ref={todoRef}
                    onDoubleClick={animateAndRemoveFromDom}
                    className={`bg-gradient-to-r ${randomColorMemo} py-4 px-8 rounded-[5px] list-none border-[1px] border-icons shadow-shadow3 hover:cursor-pointer active:transform active:scale-[0.98]`}
                >
                    <p
                        ref={nameRef}
                        className={`text-clampinputbutton ${completed ? 'line-through' : ''} ${completed ? 'text-primaryGreen' : 'text-white'}`}
                    >
                        {name}
                    </p>
                </li>
                <div className="flex gap-3 absolute right-0 top-1/2 transform -translate-y-1/2 px-[.9rem] py-[.4rem]">
                    <div
                        className="text-clampicon text-inherit flex items-center justify-center"
                        onDoubleClick={() => handleCompleted(id)}
                    >
                        <CheckCircle2 color={`${completed ? '#6FCF97' : '#ffffff'}`} />
                    </div>
                    <div
                        onDoubleClick={() => removeTodo(id)}
                    >
                        <Trash color="#fe6854" />
                    </div>
                </div>
            </div>
        </>
    )
}