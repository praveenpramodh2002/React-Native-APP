
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { mockUsers } from '@/data/mockUsers';
import { colors } from '@/styles/commonStyles';

const { width, height } = Dimensions.get('window');

export default function ProfileDetailScreen() {
  const { userId } = useLocalSearchParams();
  console.log('ProfileDetailScreen - userId:', userId);

  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    console.log('User not found');
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </SafeAreaView>
    );
  }

  console.log('Rendering ProfileDetailScreen for user:', user.name);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={user.photos[0]}
            style={styles.mainImage}
            resizeMode="cover"
          />
          
          <LinearGradient
            colors={['transparent', 'rgba(255, 105, 180, 0.3)', 'rgba(255, 20, 147, 0.6)']}
            style={styles.gradient}
          />
          
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={colors.card} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}, {user.age}</Text>
              {user.verified && (
                <IconSymbol
                  name="checkmark.seal.fill"
                  size={24}
                  color={colors.primary}
                  style={styles.verifiedIcon}
                />
              )}
            </View>
            <Text style={styles.distance}>{user.distance} miles away</Text>
            <Text style={styles.location}>{user.location}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bio}>{user.bio}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.interestsContainer}>
              {user.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.photosContainer}>
                {user.photos.slice(1).map((photo, index) => (
                  <Image
                    key={index}
                    source={photo}
                    style={styles.photo}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <Pressable style={styles.passButton}>
          <IconSymbol name="xmark" size={24} color={colors.error} />
        </Pressable>
        
        <Pressable style={styles.superLikeButton}>
          <IconSymbol name="star.fill" size={20} color={colors.accent} />
        </Pressable>
        
        <Pressable style={styles.likeButton}>
          <IconSymbol name="heart.fill" size={24} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.6,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 8,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  distance: {
    fontSize: 16,
    color: colors.grey,
    marginBottom: 4,
  },
  location: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  interestText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  photosContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  photo: {
    width: 120,
    height: 160,
    borderRadius: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 30,
  },
  passButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.error,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  superLikeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  likeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 50,
  },
});
