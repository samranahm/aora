import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

import { images } from "../constants";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center 
        items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="w-[380px] h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Discover Endless Possibilities with{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[115px] h-[13px] absolute
              -bottom-1 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular 
          text-gray-100 mt-7 text-center">Where creativity meets innovation:
            embark on the journey of limitless exploration
          </Text>

          <Link href="/(auth)/Sign-in">
            Log in
          </Link>

          <CustomButton
           title="Continue with Email"
           handlePress={() => {}}
           containerStyle="w-full mt-7"
           />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" 
      style="light" />
    </SafeAreaView>
  );
}
