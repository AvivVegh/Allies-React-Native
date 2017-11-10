import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
// import { onSignIn } from "../auth";

class SignIn extends Component {
  onSignInPressed = () => {
    this.props.navigation.navigate('Tabs');
  };

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title="SIGN IN">
          <FormLabel>Email</FormLabel>
          <FormInput placeholder="Email address..." />
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry placeholder="Password..." />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={this.onSignInPressed}
          />
        </Card>
      </View>
    );
  }
}

export default SignIn;
