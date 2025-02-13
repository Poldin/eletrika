import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Zap } from "lucide-react";

const WhatsAppSection = () => {
  return (
    <section className="mt-16">
      <Card className="p-8 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-8 h-8" />
            <h2 className="text-3xl font-bold">Unisciti alla nostra community WhatsApp</h2>
          </div>
          
          <p className="text-lg max-w-2xl">
            Entra nel gruppo dove condividiamo aggiornamenti in tempo reale sulle migliori offerte, 
            consigli per il risparmio e novità del mercato energetico.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mt-4">
            <div className="flex flex-col items-center space-y-2">
              <Users className="w-6 h-6" />
              <p className="font-medium">Q&A con l&apos;esperto</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Zap className="w-6 h-6" />
              <p className="font-medium">Le migliori offerte. Aggiornate</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <MessageCircle className="w-6 h-6" />
              <p className="font-medium">Conosciamoci</p>
            </div>
          </div>

          <Button 
            className="bg-white text-green-600 hover:bg-green-50 font-semibold text-lg px-8 py-6 h-auto mt-4"
            onClick={() => window.open('https://chat.whatsapp.com/your-invite-link', '_blank')}
          >
            Entra nel Gruppo WhatsApp
          </Button>

          <p className="text-sm opacity-90">
            Partecipazione gratuita • Puoi uscire quando vuoi • Max 2 messaggi al giorno
          </p>
        </div>
      </Card>
    </section>
  );
};

export default WhatsAppSection;