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
import StackNavigator from '../config/Navigation';
import { Button, Item, Input, Label, Icon } from 'native-base';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
// import SyncStorage from 'sync-storage';
import SyncStorage from 'sync-storage';
import { Appbar } from 'react-native-paper';
import { SocialIcon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SignupScreen extends React.Component {
	state = {
		Email: '',
		Password: '',
	};
	async facebookLogin() {
		await Facebook.initializeAsync({
			appId: '793879184777312',
		});
		const {
			type,
			token,
			expirationDate,
			permissions,
			declinedPermissions,
		} = await Facebook.logInWithReadPermissionsAsync({
			permissions: ['public_profile'],
		});

		if (type === 'success') {
			// Get the user's name using Facebook's Graph API
			const response = await fetch(
				`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`
			);
			const userInfo = await response.json();
			console.log('userInfo', userInfo);
			SyncStorage.set('userInfo', userInfo);
			// const result = SyncStorage.get('userInfo');
			//   Alert.alert('Logged in!', `Hi ${result.name}!`);
			//   console.log(">>>>>>>>",result)
			this.props.navigation.navigate('Home');
		} else {
			// type === 'cancel'
		}
	}
	static navigationOptions = {
		title: ' Log in',
	};
	userSignin(Email, Pass) {
		firebase
			.auth()
			.signInWithEmailAndPassword(Email, Pass)
			.then(() => {
				Alert.alert('Your Account LogIn SucessFully!!');
				this.props.navigation.navigate('Home');
			})
			.catch((error) => {
				Alert.alert(error.message);
			});
	}
	renderButton = () => (
		<TouchableOpacity onPress={() => this.facebookLogin()}>
			<SocialIcon
				title='Sign In With Facebook'
				button
				type='facebook'
				style={{ marginTop: 30 }}
			/>
		</TouchableOpacity>
	);
	renderButton2 = () => (
		<TouchableOpacity onPress={() => this.facebookLogin()}>
			<SocialIcon
				title='Sign In With Google'
				button
				type='google'
				//style={{  }}
			/>
		</TouchableOpacity>
	);
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
					<Icon
						style={{ marginLeft: 15, marginBottom: 8, color: '#36a4ba' }}
						name='person'
						size={24}
					/>
					<Input
						style={{ color: '#36a4ba' }}
						value={this.state.Email}
						onChangeText={(text) => this.setState({ Email: text })}
						placeholder='Email'
						placeholderTextColor='#36a4ba'
					/>
				</Item>
				<Item rounded style={styles.item}>
					<Icon
						style={{ marginLeft: 15, marginBottom: 8, color: '#36a4ba' }}
						name='lock'
						size={24}
					/>
					<Input
						style={{ color: '#36a4ba' }}
						secureTextEntry={true}
						value={this.state.Password}
						onChangeText={(text) => this.setState({ Password: text })}
						placeholder='Password'
						placeholderTextColor='#36a4ba'
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
					onPress={() => this.userSignin(this.state.Email, this.state.Password)}
				>
					<Text style={{ fontSize: 20, color: 'white' }}>Log In</Text>
				</Button>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Signup')}
				>
					<Text style={{ textAlign: 'center', marginTop: 10 }}>
						Don't have an account ?
					</Text>
				</TouchableOpacity>
				{this.renderButton()}
				{this.renderButton2()}
				{/* <Button
					style={{ backgroundColor: '#f56262', margin: 30 }}
					full
					rounded
					danger
					onPress={() => this.facebookLogin()}
				>
					<Text style={{ fontSize: 20, color: 'white' }}>
						Sign In With Facebook
					</Text>
				</Button> */}
				<StatusBar style='auto' />
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10,
		justifyContent: 'flex-start',
	},
	item: {
		borderColor: '#36a4ba',
		margin: 10,
	},
});
// const signOut = function(){

// Facebook.logOutAsync()
// }

class signOut extends React.Component {
	abc() {
		console.log('Misbah');
	}
}
export { signOut };
