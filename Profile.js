// import React from 'react'
// import { View, Text, StyleSheet } from 'react-native'
// import { Appbar } from 'react-native-paper';
// import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// export default function Profile({ navigation}) {
//     return (
//         <View>
//          <Appbar.Header style={styles.header}>
//   <Appbar.Action  icon={({color, size}) => (
//                 <Icon
//                 name="menu"
//                 color={color}
//                 size={size}
//                 />

//             )} onPress={()=>navigation.toggleDrawer()} />
//             <Appbar.Content title="Profile"  />

// </Appbar.Header>

//         </View>
//     )
// }
// const styles = StyleSheet.create({
// header: {
//     height:30,
//     paddingBottom:10
// }
// })
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	ImageBackground,
	Alert,
} from 'react-native';
import {
	Button,
	Item,
	Input,
	Icon,
	Container,
	Content,
	Picker,
	Label,
	Form,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import SyncStorage from 'sync-storage';
import { Appbar } from 'react-native-paper';
import { Avatar, Accessory } from 'react-native-elements';

// import { ImagePicker } from "expo-image-picker";
// import { ImagePicker, Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// import { StyleSheet, Text, View,Image,KeyboardAvoidingView , TouchableOpacity,Alert, ImageBackground } from 'react-native';
// import { Button, Item, Input, Label } from 'native-base';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
// import firebase from "../../Firebase"
// const userData = SyncStorage.get('userInfo');

// console.log(">>>>>>>>>>>>>acaca>>>>>>>>>>>>>",uid)
// if(userData){
//   const uid = userData.id
export default class ProfileScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			cell: null,
			uid: '',
			// language: 'Blood Group',
			firstLanguage: 'Blood Group',
			secondLanguage: 'Fever',
			selectImg: null,
			location: null,
			geocode: null,
			errorMessage: '',
		};
	}
	async componentDidMount() {
		const response = await SyncStorage.get('userInfo');
		const json = await response.id;
		this.setState({ uid: json });
	}

	getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
			});
		}

		let location = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.Lowest,
		});
		const { latitude, longitude } = location.coords;
		this.getGeocodeAsync({ latitude, longitude });
		this.setState({ location: { latitude, longitude } });
	};
	getGeocodeAsync = async (location) => {
		let geocode = await Location.reverseGeocodeAsync(location);
		this.setState({ geocode });
	};

	addData = () => {
		console.log(this.state.geocode);
		console.log('asdfghhjjk');
		let {
			firstLanguage,
			uid,
			name,
			cell,
			secondLanguage,
			geocode,
			location,
			selectImg,
		} = this.state;
		if (
			name == '' ||
			cell == '' ||
			firstLanguage == 'Blood Group' ||
			secondLanguage == 'Fever' ||
			geocode == null ||
			location == null ||
			selectImg == null
		) {
			Alert.alert(
				'Error',
				'Please fill all the fields!',
				[
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					},
					{ text: 'OK', onPress: () => console.log('OK Pressed') },
				],
				{ cancelable: false }
			);
		} else {
			const storageRef = firebase.storage().ref().child(`images`);
			SyncStorage.set('dp', selectImg.localUri);
			storageRef.put(this.state.selectImg).then(function (response) {
				response.ref.getDownloadURL().then(function (uri) {
					firebase
						.firestore()
						.collection('userData')
						.doc(uid)
						.set({
							name: name,
							cell: cell,
							bloodGroup: firstLanguage,
							image: uri,
							fever: secondLanguage,
							geocode: geocode,
							location: location,
						})
						.then(function () {
							// handleClose();
							console.log('success');
							// Swal({
							//   title: "Company",
							//   text: "Your company added successfully",
							//   icon: "success",
							// });
						})
						.catch(function (e) {
							// Swal({
							//   title: "Error",
							//   text: e.message,
							//   icon: "error",
							// });
							alert('error');
						});
				});
			});
		}
	};

	// const [ setSelectedImg]  = useState(null)
	openImage = async () => {
		let permission = await ImagePicker.requestCameraRollPermissionsAsync();

		if (permission.granted === false) {
			return;
		}

		let picker = await ImagePicker.launchImageLibraryAsync();

		if (picker.cancelled === true) {
			return;
		}
		this.setState({ selectImg: { localUri: picker.uri } });
		console.log(picker);
  };
	render() {
    const { location, geocode, errorMessage } = this.state;
    
      const ContentTitle = ({ title, style }) => (
        <Appbar.Content
          title={<Text style={style}> {title} </Text>}
          
        />
      );
		return (
			<KeyboardAvoidingView style={{ backgroundColor: '#fff' }}>
				<ScrollView style={{ backgroundColor: '#fff' }}>
					<View style={(Styles.root, { backgroundColor: '#fff' })}>
						<Appbar.Header style={Styles.header}>
							<Appbar.Action
								icon={({ color , size }) => (
									<Icons name='menu' color='#fff' size={size} />
								)}
								onPress={() => this.props.navigation.toggleDrawer()}
							/>
              <ContentTitle title={'Profile'} style={{color:'white'}} />
							{/* <Appbar.Content  title='Profile' style={{color:'white'}} /> */}
						</Appbar.Header>
						{/* <LinearGradient
           style={{height:180}}
           colors={["#f56262","#ff9e9e"]}
           
           /> */}
						{/* <Image

                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100/4,
                    borderWidth: 3,
                    marginTop:-20,
                    borderColor: 'black',
                }}
             
        />  */}
						<View style={Styles.container}>
							<View>
								{this.state.selectImg !== null ? (
									<Avatar
										rounded
										onPress={() => {
											props.navigation.navigate('Profile');
										}}
										source={{
											uri:
												this.state.selectImg.localUri !== null
													? this.state.selectImg.localUri
													: 'https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg',
										}}
										size={70}
									/>
								) : (
									// <Image
									//   style={{
									//     width: 100,
									//     height: 100,
									//     borderRadius: 100 / 4,
									//     borderWidth: 3,
									//     marginTop: -50,
									//     borderColor: '#f56262',
									//   }}
									//   source={{ uri: (this.state.selectImg.localUri !== null) ? this.state.selectImg.localUri : 'https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg' }} />

									<Avatar
										rounded
										onPress={() => {
											props.navigation.navigate('Profile');
										}}
										source={{
											uri: SyncStorage.get('userInfo').picture.data.url,
										}}
										size={90}
									></Avatar>
								)}
								<TouchableOpacity onPress={this.openImage}>
									<Icon
										style={{
											color: '#36a4ba',
											marginLeft: 60,
											marginBottom: 130,
											marginTop: 1,
										}}
										active
										name='camera'
									/>
									{/* <Text>Click</Text> */}
								</TouchableOpacity>
							</View>
						</View>
						<Item rounded style={Styles.item}>
							<Icon style={{ color: '#36a4ba' }} active name='person' />
							<Input
								value={this.state.name}
								onChangeText={(e) => {
									this.setState({ name: e });
								}}
								placeholder=' Full Name'
							/>
						</Item>
						<Item rounded style={Styles.item}>
							<Icon style={{ color: '#36a4ba' }} active name='call' />
							<Input
								keyboardType='numeric'
								value={this.state.cell}
								onChangeText={(text) => this.setState({ cell: text })}
								placeholder='Phone number'
							/>
						</Item>
						<Item picker rounded style={Styles.item}>
							<Icon style={{ color: '#36a4ba' }} active name='medkit' />

							<Picker
								//   style={styles.onePicker} itemStyle={styles.onePickerItem}
								selectedValue={this.state.firstLanguage}
								onValueChange={(itemValue) =>
									this.setState({ firstLanguage: itemValue })
								}
							>
								<Picker.Item label='Blood Group' value='Blood Group' />
								<Picker.Item label=' Negative (A-)' value=' Negative (A-)' />
								<Picker.Item label=' Positive (A+)' value=' Positive (A+)' />
								<Picker.Item label=' Positive (B+)' value=' Positive (B+)' />
								<Picker.Item label=' Negative (B-)' value=' Negative (B-)' />
								<Picker.Item label=' Positive (O+)' value=' Positive (O+)' />
								<Picker.Item label=' Negative (O-)' value=' Negative (O-)' />
								<Picker.Item label=' Positive (AB+)' value=' Positive (AB+)' />
								<Picker.Item label=' Negative (AB-)' value=' Negative (AB-)' />
							</Picker>
						</Item>
						<Item picker rounded style={Styles.item}>
							<Icon style={{ color: '#36a4ba' }} active name='pulse' />

							<Picker
								//   style={styles.onePicker} itemStyle={styles.onePickerItem}
								selectedValue={this.state.secondLanguage}
								onValueChange={(itemValue) =>
									this.setState({ secondLanguage: itemValue })
								}
								placeholder='select health'
							>
								<Picker.Item label='Health' value='Health' />
								<Picker.Item label='Fever' value='Fever' />
								<Picker.Item label='Cough' value='Cough' />
								<Picker.Item label='Flu' value='Flu' />
								<Picker.Item label='Heart Pain' value='Heart Pain' />
							</Picker>
						</Item>
					</View>
					<Item
						style={Styles.overlay}
						onPress={() => this.getLocationAsync()}
						//	style={{ height: 50, borderColor: '#36a4ba' }}
						rounded
						placeholder='Select Your Current Location'
					>
						<TouchableOpacity placeholder='Select Your Current Location'>
							<Icon style={{ color: '#36a4ba' }} name='navigate' />

							{/* <Image source={require("../../assets/marker.png")} style={{width:100,height:100}} /> */}
							<Text style={Styles.heading1}>
								{geocode
									? `${geocode[0].city}, ${geocode[0].isoCountryCode}`
									: ''}

								{/* <Text style={Styles.heading2}> */}
								{geocode ? geocode[0].district : ''}
							</Text>
							{/* <Text style={Styles.heading3}>{location ? `${location.latitude}, ${location.longitude}` :""}</Text> */}
							{/* <Text style={Styles.heading2}>{errorMessage}</Text> */}
							{/* <Button onPress={()=>this.getLocationAsync()}><Text>Click me</Text></Button> */}
						</TouchableOpacity>
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
						onPress={() => {
							this.addData();
						}}
					>
						<Icon name='save' />
						<Text style={{ fontSize: 20, color: 'white' }}>Save</Text>
					</Button>
					{/* <Button
						style={{
							alignItems: 'center',
							padding: 20,
							marginTop: 60,
							marginLeft: 110,
							backgroundColor: '#f56262',
							borderRadius: 10,
						}}
						onPress={() => {
							this.addData();
						}}
					>
						<Icon name='save' />
						<Text style={{ fontSize: 20, color: 'white' }}>SAVE</Text>
					</Button> */}
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
const Styles = StyleSheet.create({
	root: {
		backgroundColor: '#fff',
		flex: 1,
	},

	onePicker: {
		width: 200,
		height: 44,
		backgroundColor: '#FFF0E0',
		borderColor: '#36a4ba',
		borderWidth: 1,
	},
	onePickerItem: {
		height: 44,
		color: 'red',
	},
	row: { flexDirection: 'row' },
	button: {
		borderRadius: 10,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#36a4ba',
		width: 100,
		height: 100,
		borderRadius: 100 / 4,
		borderWidth: 3,
		padding: 10,
	},
	image: {
		width: 300,
		height: 300,
		resizeMode: 'contain',
	},
	container: {
		flex: 1,
		backgroundColor: '#ffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	overlay: {
		//marginTop: 50,
		textAlign: 'center',
		backgroundColor: '#fff',
		height: 50,
		width: 351,
	},
	heading1: {
		color: '#36a4ba',
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: -30,
		marginLeft: 35,
	},
	heading2: {
		color: '#36a4ba',
		margin: 5,
		fontWeight: 'bold',
		fontSize: 15,
		marginLeft: 120,
	},
	header: {
		backgroundColor: '#36a4ba',
		height: 30,
		paddingBottom: 10,
	},
	item: {
		borderColor: '#36a4ba',
		padding: 3,
		height: 50,
		margin: 6,
	},
	title: {
		color: '#fff',
	},
});
