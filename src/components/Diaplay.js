import React from "react";
import { View, Text, StyleSheet} from "react-native"

export default function Display({value}){
    return(
        <View style={styles.display}>
            <Text style={styles.displayValue} adjustsFontSizeToFit  numberOfLines={1}>
                {value}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    display:{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "flex-end", //ALINHADO A DIREITA
        backgroundColor: "rgba(0,0,0, 0.6)",
    },

    displayValue: {
        fontSize: 60,
        color: "#FFF",
        
    }
})