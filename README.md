# SystemDrawn Frontend

Aplicativo mobile do projeto **SystemDrawn**, desenvolvido em **React Native + Expo**, responsável pela interface do usuário e integração com a API Backend para gerenciamento de agendamentos de **tatuagem** e **piercing**.

## Integrantes da Equipe

| Nome | RA |
|------|----|
| Alyson Rafael Reis Arruda de Lima | 00000853753 | **
| Helleson Allan Borges de Sant'Ana | 00000855659 | **
| João Victor Oliveira da Silva | 00000855670 |
| Matheus Soares de Lima | 00000855273 |
| Saíra Aguiar Rocha | 00000851069 |
| Thiago Carvalho de Castro | 00000014830 |
| Wilson Pereira de Lima | 00000855225 | **

> **Observação:** Alyson, Helleson e Wilson não partipam da disciplina de AOS, mas contribuiram com o projeto.
---

# Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- Axios
- Zustand
- React Native Paper
- Expo Splash Screen
- Expo Vector Icons
- EAS (Expo Application Services)

---

# Funcionalidades Implementadas

## Autenticação

- Cadastro de usuário
- Login com CPF
- Persistência da sessão
- Logout

## Agendamento de Tatuagem

- Escolha do estilo
- Escolha do local
- Escolha da data
- Escolha do horário
- Confirmação do agendamento

## Agendamento de Piercing

- Escolha do tipo de piercing
- Escolha da joia
- Escolha da data
- Escolha do horário
- Confirmação do agendamento

## Meus Agendamentos

- Listagem dos agendamentos
- Reagendamento
- Cancelamento de agendamentos

## Notificações

- Listagem de notificações
- Marcar notificação como lida
- Marcar todas como lidas
- Remover notificações
- Contador de notificações

## Perfil

- Visualização dos dados do usuário
- Configurações da conta

---

# Estrutura do Projeto

```text
SYSTEMDRAWN-FRONTEND
├── app
│   ├── (tabs)
│   ├── agendamento-piercing
│   ├── agendamento-tatuagem
│   ├── _layout.tsx
│   ├── cadastro.tsx
│   ├── configuracoes.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── meus-agendamentos.tsx
│   ├── notificacoes.tsx
│   ├── novo-agendamento.tsx
│   ├── perfil.tsx
│   └── splash.tsx
├── assets
│   ├── fonts
│   └── images
├── components
├── constants
├── hooks
├── providers
├── services
│   ├── api.ts
│   ├── auth.service.ts
│   ├── notificacao.service.ts
│   └── piercing.service.ts
├── store
├── .gitignore
├── app.json
├── eas.json
├── eslint.config.js
├── expo-env.d.ts
├── package-lock.json
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md
```

---

# Execução Local

## Instalar dependências

```bash
npm install
```

## Configurar a URL da API

No arquivo:

```text
services/api.ts
```

Configure a URL da API para o endereço IP da máquina onde o backend está sendo executado.

Exemplo:

```ts
baseURL: 'http://192.168.0.10:3000'
```

> **Importante:** o computador e o celular devem estar conectados à mesma rede Wi-Fi.

---

## Executar o projeto

```bash
npx expo start
```

ou

```bash
npm start
```

---

# Execução no Celular

Instale o aplicativo **Expo Go**.

### Android

Disponível na Play Store.

### iOS

Disponível na App Store.

Após iniciar o projeto, basta escanear o QR Code exibido pelo Expo.

---

# Organização Expo

O projeto está vinculado à organização:

```text
@systemdrawn/SystemDrawn-frontend
```

Todos os integrantes devem possuir conta no Expo e realizar login utilizando:

```bash
eas login
```

> O projeto já está configurado. Não é necessário executar:

```bash
eas project:init
```

---

# Atualizações OTA

Para publicar atualizações do aplicativo sem necessidade de reinstalação:

```bash
eas update --auto
```

---

# Testes

Os testes do aplicativo foram realizados utilizando **Expo Go** em dispositivos físicos, contemplando:

- Autenticação
- Cadastro de usuários
- Agendamento de tatuagem
- Agendamento de piercing
- Reagendamento
- Cancelamento de agendamentos
- Notificações
- Perfil do usuário
- Navegação entre telas
- Integração com a API Backend

---

# Status do Projeto

🚧 Em desenvolvimento.

---

# Licença

ISC