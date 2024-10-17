import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images} from '../../constants';
import { Link } from 'expo-router';
import { createUser } from '../../lib/appwrite';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password:''
  })
  const [isSubmitting, setIsSubmitting]=useState(false)

  const submit = async() =>{
    await createUser(form.email, form.password);


  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
          <View className="w-full justify-center min-h-
          [85vh] px-4 my-6 ">
            <Image 
              source={images.logo}
              resizeMode='contain'
              className="w-[115px] h-[130px]"
              />
              <Text className="text-2xl text-white 
              text-semibold mt-10 font-psemibold">
                Login to Aora
              </Text>

              <FormField 
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({...form,
                email: e })}
                otherStyles="mt-7"
                keybordType="email-address"
              />

              <FormField 
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({...form,
                password: e })}
                otherStyles="mt-7"
                keybordType="email-address"
              />

              <CustomButton
                title="Sign In"
                handlePress={submit}
                containerStyle="mt-7"
                isLoading={isSubmitting}
                />

                <View className="justify-center pt-5 flex-row 
                gap-2">
                  <Text className="text-lg text-gray-100
                  font-pregular">
                    Don't have account?
                  </Text>
                  <Link href="/Sign-up"
                   className='text-lg font-psemibold 
                   text-secondary'>
                    Sign Up
                  </Link>
                </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;