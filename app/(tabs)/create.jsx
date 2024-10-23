import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { Link, router, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../../lib/appwrite';


const Create = () => {

  const logOut = async () => {
    try{
     await logout();
     router.replace('/Sign-in');
  } catch (error) {
    console.log('Logout failed:', error)
  }

};
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={logOut} className="mx-10 bg-secondary h-10 
      items-center justify-center">
                 <Text>
                  Logout
                  </Text> 
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Create