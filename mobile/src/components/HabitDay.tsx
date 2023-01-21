import {Dimensions, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {generateProgressPercentage} from "../utils/generate-progress-percentage";
import clsx from 'clsx'
import dayjs from "dayjs";

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = 32 * 2
const DAY_MARGIN_BETWEEN = 8
const DAY_MARGIN_BETWEEN_TOTAL = DAY_MARGIN_BETWEEN * WEEK_DAYS
const HORIZONTAL_DISCOUNT = (DAY_MARGIN_BETWEEN_TOTAL + SCREEN_HORIZONTAL_PADDING)
export const DAY_SIZE = ((Dimensions.get('screen').width - HORIZONTAL_DISCOUNT)) / WEEK_DAYS - 0.1

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number
    amountCompleted?: number
    date: Date
}

const today = dayjs().startOf('day').toDate()
export function HabitDay({amountOfHabits = 0, amountCompleted = 0, date, ...rest}: Props) {
    const amountAcomplishedPercentage = generateProgressPercentage(amountOfHabits, amountCompleted)
    const isCurrentDay = dayjs(today).isSame(date)
    return (
        <TouchableOpacity
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"]: amountAcomplishedPercentage === 0,
                ["bg-violet-900 border-violet-700"]: amountAcomplishedPercentage > 0 && amountAcomplishedPercentage <= 20,
                ["bg-violet-800 border-violet-600"]: amountAcomplishedPercentage > 20 && amountAcomplishedPercentage <= 40,
                ["bg-violet-700 border-violet-500"]: amountAcomplishedPercentage > 40 && amountAcomplishedPercentage <= 60,
                ["bg-violet-600 border-violet-500"]: amountAcomplishedPercentage > 60 && amountAcomplishedPercentage <= 80,
                ["bg-violet-500 border-violet-400"]: amountAcomplishedPercentage > 80,
                ["border-zinc-300 border-4"]: isCurrentDay
            })}
            style={{width: DAY_SIZE, height: DAY_SIZE}}
            activeOpacity={0.7}
            {...rest}
        />
    )
}