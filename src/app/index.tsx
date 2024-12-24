import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator,Text, View } from 'react-native';

import { colors } from '@/components/ui';
import { useHandleFallback } from '@/lib';
const Home = () => {
  const { authFailed, handleAuthentication, loading } = useHandleFallback();

  useEffect(() => {
    handleAuthentication();
  }, [handleAuthentication]);

  if (!loading && !authFailed) {
    return <Redirect href="/(app)" />;
  }

  return (
    <View className="flex size-full items-center justify-center bg-slate-950">
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary[600]} />
      ) : (
        <Text className="text-white">Authentication Failed</Text>
      )}
    </View>
  );
};

export default Home;
