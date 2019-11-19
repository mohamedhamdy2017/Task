import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export class CheckOut extends Component {
    state = { showError: false, email: "", name: "", mobile: "", error: "" }
    validateInputs(
        {mobileError,
        nameError,
        emailError}
    ) {
        if (mobileError) {
            this.setState({ error: "mobile" });
        } else if (nameError) {
            this.setState({ error: "name" });
        } else if (emailError) {
            this.setState({ error: "email" });
        }
        else {
            alert('Done Successfully')
        }
    }
    render() {
        const { email, name, mobile, error } = this.state
        const mobileError =
            mobile.length == 0 || !isNaN(mobile) || mobile.length < 10;
        const isMobileError = error === "mobile";

        const nameError = name.length == 0 || name.length < 3;
        const isNameError = error === "name";

        const emailError = email.length == 0
        const isEmailError = error === "email";

        return (
            <View style={{ flex: 1, alignItems: "center", marginTop: 150 }}>
                <TextInput
                    style={{ width: widthPercentageToDP('100%'), height: heightPercentageToDP('5%'), textAlign: 'center', borderWidth: 0.25, borderColor: 'gray', marginBottom: 20 }}
                    placeholder="Email"
                    value={email}
                    onChangeText={email => this.setState({ email })}
                    // isError={isEmailError}
                    errorMessage={isEmailError && "Email Error"}
                />
                <TextInput
                    style={{ width: widthPercentageToDP('100%'), height: heightPercentageToDP('5%'), textAlign: 'center', borderWidth: 0.5, borderColor: 'gray', marginBottom: 20 }}
                    placeholder="Name"
                    value={name}
                    onChangeText={name => this.setState({ name })}
                    errorMessage={isNameError && "Name Error"}
                    // isError={isNameError}
                />
                <TextInput
                    style={{ width: widthPercentageToDP('100%'), height: heightPercentageToDP('5%'), textAlign: 'center', borderWidth: 0.5, borderColor: 'gray', marginBottom: 20 }}
                    placeholder="Phone Num"
                    value={mobile}
                    onChangeText={mobile => this.setState({ mobile })}
                    errorMessage={isMobileError && "Mobile Error"}
                    // isError={isMobileError}
                />
                <Button
                    title="Done"
                    onPress={() => this.validateInputs(
                        {mobileError,
                        nameError,
                        emailError})}
                />
            </View>
        )
    }
}