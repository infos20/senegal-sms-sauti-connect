
import React, { useState } from "react";
import { useSms } from "@/context/SmsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { validateSenegalesePhone, formatSenegalesePhone } from "@/utils/phoneUtils";
import { toast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";

const SmsForm = () => {
  const { sendSms } = useSms();
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const characterLimit = 160;
  const remainingChars = characterLimit - message.length;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipient(value);
    
    if (value && !validateSenegalesePhone(value)) {
      setPhoneError("Please enter a valid Senegalese phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !message) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!validateSenegalesePhone(recipient)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Senegalese phone number",
        variant: "destructive",
      });
      return;
    }
    
    if (message.length > characterLimit) {
      toast({
        title: "Message Too Long",
        description: `Your message exceeds the ${characterLimit} character limit`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const formattedNumber = formatSenegalesePhone(recipient);
      const result = await sendSms(formattedNumber, message);
      
      if (result.status === "delivered") {
        toast({
          title: "Message Sent",
          description: "Your SMS has been sent successfully",
        });
        // Reset form
        setRecipient("");
        setMessage("");
      } else {
        toast({
          title: "Failed to Send",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error("SMS sending error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recipient">Phone Number</Label>
        <Input
          id="recipient"
          placeholder="+221 7X XXX XX XX"
          value={recipient}
          onChange={handlePhoneChange}
          className={phoneError ? "border-red-500" : ""}
        />
        {phoneError && (
          <p className="text-sm text-red-500">{phoneError}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Enter a Senegalese mobile number (e.g., +221 7X XXX XX XX)
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="message">Message</Label>
          <span className={`text-xs ${remainingChars < 0 ? "text-red-500" : "text-muted-foreground"}`}>
            {remainingChars} characters remaining
          </span>
        </div>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={remainingChars < 0 ? "border-red-500" : ""}
        />
      </div>
      
      <Card className="p-3 bg-gray-50">
        <div className="text-sm">
          <p className="font-medium">Preview:</p>
          <p className="mt-1 text-gray-700 whitespace-pre-wrap">
            {message || "Your message will appear here..."}
          </p>
        </div>
      </Card>
      
      <Button 
        type="submit" 
        className="w-full bg-senegal-green hover:bg-senegal-green/90"
        disabled={isLoading || !recipient || !message || message.length > characterLimit || !!phoneError}
      >
        {isLoading ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send SMS"
        )}
      </Button>
    </form>
  );
};

export default SmsForm;
