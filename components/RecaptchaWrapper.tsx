import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Recaptcha from 'react-native-recaptcha-that-works';

interface RecaptchaWrapperProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export default function RecaptchaWrapper({ onVerify, onExpire }: RecaptchaWrapperProps) {
  const recaptchaRef = useRef<any>(null);

  const handleOpen = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.open();
    }
  };

  return (
    <View style={styles.container}>
      <Recaptcha
        ref={recaptchaRef}
        siteKey="TUA_SITE_KEY_AQUI"
        baseUrl="http://localhost"
        onVerify={onVerify}
        onExpire={onExpire}
        size="invisible"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
  },
});