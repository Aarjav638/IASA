import { useCallback, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';

import { useBiometricAuthentication } from './use-biometric-authentication';
export const useHandleFallback = () => {
  const { checkBiometricAvailability, authenticateWithBiometrics } =
    useBiometricAuthentication();
  const [loading, setLoading] = useState(true);
  const [authFailed, setAuthFailed] = useState(false);
  const handleFallbackToAppPasscode = useCallback(() => {
    Alert.alert(
      'Authentication Required',
      'Biometrics are unavailable or failed. Please use your app passcode.',
      [
        {
          text: 'Enter Passcode',
          onPress: () => {
            setAuthFailed(false);
            setLoading(false);
          },
        },
        {
          text: 'Cancel',
          onPress: () => setAuthFailed(true),
          style: 'cancel',
        },
      ],
    );
  }, []);
  const handleAuthentication = useCallback(async () => {
    const biometricsAvailable = await checkBiometricAvailability();
    if (biometricsAvailable) {
      const success = await authenticateWithBiometrics();
      if (success) {
        setLoading(false);
      } else {
        handleFallbackToAppPasscode();
      }
    } else {
      Alert.alert(
        'Biometrics Not Available',
        'Biometrics are unavailable. Please enable them in settings or use your app passcode.',
        [
          {
            text: 'Settings',
            onPress: () =>
              Platform.OS === 'ios'
                ? Linking.openURL('app-settings:')
                : AndroidOpenSettings.generalSettings(),
          },
          {
            text: 'Use Passcode',
            onPress: handleFallbackToAppPasscode,
          },
          {
            text: 'Cancel',
            onPress: () => setAuthFailed(true),
            style: 'cancel',
          },
        ],
      );
    }
  }, [
    checkBiometricAvailability,
    authenticateWithBiometrics,
    handleFallbackToAppPasscode,
  ]);
  return { handleAuthentication, loading, authFailed };
};
