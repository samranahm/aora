import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images} from '../../constants';
import { Link } from 'expo-router';
import { createUser } from '../../lib/appwrite';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignUp = () => {
  const [form, setForm] = useState({
    username:'',
    email:'',
    password:''
  })
  const [isSubmitting, setIsSubmitting]=useState(false)

  const submit = async () =>{
    await createUser(form.email, form.password, form.username);
    setIsSubmitting(true);
    };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
          <View className="w-full justify-center min-h-
          [85vh] px-4 my-6 ">
            <Image 
              source={images.logo}
              resizeMode='contain'
              className="w-[115px] h-[80px]"
              />
              <Text className="text-2xl mt-2 text-white 
              text-semibold font-psemibold">
                Sign up to Aora
              </Text>
              
              <FormField 
                title="Username"
                value={form.username}
                handleChangeText={(e) => setForm({...form,
                username: e })}
                otherStyles="mt-10"
              />

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
                keyboardType="default"
              />

              <CustomButton
                title="Sign Up"
                handlePress={submit}
                containerStyle="mt-7"
                isLoading={isSubmitting}
                />

                <View className="justify-center pt-5 flex-row 
                gap-1">
                  <Text className="text-lg text-gray-100
                  font-pregular">
                    Already have an account?
                  </Text>
                  <Link href="/Sign-in"
                   className='text-lg font-psemibold 
                   text-secondary'>
                    Sign In
                  </Link>
                </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp;