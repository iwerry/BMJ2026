import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MentionNotification, MOCK_USERS, User } from './types';

interface FeedbackContextData {
  users: User[];
  notifications: MentionNotification[];
  addNotification: (userId: string, mentionedBy: string, cardId: string) => void;
  markAsRead: (notificationId: string) => void;
}

const FeedbackContext = createContext<FeedbackContextData>({} as FeedbackContextData);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<MentionNotification[]>([]);

  const addNotification = (userId: string, mentionedBy: string, cardId: string) => {
    const newNotif: MentionNotification = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      mentionedBy,
      cardId,
      timestamp: Date.now(),
      read: false,
    };
    setNotifications((prev) => [...prev, newNotif]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        users: MOCK_USERS,
        notifications,
        addNotification,
        markAsRead,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => useContext(FeedbackContext);
