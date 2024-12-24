import * as localAuth from 'expo-local-authentication';
import { useCallback } from 'react';

export const useBiometricAuthentication = () => {
  const checkBiometricAvailability = useCallback(async () => {
    try {
      const hasHardware = await localAuth.hasHardwareAsync();
      const isEnrolled = await localAuth.isEnrolledAsync();
      return hasHardware && isEnrolled;
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return false;
    }
  }, []);

  const authenticateWithBiometrics = useCallback(async () => {
    try {
      const result = await localAuth.authenticateAsync({
        promptMessage: 'Authenticate',
        fallbackLabel: 'Use App Passcode',
        cancelLabel: 'Cancel',
        biometricsSecurityLevel: 'strong',
        disableDeviceFallback: true,
      });

      if (result.success) {
        console.log('Biometric authentication successful');
        console.log(result);
        return true;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  }, []);

  return {
    checkBiometricAvailability,
    authenticateWithBiometrics,
  };
};
