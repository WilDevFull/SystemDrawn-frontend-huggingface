import React, {
  useEffect,
  useState,
} from 'react';

import {
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {
  withLayoutContext,
  useRouter,
} from 'expo-router';

import {
  IconButton,
} from 'react-native-paper';

import {
  useAuthStore,
} from '@/store/authstore';

import {
  contarNotificacoesNaoLidas,
} from '@/services/notificacao.service';

const { Navigator } =
  createMaterialTopTabNavigator();

const MaterialTopTabs =
  withLayoutContext(
    Navigator
  );

function MyCustomTabBar({
  state,
  descriptors,
  navigation,
}: any) {

  const router =
    useRouter();

  /**
   * Usuário logado
   */
  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  /**
   * Token
   */
  const token =
    useAuthStore(
      (state) =>
        state.token
    );

  /**
   * Contador badge
   */
  const [
    totalNotificacoes,
    setTotalNotificacoes,
  ] = useState(0);

  /**
   * Primeiro nome
   */
  const primeiroNome =
    user?.nomeCompleto
      ?.split(' ')[0]
      || 'Usuário';

  /**
   * Carregar contador
   */
  async function
  carregarContador() {

    try {

      if (!token)
        return;

      const total =
        await contarNotificacoesNaoLidas(
          token
        );

      setTotalNotificacoes(
        total
      );

    } catch (
      error
    ) {

      console.log(
        error
      );
    }
  }

  useEffect(() => {
    carregarContador();
  }, []);

  return (

    <View
      style={
        styles.tabBarContainer
      }
    >

      {/* HEADER */}
      <View
        style={
          styles.headerRow
        }
      >

        <Text
          style={
            styles.greeting
          }
        >
          Olá,
          {' '}
          {primeiroNome}
        </Text>

        <View
          style={
            styles.headerButtons
          }
        >

          {/* NOTIFICAÇÕES */}
          <TouchableOpacity
            style={
              styles.notificationButton
            }
            onPress={() =>
              router.push(
                '/notificacoes'
              )
            }
          >

            <IconButton
              icon="bell-outline"
              iconColor="#FFF"
              size={24}
              style={{
                margin: 0,
              }}
            />

            {totalNotificacoes >
              0 && (

              <View
                style={
                  styles.badge
                }
              >

                <Text
                  style={
                    styles.badgeText
                  }
                >
                  {
                    totalNotificacoes
                  }
                </Text>

              </View>
            )}

          </TouchableOpacity>

          {/* PERFIL */}
          <TouchableOpacity
            style={
              styles.adminHeaderButton
            }
            onPress={() =>
              router.push(
                '/admin-login'
              )
            }
          >

            <Text
              style={
                styles.adminHeaderButtonText
              }
            >
              Admin
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.profileButton
            }
            onPress={() =>
              router.push(
                '/perfil'
              )
            }
          >

            <IconButton
              icon="account-outline"
              iconColor="#FFF"
              size={28}
              style={
                styles.profileIcon
              }
            />

          </TouchableOpacity>

        </View>

      </View>

      {/* TÍTULO */}
      <Text
        style={
          styles.mainTitle
        }
      >
        Escolha seu estilo
      </Text>

      {/* TABS */}
      <View
        style={
          styles.linksRow
        }
      >

        {state.routes.map(
          (
            route: any,
            index: number
          ) => {

            const {
              options,
            } =
              descriptors[
                route.key
              ];

            const allowed = [
              'index',
              'piercings',
              'joias',
              'artes',
              'historico',
            ];

            if (
              !allowed.includes(
                route.name
              )
            )
              return null;

            const label =
              options.title !==
              undefined
                ? options.title
                : route.name;

            const isFocused =
              state.index ===
              index;

            return (

              <React.Fragment
                key={
                  route.key
                }
              >

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      route.name
                    )
                  }
                  style={[
                    styles.tabItem,

                    isFocused &&
                    styles.tabItemActive,
                  ]}
                  activeOpacity={
                    0.7
                  }
                >

                  <Text
                    style={[
                      styles.tabText,

                      isFocused
                        ? styles.tabTextActive
                        : styles.tabTextInactive,
                    ]}
                  >
                    {label}
                  </Text>

                </TouchableOpacity>

                {index <
                  4 && (
                  <Text
                    style={
                      styles.divider
                    }
                  >
                    |
                  </Text>
                )}

              </React.Fragment>
            );
          }
        )}

      </View>

    </View>
  );
}

