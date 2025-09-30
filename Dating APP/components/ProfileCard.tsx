
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from './IconSymbol';
import { User } from '../types/User';
import { colors } from '@/styles/commonStyles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.7;

interface ProfileCardProps {
  user: User;
  onPress?: () => void;
}

export default function ProfileCard({ user, onPress }: ProfileCardProps) {
  console.log('Rendering ProfileCard for user:', user.name);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={user.photos[0]}
        style={styles.image}
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(255, 105, 180, 0.8)', 'rgba(255, 20, 147, 0.9)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}, {user.age}</Text>
              {user.verified && (
                <IconSymbol
                  name="checkmark.seal.fill"
                  size={20}
                  color={colors.card}
                  style={styles.verifiedIcon}
                />
              )}
            </View>
            <Text style={styles.distance}>{user.distance} miles away</Text>
          </View>
          
          <Text style={styles.bio} numberOfLines={3}>
            {user.bio}
          </Text>
          
          <View style={styles.interests}>
            {user.interests.slice(0, 3).map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.card,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.card,
    marginRight: 8,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  distance: {
    fontSize: 16,
    color: colors.card,
    opacity: 0.9,
  },
  bio: {
    fontSize: 16,
    color: colors.card,
    lineHeight: 22,
    marginBottom: 16,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  interestText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '500',
  },
});
