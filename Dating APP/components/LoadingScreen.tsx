
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/commonStyles';

const { width, height } = Dimensions.get('window');

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const logoFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('LoadingScreen mounted');
    
    // Start animations
    Animated.sequence([
      Animated.timing(logoFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto complete loading after 3 seconds
    const timer = setTimeout(() => {
      console.log('Loading complete');
      onLoadingComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, pulseAnim, logoFadeAnim, onLoadingComplete]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.backgroundAlt, colors.secondary]}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoFadeAnim,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <Image
              source={require('@/assets/images/799165b2-9bfc-460e-932d-9e014e7ca045.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.Text
            style={[
              styles.title,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            Couple Romantica
          </Animated.Text>

          <Animated.Text
            style={[
              styles.subtitle,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            Find your perfect match
          </Animated.Text>

          <View style={styles.loadingIndicator}>
            <View style={styles.dotContainer}>
              {[0, 1, 2].map((index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      opacity: pulseAnim,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
    opacity: 0.8,
    marginBottom: 40,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