export default function
TabLayout() {

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          '#0A0A0A',
      }}
    >

      <StatusBar
        barStyle="light-content"
      />

      <MaterialTopTabs
        tabBar={(
          props
        ) => (
          <MyCustomTabBar
            {...props}
          />
        )}
        screenOptions={{
          swipeEnabled:
            true,
          headerShown: true,
        }}
      >

        <MaterialTopTabs.Screen
          name="index"
          options={{
            title:
              'Tatuagens',
          }}
        />

        <MaterialTopTabs.Screen
          name="piercings"
          options={{
            title:
              'Piercings',
          }}
        />

        <MaterialTopTabs.Screen
          name="joias"
          options={{
            title:
              'Joias',
          }}
        />

        <MaterialTopTabs.Screen
          name="artes"
          options={{
            title:
              'Artes',
          }}
        />

        <MaterialTopTabs.Screen
          name="historico"
          options={{
            title:
              'Histórico',
          }}
        />

      </MaterialTopTabs>

    </SafeAreaView>
  );
}

const styles =
StyleSheet.create({

tabBarContainer: {
backgroundColor:
'#0A0A0A',
paddingHorizontal:
20,
paddingTop: 10,
paddingBottom: 5,
},

headerRow: {
flexDirection:
'row',
justifyContent:
'space-between',
alignItems:
'center',
marginBottom:
20,
},

greeting: {
color: '#FFF',
fontSize: 26,
fontWeight:
'300',
letterSpacing:
0.5,
},

headerButtons: {
flexDirection:
'row',
alignItems:
'center',
gap: 12,
},

notificationButton: {
width: 48,
height: 48,
borderRadius:
24,
borderWidth:
1.5,
borderColor:
'#444',
justifyContent:
'center',
alignItems:
'center',
backgroundColor:
'#1A1A1A',
position:
'relative',
},

badge: {
position:
'absolute',
top: 4,
right: 4,
backgroundColor:
'#EF4444',
minWidth: 18,
height: 18,
borderRadius:
9,
justifyContent:
'center',
alignItems:
'center',
paddingHorizontal:
4,
},

badgeText: {
color: '#FFF',
fontSize: 10,
fontWeight:
'bold',
},

adminHeaderButton: {
paddingHorizontal:
12,
paddingVertical:
8,
borderRadius:
10,
backgroundColor:
'#1F1F22',
borderWidth:
1,
borderColor:
'#333',
marginRight:
10,
},

adminHeaderButtonText: {
color: '#DDD',
fontSize: 12,
fontWeight:
'700',
},

profileButton: {
width: 48,
height: 48,
borderRadius:
24,
borderWidth:
1.5,
borderColor:
'#444',
justifyContent:
'center',
alignItems:
'center',
backgroundColor:
'#1A1A1A',
},

profileIcon: {
margin: 0,
},

mainTitle: {
color: '#FFF',
fontSize: 34,
fontWeight:
'bold',
marginBottom:
25,
},

linksRow: {
flexDirection:
'row',
alignItems:
'center',
marginBottom:
10,
flexWrap:
'wrap',
},

tabItem: {
paddingVertical:
8,
paddingHorizontal:
14,
borderRadius:
15,
},

tabItemActive: {
backgroundColor:
'#1A1A1B',
},

tabText: {
fontSize: 18,
},

tabTextActive: {
color: '#FFF',
fontWeight:
'500',
},

tabTextInactive: {
color: '#888',
},

divider: {
color: '#333',
marginHorizontal:
4,
fontSize: 20,
fontWeight:
'200',
},
});
