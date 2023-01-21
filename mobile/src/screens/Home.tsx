import {Text, View, ScrollView, Alert} from "react-native";
import {Header} from "../components/Header";
import {HabitDay, DAY_SIZE} from "../components/HabitDay";

import {generateRangeDatesFromYearStart} from "../utils/generate-range-between-dates";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useState} from "react";
import {api} from "../lib/axios";
import {Loading} from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
const datesFromYearStart = generateRangeDatesFromYearStart()

const minimumSummaryDatesSize = 13 * 7 - 1
const ammountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length

type SummaryProps = {
    id: string
    date: string
    amount: number
    completed: number
}[]

export function Home() {
    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<SummaryProps | null>(null)
    const {navigate} = useNavigation()

    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get('/summary')
            console.log(response.data)
            setSummary(response.data)
        } catch (e) {
            Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos.")
            console.log("Erro: ", e)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchData()
    }, []))

    if (loading) {
        return <Loading/>
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header/>
            <View className="flex-row mt-6 mb-2">
                {weekDays.map((weekDay, i) =>
                    <Text
                        key={weekDay + i}
                        className="text-zinc-400 text-xl font-bold text-center mx-1"
                        style={{width: DAY_SIZE}}
                    >
                        {weekDay}
                    </Text>
                )}
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            >

                {summary &&
                  <View className="flex-row flex-wrap">
                      {
                          datesFromYearStart.map(date => {
                                  const dayWithHabits = summary.find(day => {
                                      return dayjs(date).isSame(day.date, 'day')
                                  })
                                  return (
                                      <HabitDay
                                          key={date.toString()}
                                          amountOfHabits={dayWithHabits?.amount}
                                          amountCompleted={dayWithHabits?.completed}
                                          date={date}
                                          onPress={() => {
                                              navigate('habit', {date: date.toISOString()})
                                          }}
                                      />
                                  )
                              }
                          )
                      }
                      {
                          ammountOfDaysToFill > 0 && Array
                              .from({length: ammountOfDaysToFill})
                              .map((_, i) =>
                                  <View
                                      key={`dayPlaceholder-${i}`}
                                      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                      style={{width: DAY_SIZE, height: DAY_SIZE}}/>
                              )
                      }
                  </View>}
            </ScrollView>

            {/*<Text className="text-center text-xl text-white">V P D e v</Text>*/}
            {/*<Text className="text-center text-white">Web Development</Text>*/}
        </View>
    )
}

function useEffetc(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}

