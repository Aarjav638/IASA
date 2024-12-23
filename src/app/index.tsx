import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui';

const index = () => {
  const Authorize = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

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

export default index;
