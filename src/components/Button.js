import React from "react";

import { View, Dimensions, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({label, OnClick, double, triple, operation}){
    const stylesButton = [styles.button]


    double && stylesButton.push(styles.buttonDouble)
    triple && stylesButton.push(styles.buttonTriple)
    operation && stylesButton.push(styles.operationButton)

    return(
        <TouchableHighlight onPress={OnClick}>
            <Text style={stylesButton}>
                {label}
            </Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button :{
        fontSize: 40,
        width: Dimensions.get("window").width / 4,
        height: Dimensions.get("window").height / 8,
        padding: 20,
        backgroundColor: "#F0F0F0",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#888",
        fontWeight: "bold"
    },

    operationButton: {
        color: "#FFF",
        backgroundColor: "#FA8231",
    },

    buttonDouble: {
        width: (Dimensions.get("window").width / 4) * 2,
    },

    buttonTriple: {
        width: (Dimensions.get("window").width / 4) * 3,
    }

})
