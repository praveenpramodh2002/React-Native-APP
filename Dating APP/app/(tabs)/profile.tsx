
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
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function ProfileScreen() {
  console.log('Rendering ProfileScreen');

  const currentUser = {
    name: 'You',
    age: 25,
    occupation: 'Software Developer',
    bio: 'Love hiking, coffee, and good conversations. Looking for someone to share adventures with! 🌟',
    interests: ['Hiking', 'Coffee', 'Photography', 'Travel', 'Music', 'Cooking'],
    photos: [
      require('@/assets/images/265ec45e-d2a4-471a-bc1c-5cdecd04b474.jpeg'),
      require('@/assets/images/f767c611-a290-422a-aeef-18c5fd55e0e0.jpeg'),
      require('@/assets/images/373afa71-0c01-4c97-88a4-c3ea066898dc.jpeg'),
    ],
    verified: true,
  };

  const renderPhoto = (photo: any, index: number) => (
    <View key={index} style={styles.photoContainer}>
      <Image source={photo} style={styles.photo} />
      {index === 0 && (
        <Pressable style={styles.editPhotoButton}>
          <IconSymbol name="pencil" size={16} color={colors.card} />
        </Pressable>
      )}
    </View>
  );

  const renderInterest = (interest: string, index: number) => (
    <View key={index} style={styles.interestTag}>
      <Text style={styles.interestText}>{interest}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.brandingSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/799165b2-9bfc-460e-932d-9e014e7ca045.png')}
              style={styles.brandLogo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.photosSection}>
          <View style={styles.photosGrid}>
            {currentUser.photos.map(renderPhoto)}
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{currentUser.name}, {currentUser.age}</Text>
            {currentUser.verified && (
              <IconSymbol
                name="checkmark.seal.fill"
                size={24}
                color={colors.primary}
                style={styles.verifiedIcon}
              />
            )}
          </View>
          
          <Text style={styles.occupation}>{currentUser.occupation}</Text>
          
          <View style={styles.bioSection}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bio}>{currentUser.bio}</Text>
          </View>

          <View style={styles.interestsSection}>
            <Text style={styles.sectionTitle}>My Interests</Text>
            <View style={styles.interestsContainer}>
              {currentUser.interests.map(renderInterest)}
            </View>
          </View>

          <View style={styles.actionsSection}>
            <Pressable style={styles.actionButton}>
              <IconSymbol name="pencil" size={20} color={colors.primary} />
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </Pressable>
            
            <Pressable style={styles.actionButton}>
              <IconSymbol name="gearshape" size={20} color={colors.primary} />
              <Text style={styles.actionButtonText}>Settings</Text>
            </Pressable>
          </View>
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
  content: {
    flex: 1,
  },
  brandingSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 16,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  brandLogo: {
    width: 100,
    height: 80,
  },
  photosSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  photosGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  photoContainer: {
    flex: 1,
    aspectRatio: 0.75,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    paddingHorizontal: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 8,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  occupation: {
    fontSize: 18,
    color: colors.grey,
    marginBottom: 24,
  },
  bioSection: {
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
  interestsSection: {
    marginBottom: 32,
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
  actionsSection: {
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
});
