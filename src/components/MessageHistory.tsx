
import React from "react";
import { useSms, SmsMessage } from "@/context/SmsContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock } from "lucide-react";

const MessageHistory = () => {
  const { messages } = useSms();

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No messages yet. Start sending SMS to see your history.
        </p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <MessageCard key={msg.id} message={msg} formatDate={formatDate} />
      ))}
    </div>
  );
};

const MessageCard = ({
  message,
  formatDate,
}: {
  message: SmsMessage;
  formatDate: (date: Date) => string;
}) => {
  const getStatusIcon = () => {
    switch (message.status) {
      case "delivered":
        return <Check className="h-4 w-4 text-green-500" />;
      case "failed":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (message.status) {
      case "delivered":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Delivered
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-200 bg-yellow-50">
            Pending
          </Badge>
        );
    }
  };

  return (
    <Card className="p-4 shadow-sm hover:shadow transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{message.recipient}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {formatDate(message.timestamp)}
          </p>
        </div>
        <div>{getStatusBadge()}</div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
        <p className="whitespace-pre-wrap">{message.message}</p>
      </div>
      
      <div className="mt-3 flex items-center text-xs text-muted-foreground">
        {getStatusIcon()}
        <span className="ml-1">
          {message.status === "delivered" ? "Delivered" : 
           message.status === "failed" ? "Delivery failed" : "Pending"}
        </span>
      </div>
    </Card>
  );
};

export default MessageHistory;
