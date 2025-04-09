
import React from "react";
import SmsForm from "@/components/SmsForm";
import MessageHistory from "@/components/MessageHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <header className="py-6 bg-white shadow-sm">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-senegal-green"></div>
            <h1 className="text-2xl font-bold text-senegal-green">
              Sauti Connect
            </h1>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-8 rounded-full bg-senegal-green"></div>
            <div className="h-2 w-8 rounded-full bg-senegal-yellow"></div>
            <div className="h-2 w-8 rounded-full bg-senegal-red"></div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Card className="border-t-4 border-t-senegal-green shadow-md">
          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="send">Send SMS</TabsTrigger>
              <TabsTrigger value="history">Message History</TabsTrigger>
            </TabsList>
            <TabsContent value="send">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Send New Message</h2>
                <SmsForm />
              </div>
            </TabsContent>
            <TabsContent value="history">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Message History</h2>
                <MessageHistory />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>

      <footer className="py-4 bg-senegal-green text-white">
        <div className="container text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Sauti Connect - SMS Service for
            Senegal
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
