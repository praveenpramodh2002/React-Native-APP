
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperLike: () => void;
}

export default function ActionButtons({ onPass, onLike, onSuperLike }: ActionButtonsProps) {
  console.log('Rendering ActionButtons');

  const handlePress = (action: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    action();
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, styles.passButton]}
        onPress={() => handlePress(onPass)}
      >
        <IconSymbol name="xmark" size={24} color={colors.error} />
      </Pressable>

      <Pressable
        style={[styles.button, styles.superLikeButton]}
        onPress={() => handlePress(onSuperLike)}
      >
        <IconSymbol name="star.fill" size={20} color={colors.accent} />
      </Pressable>

      <Pressable
        style={[styles.button, styles.likeButton]}
        onPress={() => handlePress(onLike)}
      >
        <IconSymbol name="heart.fill" size={24} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    gap: 30,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  passButton: {
    borderWidth: 2,
    borderColor: colors.error,
  },
  superLikeButton: {
    borderWidth: 2,
    borderColor: colors.accent,
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  likeButton: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
