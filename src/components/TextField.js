import React from "react";
import { TextInput, StyleSheet, View, Text, I18nManager } from "react-native";
import { hScale, vScale, fScale } from "step-scale";
import { colors } from "../../constants/colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const {isRTL} = I18nManager

export const TextField = props => {
    const {
        container,
        input,
        error,
        errorMessageStyle,
        errorContainer
    } = styles;
    const {
        containerStyle,
        // isError,
        errorMessage,
        inputStyle,
    } = props;
    return (
        <View>
            <View style={[container, containerStyle]}>
                <TextInput
                    style={[input, isRTL && { textAlign: "right" } ,inputStyle]}
                    placeholderTextColor={colors.inputPlaceholder}
                    {...props}
                />
            </View>
            <View style={errorContainer}>
                    <Text style={errorMessageStyle}>
                        {errorMessage? errorMessage : ''}
                    </Text>    
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: wp('50%'),
        height: hp('10%'),
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderColor: "#cccccc",
        borderRadius: wp('10%'),
        paddingHorizontal: hScale(20)
    },
    input: {
        flex: 1,
        height: vScale(28),
        // fontFamily: "29LTBukra",
        fontSize: fScale(12),
        fontWeight: "bold",
        color: "#43489b",
    },
    error: {
        borderColor: "red"
    },
    errorMessageStyle: {
        alignSelf: "stretch",
        textAlign: "center",
        fontSize: fScale(11),
        color: "red"
    },
    errorContainer: {
        height: vScale(15)
    }
});
