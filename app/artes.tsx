import { simularTatuagemIA } from '@/services/simulacao.service';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ArtesScreen() {
  const router = useRouter();

  
  const [imagemOriginal, setImagemOriginal] = useState<string | null>(null);
  const [promptText, setPromptText] = useState<string>(
    'photorealistic black ink tattoo applied on human skin, high quality'
  );
  const [imagemSimulada, setImagemSimulada] = useState<string | null>(null);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  
  const processarImagemWeb = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          // Redimensiona mantendo a proporção (máximo 768px, ideal para o ControlNet)
          const MAX_SIZE = 768;
          let width = img.width;
          let height = img.height;

          if (width > height && width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Erro ao processar a imagem.'));
      };
      reader.onerror = () => reject(new Error('Erro ao ler o arquivo.'));
    });
  };

  
  const handleSelecionarFoto = () => {
    setMensagemErro(null);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event: any) => {
      const file = event.target?.files?.[0];
      if (!file) return;

      try {
        const base64Otimizado = await processarImagemWeb(file);
        setImagemOriginal(base64Otimizado);
        setImagemSimulada(null); 
      } catch (err) {
        setMensagemErro('Não foi possível carregar a imagem selecionada.');
      }
    };

    input.click();
  };

 
  const handleSimular = async () => {
    if (!imagemOriginal) {
      setMensagemErro('Por favor, selecione uma foto do corpo ou rascunho primeiro.');
      return;
    }

    try {
      setCarregando(true);
      setMensagemErro(null);

      const resposta = await simularTatuagemIA(imagemOriginal, promptText);

      if (resposta.sucesso && resposta.imagemSimulada) {
        setImagemSimulada(resposta.imagemSimulada);
      } else {
        setMensagemErro(resposta.erro || 'A IA não conseguiu gerar a simulação.');
      }
    } catch (error: any) {
      console.error('Erro ao conectar com o backend:', error);
      const msgServidor = error?.response?.data?.erro;
      setMensagemErro(
        msgServidor ||
          'Erro ao conectar com o servidor. Verifique se o seu Backend está rodando na porta 3000.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Inteligência Artificial • ControlNet</Text>
        <Text style={styles.title}>Simulador de Tatuagem</Text>
        <Text style={styles.description}>
          Envie uma foto da região do corpo ou do desenho base (rascunho) e descreva o estilo desejado para simular o resultado com IA.
        </Text>

        {/* PASSO A: ESCOLHER IMAGEM */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleSelecionarFoto}>
          <Text style={styles.uploadButtonText}>
            {imagemOriginal ? 'Trocar Imagem Base' : '1. Selecionar Foto / Rascunho'}
          </Text>
        </TouchableOpacity>

        {/* PASSO B: DESCREVER O PROMPT */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            2. Descrição da Tatuagem (em inglês gera melhores resultados):
          </Text>
          <TextInput
            style={styles.input}
            value={promptText}
            onChangeText={setPromptText}
            placeholder="Ex: blackwork floral tattoo on human skin"
            placeholderTextColor="#666"
          />
        </View>

        {/* AVISO DE ERRO (SE HOUVER) */}
        {mensagemErro && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{mensagemErro}</Text>
          </View>
        )}

        {/* BOTÃO DE DISPARAR A IA */}
        <TouchableOpacity
          style={[styles.button, (!imagemOriginal || carregando) && styles.buttonDisabled]}
          onPress={handleSimular}
          disabled={!imagemOriginal || carregando}
        >
          {carregando ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#FFF" />
              <Text style={styles.buttonText}>
                Processando no Hugging Face (pode levar 20s)...
              </Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>3. Gerar Simulação com IA</Text>
          )}
        </TouchableOpacity>

        {/* ÁREA DE PREVIEW E RESULTADO */}
        {(imagemOriginal || imagemSimulada) && (
          <View style={styles.resultsGrid}>
            {imagemOriginal && (
              <View style={styles.imageBox}>
                <Text style={styles.imageTitle}>Imagem Enviada:</Text>
                <Image
                  source={{ uri: imagemOriginal }}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              </View>
            )}

            {imagemSimulada && (
              <View style={styles.imageBox}>
                <Text style={styles.imageTitle}>Resultado da IA:</Text>
                <Image
                  source={{ uri: imagemSimulada }}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
          <Text style={styles.backButtonText}>Voltar para a loja</Text>
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
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 850,
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
    marginBottom: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: '#D4D4D8',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#231F2A',
    borderWidth: 1,
    borderColor: '#A855F7',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#D4D4D8',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#3F3F46',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFF',
    fontSize: 15,
  },
  errorBox: {
    backgroundColor: '#2A1010',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#A855F7',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 24,
  },
  imageBox: {
    flex: 1,
    minWidth: 280,
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    alignItems: 'center',
  },
  imageTitle: {
    color: '#A855F7',
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 15,
  },
  previewImage: {
    width: '100%',
    height: 320,
    borderRadius: 12,
  },
  backButton: {
    borderWidth: 1,
    borderColor: '#3F3F46',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#A1A1AA',
    fontWeight: '600',
    fontSize: 15,
  },
});