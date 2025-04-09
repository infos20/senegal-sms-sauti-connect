
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SmsMessage {
  id: string;
  recipient: string;
  message: string;
  status: "sent" | "delivered" | "failed";
  timestamp: Date;
}

interface SmsContextProps {
  messages: SmsMessage[];
  sendSms: (recipient: string, message: string) => Promise<SmsMessage>;
}

const SmsContext = createContext<SmsContextProps | undefined>(undefined);

export function SmsProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<SmsMessage[]>([]);

  // Mock SMS sending function - in a real app, this would connect to an SMS API
  const sendSms = async (
    recipient: string,
    message: string
  ): Promise<SmsMessage> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create a new message
    const newMessage: SmsMessage = {
      id: Date.now().toString(),
      recipient,
      message,
      status: Math.random() > 0.1 ? "delivered" : "failed", // 90% success rate for demonstration
      timestamp: new Date(),
    };

    // Update message history
    setMessages((prev) => [newMessage, ...prev]);
    return newMessage;
  };

  return (
    <SmsContext.Provider value={{ messages, sendSms }}>
      {children}
    </SmsContext.Provider>
  );
}

export function useSms() {
  const context = useContext(SmsContext);
  if (context === undefined) {
    throw new Error("useSms must be used within an SmsProvider");
  }
  return context;
}
