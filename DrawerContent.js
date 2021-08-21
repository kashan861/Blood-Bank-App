import React from 'react';
import { View, StyleSheet } from 'react-native';
import SyncStorage from 'sync-storage';
import { signOut } from '../components/Login';
import {
	Title,
	Caption,
	Paragraph,
	Drawer,
	Text,
	TouchableRipple,
	Switch,
} from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import * as Facebook from 'expo-facebook';
export function DrawerContent(props) {
	const result = SyncStorage.get('userInfo');
	const dp = SyncStorage.get('dp');
	async function toggleAuthAsync() {
		const auth = await Facebook.getAuthenticationCredentialAsync();

		if (!auth) {
			// Log in
		} else {
			Facebook.logOutAsync();
		}
	}
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					<View style={styles.userInfoSection}>
						<View style={{ flexDirection: 'row', marginTop: 15 }}>
							<Avatar
								rounded
								onPress={() => {
									props.navigation.navigate('Profile');
								}}
								source={{
									uri: dp ? dp : result.picture.data.url,
								}}
								size={70}
							/>

							<View
								style={{
									marginLeft: 8,
									marginTop: 15,
									flexDirection: 'row',
									alignContent: 'center',
								}}
							>
								<Title style={styles.title}>{result.name}</Title>
								{/* <Caption style={styles.caption}>@j_doe</Caption> */}
							</View>
						</View>
					</View>
					<Drawer.Section>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name='home-outline' color='#36a4ba' size={size} />
							)}
							labelStyle={{ color: '#36a4ba' }}
							label='Home'
							onPress={() => {
								props.navigation.navigate('Home');
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Icon name='account-outline' color='#36a4ba' size={size} />
							)}
							labelStyle={{ color: '#36a4ba' }}
							label='Profile'
							onPress={() => {
								props.navigation.navigate('Profile');
							}}
						/>
						{/* <DrawerItem 
                 icon={({color, size}) => (
                    <Icon 
                    name="home-outline" 
                    color={color}
                    size={size}
                    />
                
                )}
                label="Home"
                onPress={()=>{props.navigation.navigate("CurrentLocation")}}
                /> */}
						<DrawerItem
							icon={({ color, size }) => (
								<Icons name='hand-holding-heart' color='#36a4ba' size={size} />
							)}
							labelStyle={{ color: '#36a4ba' }}
							label='Donor'
							onPress={() => {
								props.navigation.navigate('Donor');
							}}
						/>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({ color, size }) => (
						<Icon name='exit-to-app' color='#36a4ba' size={size} />
					)}
                    labelStyle={{color: '#36a4ba'}}
					label='Sign Out'
					onPress={() => {
						props.navigation.navigate('Login');
					}}
				/>
			</Drawer.Section>
		</View>
	);
}
const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	drawerSection: {
		marginTop: 15,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
	},
});
