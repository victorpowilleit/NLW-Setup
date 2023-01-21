import * as Popover from '@radix-ui/react-popover';
import {ProgressBar} from "./ProgressBar";
import clsx from "clsx";
import dayjs from "dayjs";
import { HabitsList } from './HabitsList';
import {useState} from "react";

interface HabitDayProps {
    amount?: number
    defaultCompleted?: number
    date: Date

}

export function HabitDay({amount = 0, defaultCompleted = 0, date}: HabitDayProps) {

    const [completed, setCompleted] = useState(defaultCompleted)

    const progress = amount > 0 ? (completed / amount) * 100 : 0
    const dayAndMonth = dayjs(date).format("DD/MM")
    const dayOfWeek = dayjs(date).format("dddd")

    function handleCompletedChanged(completed: number){
        setCompleted(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                style={{transition: '.2s'}}
                className={
                clsx("w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg" +
                    "focus:outline-none focus:ring-2 focus:ring-violet-600" +
                    "focus:ring-offset-2 focus:ring-offset-background", {
                    'bg-zinc-900 border-zinc-800': progress === 0,
                    'bg-violet-900 border-violet-700': progress > 0 && progress < 20,
                    'bg-violet-800 border-violet-600': progress >= 20 && progress < 40,
                    'bg-violet-700 border-violet-500': progress >= 40 && progress < 60,
                    'bg-violet-600 border-violet-500': progress >= 60 && progress < 80,
                    'bg-violet-500 border-violet-400': progress >= 80,

                })
            }/>
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <Popover.Arrow className="w-4 h-2 fill-zinc-900"/>
                    <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>
                    <ProgressBar progress={progress}/>
                    <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
