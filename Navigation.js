import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/Home.js'
import ProfileScreen from '../components/Profile.js'
import ChatsTab from '../components/Tabs/Chat'
import CallsTab from '../components/Tabs/Calls'
import StatusTab from '../components/Tabs/Status'
import Login from "../components/Login"
import Homes from "../components/Home"
import Donor from "../components/Donor"
import Chat from "../components/Chat"
import CurrentLocation from "../components/CurrentLocation"
import Main from "../../App"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/Home.js';
import SyncStorage from 'sync-storage';
import { Header } from 'react-native/Libraries/NewAppScreen';
import {Feather} from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'native-base';
import {DrawerContent} from "../components/DrawerContent"
const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  const result = SyncStorage.get('userInfo');
  console.log(">>>>>>asd>>>>>",result)

  
  return (
    <NavigationContainer>
      
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
 
      {/* <Drawer.Screen name="gfg" component={header} /> */}
      {/* <Drawer.Screen name="test" options={{drawerLabel:"abcd"}}/> */}
      <Drawer.Screen name="Home" component={Homes}   />
      <Drawer.Screen name="Donor" component={Donor}   />
      <Drawer.Screen name="Chat" component={Chat}  />
      <Drawer.Screen name="Profile" component={ProfileScreen}  />
      
      <Drawer.Screen name="CurrentLocation" component={CurrentLocation}  />
      <Drawer.Screen name="Login" component={Login}  />
     
    
      
    </Drawer.Navigator>

    </NavigationContainer>
  )
}

  
// export default function StackNavigator() {
//   return (
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={TabNavigator} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//   );
// }

// function TabNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Chats" component={ChatsTab} />
//       <Tab.Screen name="Calls" component={CallsTab} />
//       <Tab.Screen name="Status" component={StatusTab} />
//     </Tab.Navigator>
//   )
// }

 
// function ChatNavigator() {
//   return (
//     <Stack.Navigator>
//         <Stack.Screen name="Chat" component={ChatsTab} />
//     </Stack.Navigator>
//   )
// }
