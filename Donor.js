import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Alert,
	Image,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	Linking,
	Platform,
} from 'react-native';
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Body,
	Text,
	Icon,
	Button,
	Left,
	Right,
	FlatList,
} from 'native-base';
import firebase from 'firebase';
import { joinRoom } from '../../Firebase';
import { Appbar } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

function donor({ navigation }) {
	const [donorList, setDonorList] = useState();
	useEffect(() => {
		getDonor();
	}, []);

	const getDonor = function () {
		firebase
			.firestore()
			.collection('userData')
			.onSnapshot((res) => {
				const list = [];
				res.forEach((doc) => {
					const comp = doc.data();
					list.push({ ...comp, compId: doc.id });
				});
				setDonorList(list);
				console.log(list);
			});
	};
	const makeCall = function (cell) {
		let phoneNumber = '';

		if (Platform.OS === 'android') {
			phoneNumber = `tel:${cell}`;
		} else {
			phoneNumber = `telprompt:${cell}`;
		}

		Linking.openURL(phoneNumber);
	};
	//     const navigateToChat = function(fid){
	//         joinRoom(fid)
	//         console.log(fid)
	//         navigation.navigate('Chat' , { fid:fid})

    //   };
    const ContentTitle = ({ title, style }) => (
        <Appbar.Content
          title={<Text style={style}> {title} </Text>}
          
        />
      );
	return (
		<View>
			<Appbar.Header style={styles.header}>
				<Appbar.Action
					icon={({ color, size }) => (
						<Icons name='menu' color='#fff' size={size} />
					)}
					onPress={() => navigation.toggleDrawer()}
				/>
                <ContentTitle title={'Donor'} style={{color:'white' }} />
				{/* <Appbar.Content title='Donor' /> */}
			</Appbar.Header>
			{donorList &&
				donorList.map((items) => {
					return (
						<View>
							<Card style={styles.card}>
								<CardItem style={styles.card}>
									<Body>
										<View>
											<Text style={styles.text}>Name : {items.name}</Text>
											<Text style={styles.text}>
												Blood Group : {items.bloodGroup}
											</Text>
											<Text style={styles.text}>Phone : {items.cell}</Text>
											<Text style={styles.text}>
												Location : {items.geocode[0].district},
												{items.geocode[0].city},
												{items.geocode[0].isoCountryCode}
											</Text>
										</View>
										{/* <View style={{marginTop:20}}>

                                              </View> */}
									</Body>
									<View>
										{/* <Icon name="chatbubbles" style={styles.icon} onPress={()=>{navigateToChat(items.compId)}}  /> */}
										<Icon
											name='chatbubbles'
											style={styles.icon}
											onPress={() =>
												navigation.navigate('Chat', { fid: items.compId })
											}
										/>
									</View>
									<View>
										<Icon
											name='call'
											style={styles.icon1}
											onPress={() => {
												makeCall(items.cell);
											}}
											activeOpacity={0.7}
										/>
									</View>
								</CardItem>
							</Card>
						</View>
					);
				})}
		</View>
	);
}
export default donor;

const styles = StyleSheet.create({
	card: {
		height: 120,
		padding: -10,
		backgroundColor: '#36a4ba',
		borderRadius: 30,
	},
	icon: {
		color: '#fff',
		marginTop: 60,
		marginRight: -35,
		fontSize: 35,
	},
	icon1: {
		marginTop: -40,
		fontSize: 35,
		color: '#fff',
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 15,
	},
	header: {
		backgroundColor: '#36a4ba',
		height: 30,
		paddingBottom: 10,
	},
});
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#36a4ba',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     card: {
//         height: 120,
//         padding: -10,
//         backgroundColor: '#36a4ba',
//     },
//     buttton: {
//         color: '#fff',
//         padding: 14,
//         //backgroundColor : "#36a4ba",
//         marginLeft: 250,
//         marginTop: -40,
//     },
// });
