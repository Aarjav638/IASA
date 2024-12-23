import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, type SignInResponse } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui';

const Index = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "118435155990-a864k9kmeh42hi0keqcln9jjrcgcnl9k.apps.googleusercontent.com",   
    });
  }, []);


  const Authorize = async () => {
    try {
      console.log('Authorise')
      const data = await getData("IASA");
      if(data){
        console.log("localdata",data)
      }else{
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo.data?.user.name);
      if(userInfo && userInfo.data && userInfo.data.user.name){
      await saveData(userInfo.data?.user.name,userInfo);
      }
    }
    } catch (error) {
      console.log(error);
    }
  };

  const saveData =  async (key:string,data:SignInResponse)=>{
    try {
      await AsyncStorage.setItem(key,JSON.stringify(data))
    
    } catch (error) {
      console.error(error)
    }
  }

  
  const getData =  async (key:string)=>{
    try {
      const response = await AsyncStorage.getItem(key)
      if(response){
      const value = await JSON.parse(response)
    return value
    }
  } catch (error) {
      console.error(error)
    }
  }


  return (
    <View className="flex size-full items-center justify-center bg-slate-950 ">
      <Button
        label="Authorize"
        size="lg"
        textClassName="text-secondary-200"
        variant="secondary"
        onPress={Authorize}
      />
    </View>
  );
};

export default Index;