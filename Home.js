import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import SyncStorage from 'sync-storage';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Home({ navigation }) {
	const result = SyncStorage.get('userInfo');
	console.log('halwa puri', result);
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
						<Icon name='menu' color='#fff' size={size} />
					)}
					onPress={() => navigation.toggleDrawer()}
				/>
                <ContentTitle title={'Home'} style={{color:'white'}} />
				{/* <Appbar.Content titleStyle= '' title='Home' /> */}
			</Appbar.Header>

			<Text>{result.name}</Text>
			<Image
				style={{ width: 200, height: 200, borderRadius: 50 }}
				source={{ uri: result.picture.data.url }}
			/>
			<Button
				title='Go To Profile'
				onPress={() => navigation.navigate('Profile')}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	header: {
		backgroundColor: '#36a4ba',
		height: 30,
		paddingBottom: 10,
	},
});
