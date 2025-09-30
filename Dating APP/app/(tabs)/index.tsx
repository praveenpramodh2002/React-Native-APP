
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import ActionButtons from '@/components/ActionButtons';
import SwipeableCard from '@/components/SwipeableCard';
import { mockUsers } from '@/data/mockUsers';
import { User } from '@/types/User';
import { colors } from '@/styles/commonStyles';

const { width, height } = Dimensions.get('window');

export default function DiscoverScreen() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log('DiscoverScreen mounted, users count:', users.length);
    if (currentIndex >= users.length) {
      console.log('No more users to show');
    }
  }, [currentIndex, users.length]);

  const handleSwipeLeft = (user: User) => {
    console.log('Swiped left on:', user.name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentIndex(prev => prev + 1);
  };

  const handleSwipeRight = (user: User) => {
    console.log('Swiped right on:', user.name);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('It\'s a Match! 💕', `You liked ${user.name}!`);
    setCurrentIndex(prev => prev + 1);
  };

  const handleSuperLike = () => {
    if (currentIndex < users.length) {
      const user = users[currentIndex];
      console.log('Super liked:', user.name);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      Alert.alert('Super Like! ⭐', `You super liked ${user.name}!`);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleProfilePress = () => {
    if (currentIndex < users.length) {
      const user = users[currentIndex];
      console.log('Opening profile for:', user.name);
      router.push({
        pathname: '/profile-detail',
        params: { userId: user.id }
      });
    }
  };

  const renderCards = () => {
    if (currentIndex >= users.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreText}>No more profiles to show! 💕</Text>
          <Text style={styles.noMoreSubtext}>Check back later for new matches</Text>
        </View>
      );
    }

    return (
      <View style={styles.cardContainer}>
        {users.slice(currentIndex, currentIndex + 2).map((user, index) => (
          <SwipeableCard
            key={user.id}
            user={user}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onPress={handleProfilePress}
            isTop={index === 0}
          />
        ))}
      </View>
    );
  };

  console.log('Rendering DiscoverScreen, currentIndex:', currentIndex);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      <View style={styles.content}>
        {renderCards()}
      </View>

      <ActionButtons
        onPass={() => currentIndex < users.length && handleSwipeLeft(users[currentIndex])}
        onLike={() => currentIndex < users.length && handleSwipeRight(users[currentIndex])}
        onSuperLike={handleSuperLike}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: width,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCards: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noMoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  noMoreSubtext: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
  },
});
