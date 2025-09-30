
import React from 'react';
import { Tabs } from 'expo-router';
import { View, Image, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  console.log('Rendering TabLayout');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
          shadowColor: colors.primary,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitle: () => (
          <View style={styles.headerLogoContainer}>
            <Image
              source={require('@/assets/images/799165b2-9bfc-460e-932d-9e014e7ca045.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
        ),
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="message" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: 120,
    height: 40,
  },
});
