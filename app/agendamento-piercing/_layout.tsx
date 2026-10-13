import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={({ navigation }) => ({
        /**
         * Mostra header
         */
        headerShown: true,

        /**
         * Fundo preto
         */
        headerStyle: {
          backgroundColor: '#000',
        },

        /**
         * Remove sombra/linha
         */
        headerShadowVisible: false,

        /**
         * Remove título padrão
         */
        headerTitle: '',

        /**
         * Cor padrão dos elementos
         */
        headerTintColor: '#FFF',

        /**
         * Botão voltar padrão
         */
        headerLeft: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
            style={{
              marginLeft: 8,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color="#FFF"
            />
          </TouchableOpacity>
        ),
      })}
    />
  );
}