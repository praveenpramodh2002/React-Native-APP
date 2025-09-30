
export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: any[]; // Changed to any[] to support both require() and string URLs
  interests: string[];
  location: string;
  distance?: number;
  verified?: boolean;
}

export interface Match {
  id: string;
  user: User;
  matchedAt: Date;
  lastMessage?: string;
  unread?: boolean;
}
