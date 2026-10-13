import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, IconButton } from 'react-native-paper';

export default function TatuagensScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* INTRO */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeTitle}>
            Transforme sua ideia em arte
          </Text>

          <Text style={styles.welcomeText}>
            Agende sua próxima tatuagem de forma rápida,
            segura e com profissionais especializados.
          </Text>
        </View>

        {/* HERO CARD */}
        <Card style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <IconButton
              icon="palette-outline"
              iconColor="#FFF"
              size={40}
            />
          </View>

          <Text style={styles.heroTitle}>
            Sua próxima tatuagem começa aqui
          </Text>

          <Text style={styles.heroDescription}>
            Escolha o melhor horário, personalize seu
            atendimento e acompanhe seus agendamentos
            diretamente pelo aplicativo.
          </Text>

          <View style={styles.heroBenefits}>
            <View style={styles.benefitRow}>
              <IconButton
                icon="check-circle"
                size={18}
                iconColor="#A855F7"
                style={{ margin: 0 }}
              />
              <Text style={styles.benefitText}>
                Atendimento personalizado
              </Text>
            </View>

            <View style={styles.benefitRow}>
              <IconButton
                icon="check-circle"
                size={18}
                iconColor="#A855F7"
                style={{ margin: 0 }}
              />
              <Text style={styles.benefitText}>
                Ambiente esterilizado
              </Text>
            </View>

            <View style={styles.benefitRow}>
              <IconButton
                icon="check-circle"
                size={18}
                iconColor="#A855F7"
                style={{ margin: 0 }}
              />
              <Text style={styles.benefitText}>
                Profissionais experientes
              </Text>
            </View>
          </View>
        </Card>

        {/* CARDS */}
        <View style={styles.cardsRow}>
          <Card style={styles.smallCard}>
            <IconButton
              icon="calendar-clock"
              iconColor="#A855F7"
              size={32}
            />

            <Text style={styles.smallTitle}>
              Agendamento rápido
            </Text>

            <Text style={styles.smallDescription}>
              Reserve seu horário em poucos passos.
            </Text>
          </Card>

          <Card style={styles.smallCard}>
            <IconButton
              icon="shield-check-outline"
              iconColor="#A855F7"
              size={32}
            />

            <Text style={styles.smallTitle}>
              Segurança
            </Text>

            <Text style={styles.smallDescription}>
              Equipamentos esterilizados e atendimento seguro.
            </Text>
          </Card>
        </View>

        {/* CARD INFO */}
        <Card style={styles.card}>
          <View style={styles.cardInfo}>
            <View style={styles.iconTag}>
              <IconButton
                icon="calendar-check-outline"
                iconColor="#000"
                size={32}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.cardTitle}>
                Pronto para começar?
              </Text>

              <Text style={styles.cardSub}>
                Agende sua tatuagem e acompanhe
                todas as etapas pelo aplicativo.
              </Text>

              <Text style={styles.cardDetail}>
                Simples, rápido e seguro.
              </Text>
            </View>
          </View>
        </Card>

        {/* BOTÃO AGENDAR */}
        <TouchableOpacity
          style={styles.btnPrimary}
          activeOpacity={0.8}
          onPress={() =>
            router.push('/agendamento-tatuagem/local')
          }
        >
          <Text style={styles.btnText}>
            Realizar agendamento
          </Text>
        </TouchableOpacity>

        {/* BOTÃO AGENDAMENTOS */}
        <TouchableOpacity
          style={styles.btnSecondary}
          activeOpacity={0.8}
          onPress={() =>
            router.push('/meus-agendamentos')
          }
        >
          <Text style={styles.btnText}>
            Ver meus agendamentos
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },

  welcomeBox: {
    marginBottom: 24,
  },

  welcomeTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  welcomeText: {
    color: '#9E9E9E',
    fontSize: 16,
    lineHeight: 24,
  },

  heroCard: {
    backgroundColor: '#18181B',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    marginBottom: 22,
    elevation: 0,
  },

  heroIcon: {
    alignSelf: 'center',
    backgroundColor: '#A855F7',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  heroTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  heroDescription: {
    color: '#B5B5B5',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 22,
  },

  heroBenefits: {
    marginTop: 10,
  },

  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  benefitText: {
    color: '#FFF',
    fontSize: 15,
    marginLeft: 4,
  },

  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  smallCard: {
    width: '48%',
    backgroundColor: '#18181B',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    elevation: 0,
  },

  smallTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },

  smallDescription: {
    color: '#A5A5A5',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#333',
    elevation: 0,
    marginBottom: 25,
  },

  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconTag: {
    backgroundColor: '#FFF',
    borderRadius: 16,
  },

  cardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  cardSub: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },

  cardDetail: {
    color: '#888',
    fontSize: 12,
    marginTop: 6,
  },

  btnPrimary: {
    backgroundColor: '#A855F7',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  btnSecondary: {
    backgroundColor: '#1C1C1E',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 40,
  },

  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});