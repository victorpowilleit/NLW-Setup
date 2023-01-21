import {HabitDay} from "./HabitDay";
import {generateDatesFromYearBeginning} from "../utils/generate-dates-from-year-beginning";
import {useEffect, useState} from "react";
import {api} from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const ammountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type SummaryProps = {
    id: string
    date: string
    amount: number
    defaultCompleted: number
    completed?:number
}[]

export function SummaryTable() {

    const [summary, setSummary] = useState<SummaryProps>([])

    useEffect(() => {
        api.get("/summary").then(response =>
            setSummary(response.data)
        )
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map(
                    (day, index) =>
                        <div
                            key={`${day}-${index}`}
                            className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center">
                            {day}
                        </div>
                )}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summary.length > 0 && summaryDates.map((date, index) => {
                        const dayInSummary = summary.find(day => {
                            return dayjs(date).isSame(day.date, 'day')
                        })
                        // @ts-ignore
                    return (<HabitDay
                            key={date.toString()}
                            date={date}
                            amount={dayInSummary?.amount}
                            defaultCompleted={dayInSummary?.completed}
                        />)
                    }
                )}
                {ammountOfDaysToFill > 0 && Array.from({length: ammountOfDaysToFill}).map(
                    (_, i) => <div key={`ph${i}`}
                                   className=
                                       "w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                    />
                )}
            </div>
        </div>
    )
}


