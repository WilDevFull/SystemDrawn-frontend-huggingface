import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// Puxando o componente que você criou com sucesso
import CardAgendamento from '../../components/CardAgendamento';

const agendamentosFake = [
  { id: '1', cliente: 'Thiago Castro', data: '02/06/2026', servico: 'Tatuagem Coreana', status: 'Concluído' },
  { id: '2', cliente: 'Roberto Silva', data: '05/06/2026', servico: 'Tatuagem Blackwork', status: 'Agendado' },
  { id: '3', cliente: 'Aline Souza', data: '10/06/2026', servico: 'Piercing Helix', status: 'Agendado' },
];

export default function HistoricoAgendamento() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Agendamentos Geral</Text>
      
      <FlatList
        data={agendamentosFake}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardAgendamento 
            cliente={item.cliente}
            servico={item.servico}
            data={item.data}
            status={item.status}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0A0A0A', // Fundo escuro combinando com o layout do grupo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
  },
});
