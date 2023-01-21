import {Check} from "phosphor-react";
import {CheckBoxRecurrence} from "./CheckBoxHabit";
import {FormEvent, useState} from "react";
import {api} from "../lib/axios";

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

interface FormDataProps {
    title: string
    weekDays: number[]
}

export function NewHabitForm() {

    const [formData, setFormData] = useState<FormDataProps>({title: '', weekDays: []});
    async function createNewHabit(e: FormEvent) {
        e.preventDefault()
        if(!formData.title || formData.weekDays.length === 0){
            return
        } else{
            await api.post('/habits', {
                title: formData.title,
                weekDays: formData.weekDays
            })
        }
        setFormData({
            title: '',
            weekDays: []
        })
        alert("Novo hábito criado com sucesso")
    }

    function toggleData(i: number) {
        let newWeekDays: number[]
        if (formData.weekDays.includes(i)) {
            newWeekDays = formData.weekDays.filter((day) => day !== i)
        } else {
            newWeekDays = [...formData.weekDays, i]
        }
        setFormData(prevData => {
            return {...prevData, weekDays: newWeekDays}
        })
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>
            <input
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400
                focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                type="text" id="title" placeholder="ex.: Exercícios, dormir bem, etc..." autoFocus
                value={formData.title}
                onChange={e => setFormData(prevData => {
                    return {...prevData, title: e.target.value}
                })}
            />
            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>
            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map((day, i) =>
                    <CheckBoxRecurrence
                        key={`Rcr-${day}`}
                        title={day}
                        weekDay={i}
                        toggleData={toggleData}
                        checked = {formData.weekDays.includes(i)}
                    />)}
            </div>

            <button type="submit"
                    className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600
                    hover:bg-green-500 transition-colors
                    ">
                <Check size={20} weight="bold"/>
                Confirmar
            </button>
        </form>
    )
}