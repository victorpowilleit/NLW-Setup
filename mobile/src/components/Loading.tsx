import {ActivityIndicator, View, Text} from "react-native";

export function Loading(){
    return(
        <>
            <View style={{flex:1, justifyContent: "center", alignItems: "center", backgroundColor:"#09090A"}}>
                <ActivityIndicator color="#7C3AED" size="large"/>
                <Text style={{color:"#7C3AED", marginTop: 50, fontSize:16}}>CARREGANDO...</Text>
            </View>
        </>
    )
}