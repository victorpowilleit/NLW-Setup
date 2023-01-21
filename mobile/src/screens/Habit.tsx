import {ScrollView, View, Text, Alert} from 'react-native'
import {BackButton} from "../components/BackButton";
import {useRoute} from "@react-navigation/native";
import dayjs from "dayjs";
import {ProgressBar} from "../components/ProgressBar";
import {Checkbox} from '../components/Checkbox';
import {useEffect, useState} from "react";
import {Loading} from '../components/Loading';
import {api} from "../lib/axios";
import {generateProgressPercentage} from "../utils/generate-progress-percentage";
import {HabitsEmpty} from '../components/HabitsEmpty';
import clsx from 'clsx';

interface Params {
    date: string
}

interface DayInfoProps {
    completedHabits: string[]
    possibleHabits: {
        id: string
        title: string
    }[]
}

export function Habit() {
    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])

    const route = useRoute()
    const {date} = route.params as Params
    const parsedDate = dayjs(date)
    const isDateInPast = parsedDate.endOf('day').isBefore(dayjs(new Date).startOf('day'))
    const dayOfWeek = parsedDate.format("dddd")
    const dayAndMonth = parsedDate.format("DD/MM")

    const habitsProgress = dayInfo?.possibleHabits.length ?
        generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    async function fetchHabits() {
        try {
            setLoading(true)
            const r = await api.get('/day', {params: {date: date}})
            setDayInfo(r.data)
            setCompletedHabits(r.data.completedHabits)
        } catch (e) {
            console.log(e)
            Alert.alert(
                'Ops',
                'Não foi possível carregar as informações dos hábitos'
            )
        } finally {
            setLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string) {
        try {
            await api.patch(`/habits/${habitId}/toggle`)
            if (completedHabits.includes(habitId)) {
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
            } else {
                setCompletedHabits(prevState => [...prevState, habitId])
            }
        } catch (e) {
            console.log(e)
            Alert.alert('Ops', "Não foi possível atualizar o status do hábito")
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [])

    if (loading) {
        return (<Loading/>)
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
                <BackButton/>
                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>
                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>
                <ProgressBar progress={habitsProgress}/>
                <View className={clsx("mt-6", {["opacity-50"]: isDateInPast})}>
                    {
                        dayInfo?.possibleHabits.length ?
                            dayInfo?.possibleHabits.map((day: { id: string, title: string }) =>
                                <Checkbox
                                    key={day.id}
                                    title={day.title}
                                    checked={completedHabits.includes(day.id)}
                                    disabled={isDateInPast}
                                    onPress={() => handleToggleHabit(day.id)}
                                />
                            ) : <HabitsEmpty isPast={isDateInPast}/>
                    }
                </View>
                {isDateInPast && <Text className="text-white mt-10 text-center">
                  Você não pode editar datas passadas.
                </Text>}
            </ScrollView>
        </View>
    )
}