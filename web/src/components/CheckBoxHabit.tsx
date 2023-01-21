import * as Checkbox from "@radix-ui/react-checkbox";
import {Check} from "phosphor-react";

interface Props {
    id?: any
    title: string
    weekDay?: number
    isDayInPast?: boolean

    toggleData(i: any): any

    checked?: boolean
}

export function CheckBoxHabit({title, toggleData, id, checked, isDayInPast}: Props) {
    return (
        <Checkbox.Root
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
            checked={checked}
            disabled={isDayInPast}
            onCheckedChange={() => toggleData(id)}
        >
            <div
                className="h-8 w-8 rounded-lg flex items-center justify-center
                                bg-zinc-900 border-2 border-zinc-800
                                group-data-[state=checked]:bg-green-500
                                group-data-[state=checked]:border-green-500
                                transition-colors focus:outline-none group-focus:ring-2
                                group-focus:ring-violet-600 group-focus:ring-offset-2
                                group-focus:ring-offset-background"
            >
                <Checkbox.CheckboxIndicator>
                    <Check size={20} className={"text-white"}/>
                </Checkbox.CheckboxIndicator>
            </div>
            <span
                className="font-semibold text-xl text-white leading-tight
                                group-data-[state=checked]:line-through
                                group-data-[state=checked]:text-zinc-400"
            >
                                {title}
                            </span>
        </Checkbox.Root>
    )
}

export function CheckBoxRecurrence({title, toggleData, weekDay, checked = false}: Props) {
    return (
        <Checkbox.Root
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
            onCheckedChange={() => toggleData(weekDay)}
            checked={checked}
        >
            <div
                className="h-8 w-8 rounded-lg flex items-center justify-center
                                bg-zinc-900 border-2 border-zinc-800
                                group-data-[state=checked]:bg-green-500
                                group-data-[state=checked]:border-green-500
                                transition-colors focus:outline-none group-focus:ring-2
                                group-focus:ring-green-600 group-focus:ring-offset-2
                                group-focus:ring-offset-zinc-900"
            >
                <Checkbox.CheckboxIndicator>
                    <Check size={20} className={"text-white"}/>
                </Checkbox.CheckboxIndicator>
            </div>
            <span
                className="text-white leading-tight"
            >
                                {title}
                            </span>
        </Checkbox.Root>
    )
}