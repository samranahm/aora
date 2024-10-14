import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-pextrabold">Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{color:'blue'}}>Go to home</Link>
    </View>
  )
}


