import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { Button, Item, Input, Label, Icon } from 'native-base';
import * as firebase from 'firebase';

export default class SignupScreen extends React.Component {
	state = {
		Username: '',
		email: '',
		password: '',
		ConfirmPassword: '',
	};

	static navigationOptions = {
		title: 'Sign Up',
	};
	userSignup(email, Pass) {
		console.log(this.state);
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, Pass)
			.then(() => {
				Alert.alert('You Account was Created Successfully!!');
				this.props.navigation.navigate('Login');
			})
			.catch((error) => {
				Alert.alert(error.message);
			});
	}
	render() {
		return (
			<KeyboardAvoidingView behavior='position' style={styles.container}>
				<View style={{ alignItems: 'center' }}>
					<Image
						source={require('../../assets/bloodDonor.jpg')}
						style={{ width: 200, height: 200 }}
					/>
				</View>
				<Item rounded style={styles.item}>
					<Icon style={{ color: '#36a4ba' }} name='person' size={24} />
					<Input
						value={this.state.Username}
						onChangeText={(text) => this.setState({ Username: text })}
						placeholder='Username'
					/>
				</Item>

				<Item rounded style={styles.item}>
					<Icon style={{ color: '#36a4ba' }} name='mail' size={24} />

					<Input
						value={this.state.email}
						onChangeText={(text) => this.setState({ email: text })}
						placeholder='Email'
					/>
				</Item>

				<Item rounded style={styles.item}>
					<Icon style={{ color: '#36a4ba' }} name='lock' size={24} />

					<Input
						secureTextEntry={true}
						value={this.state.password}
						onChangeText={(text) => this.setState({ password: text })}
						placeholder='Password'
					/>
				</Item>

				<Item rounded style={styles.item}>
					<Icon style={{ color: '#36a4ba' }} name='lock' size={24} />
					<Input
						secureTextEntry={true}
						value={this.state.ConfirmPassword}
						onChangeText={(text) => this.setState({ ConfirmPassword: text })}
						placeholder='confirm password'
					/>
				</Item>

				<Button
					style={{
						backgroundColor: '#36a4ba',
						margin: 10,
						justifyContent: 'center',
						height: 55,
						width: 320,
					}}
					full
					rounded
					danger
					onPress={() =>
						this.userSignup(
							this.state.email,
							this.state.password,
							this.state.ConfirmPassword,
							this.state.Username
						)
					}
				>
					<Text style={{ fontSize: 20, color: 'white' }}>Sign Up</Text>
				</Button>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Login')}
				>
					<Text style={{ textAlign: 'center' }}>Already Have An Account ?</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		padding: 15,
	},
	item: {
		borderColor: '#36a4ba',
		padding: 5,
		margin: 7,
	},
});
