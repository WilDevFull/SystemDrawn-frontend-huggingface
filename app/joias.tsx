import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function JoiasScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Coleções</Text>
        <Text style={styles.title}>Joias e acessórios</Text>
        <Text style={styles.description}>
          Veja peças premium para complementar o seu estilo e o seu agendamento.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
          <Text style={styles.buttonText}>Voltar para a loja</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#18181B',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  eyebrow: {
    color: '#A855F7',
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
  },
  description: {
    color: '#D4D4D8',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 22,
  },
  button: {
    backgroundColor: '#A855F7',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
