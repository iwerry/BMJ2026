export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
}

export interface MentionNotification {
  id: string;
  userId: string; // The user who was mentioned
  mentionedBy: string; // The ID of the user who made the mention
  cardId: string; // Context where the mention happened
  timestamp: number;
  read: boolean;
}

// Simulated users for demonstration
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Werry', username: 'werry', avatarUrl: 'https://i.pravatar.cc/150?u=werry' },
  { id: 'u2', name: 'Ana Silva', username: 'ana', avatarUrl: 'https://i.pravatar.cc/150?u=ana' },
  { id: 'u3', name: 'Carlos Beta', username: 'carlos_b', avatarUrl: 'https://i.pravatar.cc/150?u=carlos' },
  { id: 'u4', name: 'Julia Dev', username: 'juliadev', avatarUrl: 'https://i.pravatar.cc/150?u=julia' },
];
