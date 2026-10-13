import React from 'react';
import { Tabs } from 'expo-router';

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#0A0A0A',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          color: '#FFF',
          fontWeight: '700',
        },
        headerBackTitleVisible: true,
        headerBackVisible: true,
        tabBarStyle: {
          backgroundColor: '#0C0C0F',
          borderTopWidth: 1,
          borderTopColor: '#2A2A2E',
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#8C8C8F',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarItemStyle: {
          borderRadius: 12,
          marginHorizontal: 8,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Aprovações',
          tabBarLabel: 'Aprovações',
        }}
      />

      <Tabs.Screen
        name="agenda"
        options={{
          title: 'Agenda',
          tabBarLabel: 'Agenda',
        }}
      />
    </Tabs>
  );
}
