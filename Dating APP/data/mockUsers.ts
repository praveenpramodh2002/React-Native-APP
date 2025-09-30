
import { User } from '../types/User';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Isabella',
    age: 25,
    bio: 'Fashion enthusiast and coffee lover. Looking for someone who appreciates the finer things in life! ✨',
    photos: [
      require('../assets/images/265ec45e-d2a4-471a-bc1c-5cdecd04b474.jpeg'),
      require('../assets/images/f767c611-a290-422a-aeef-18c5fd55e0e0.jpeg'),
    ],
    interests: ['Fashion', 'Coffee', 'Photography', 'Travel'],
    location: 'San Francisco',
    distance: 2,
    verified: true,
  },
  {
    id: '2',
    name: 'Sophia',
    age: 28,
    bio: 'Outdoor enthusiast and brunch lover. Always up for trying new cafes and exploring the city! ☕🌸',
    photos: [
      require('../assets/images/f767c611-a290-422a-aeef-18c5fd55e0e0.jpeg'),
      require('../assets/images/373afa71-0c01-4c97-88a4-c3ea066898dc.jpeg'),
    ],
    interests: ['Brunch', 'Outdoor Activities', 'Food', 'Art'],
    location: 'San Francisco',
    distance: 5,
    verified: true,
  },
  {
    id: '3',
    name: 'Valentina',
    age: 24,
    bio: 'Floral dress enthusiast and nature lover. Seeking genuine connections and beautiful moments 🌺✨',
    photos: [
      require('../assets/images/373afa71-0c01-4c97-88a4-c3ea066898dc.jpeg'),
      require('../assets/images/b6f72537-88f1-49c8-a543-d7673aa07ded.jpeg'),
    ],
    interests: ['Fashion', 'Nature', 'Photography', 'Flowers'],
    location: 'San Francisco',
    distance: 3,
    verified: false,
  },
  {
    id: '4',
    name: 'Camila',
    age: 27,
    bio: 'Cozy cafe vibes and warm conversations. Love good coffee and even better company! ☕💕',
    photos: [
      require('../assets/images/b6f72537-88f1-49c8-a543-d7673aa07ded.jpeg'),
      require('../assets/images/6775137f-9756-4379-86f9-faeb40bbaa49.jpeg'),
    ],
    interests: ['Coffee', 'Cozy Places', 'Reading', 'Conversations'],
    location: 'San Francisco',
    distance: 7,
    verified: true,
  },
  {
    id: '5',
    name: 'Aria',
    age: 26,
    bio: 'Casual chic and city explorer. I love discovering hidden gems and making new memories 🌟',
    photos: [
      require('../assets/images/6775137f-9756-4379-86f9-faeb40bbaa49.jpeg'),
      require('../assets/images/265ec45e-d2a4-471a-bc1c-5cdecd04b474.jpeg'),
    ],
    interests: ['City Exploration', 'Fashion', 'Photography', 'Adventure'],
    location: 'San Francisco',
    distance: 4,
    verified: false,
  },
];
