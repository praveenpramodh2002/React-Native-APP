
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { mockUsers } from '@/data/mockUsers';
import { Match } from '@/types/User';
import { colors } from '@/styles/commonStyles';

export default function MatchesScreen() {
  console.log('Rendering MatchesScreen');

  // Create mock matches from users
  const matches: Match[] = mockUsers.slice(0, 6).map(user => ({
    id: user.id,
    user: user,
    matchedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    lastMessage: 'Hey there! 👋',
    unread: Math.random() > 0.5,
  }));

  const renderMatch = (match: Match) => {
    const timeAgo = Math.floor((Date.now() - match.matchedAt.getTime()) / (1000 * 60 * 60));
    
    return (
      <Pressable key={match.id} style={styles.matchCard}>
        <Image
          source={match.user.photos[0]}
          style={styles.matchImage}
        />
        <View style={styles.matchInfo}>
          <Text style={styles.matchName}>{match.user.name}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {match.lastMessage}
          </Text>
        </View>
        <Text style={styles.timeAgo}>
          {timeAgo < 1 ? 'now' : `${timeAgo}h`}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Matches</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Matches</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.newMatchesContainer}
          >
            {matches.slice(0, 3).map(match => (
              <Pressable key={match.id} style={styles.newMatchCard}>
                <Image
                  source={match.user.photos[0]}
                  style={styles.newMatchImage}
                />
                <Text style={styles.newMatchName}>{match.user.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Messages</Text>
          {matches.map(renderMatch)}
        </View>
      </ScrollView>
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
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  newMatchesContainer: {
    paddingLeft: 20,
  },
  newMatchCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  newMatchImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  newMatchName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.grey,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.grey,
  },
});
