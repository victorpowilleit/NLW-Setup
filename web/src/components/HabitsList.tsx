import {CheckBoxHabit} from "./CheckBoxHabit";
import {useEffect, useState} from "react";
import {api} from "../lib/axios";
import dayjs from "dayjs";

interface HabitsListProps{
    date: Date
    onCompletedChanged: (completed:number)=>void
}
interface HabitsInfoProps{
    possibleHabits: {
        id: string
        title: string
        createdAt: string
    }[]
    completedHabits:string[]
}
export function HabitsList({date, onCompletedChanged} : HabitsListProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfoProps>()
    useEffect(()=>{
        api.get('/day', {
            params: {
                date: date.toISOString()
            }
        }).then(r=>
            setHabitsInfo(r.data)
        )
    },[])

    async function toggleData(habitId:string){
        const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId)
        console.log("isHabitComplete = ",isHabitCompleted)
        console.log("habitId = ",habitId)
        await api.patch(`/habits/${habitId}/toggle`)
        let completedHabits:string[]
        if (isHabitCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id!==habitId)
        }else{
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }
        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits: completedHabits
        })
        onCompletedChanged(completedHabits.length)
    }

    const isDayInPast = dayjs(date).endOf('day').isBefore(dayjs(new Date).startOf('day'))
    return (
        <>
            <div className="mt-6 flex flex-col gap-3">
                {habitsInfo?.possibleHabits.map(habit=>
                <CheckBoxHabit
                    key={habit.id}
                    id={habit.id}
                    title={habit.title}
                    isDayInPast ={isDayInPast}
                    checked={habitsInfo?.completedHabits.includes(habit.id) || false}
                    toggleData={toggleData}
                />
                )}
            </div>
        </>
    )
}