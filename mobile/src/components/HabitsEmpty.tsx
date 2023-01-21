import {Text} from 'react-native'
import {useNavigation} from "@react-navigation/native";

export function HabitsEmpty(isPast: any) {
    const {navigate} = useNavigation()
    return (
        <Text className="text-zinc-400 text-base text-white">
            {!isPast &&
              <>
                Você ainda não está monitorando nenhum hábito hoje.{' '}
                <Text className="text-violet-400 text-base underline active:text-violet-500"
                      onPress={() => navigate('new')}>
                  Comece cadastrando um
                </Text>
              </>
            }
        </Text>
    )
}