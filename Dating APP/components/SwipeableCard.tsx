
import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import ProfileCard from './ProfileCard';
import { User } from '../types/User';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.3;

interface SwipeableCardProps {
  user: User;
  onSwipeLeft: (user: User) => void;
  onSwipeRight: (user: User) => void;
  onPress?: () => void;
  isTop?: boolean;
}

export default function SwipeableCard({
  user,
  onSwipeLeft,
  onSwipeRight,
  onPress,
  isTop = false,
}: SwipeableCardProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

  console.log('Rendering SwipeableCard for user:', user.name, 'isTop:', isTop);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => isTop,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
    },
    onPanResponderMove: (_, gestureState) => {
      if (!isTop) return;
      
      pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      rotate.setValue(gestureState.dx * 0.1);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (!isTop) return;
      
      pan.flattenOffset();
      
      if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
        const direction = gestureState.dx > 0 ? 1 : -1;
        
        Animated.parallel([
          Animated.timing(pan, {
            toValue: { x: direction * screenWidth * 1.5, y: gestureState.dy },
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(rotate, {
            toValue: direction * 30,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(() => {
          if (direction > 0) {
            onSwipeRight(user);
          } else {
            onSwipeLeft(user);
          }
        });
      } else {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }),
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: false,
          }),
        ]).start();
      }
    },
  });

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-30, 0, 30],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const animatedStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      { rotate: rotateInterpolate },
    ],
  };

  return (
    <Animated.View
      style={[styles.container, animatedStyle, !isTop && styles.behindCard]}
      {...(isTop ? panResponder.panHandlers : {})}
    >
      <ProfileCard user={user} onPress={onPress} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  behindCard: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
});
