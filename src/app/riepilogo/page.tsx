"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Zap, 
  Calendar,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

interface Offer {
  id: number;
  nome_offerta: string;
  descrizione: string;
  tipo_offerta: string;
  prezzo_annuo: number;
  durata: number;
  caratteristiche: string[];
}

// Componente che utilizza useSearchParams
function OffersContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [userProfile, setUserProfile] = useState<Record<string, string>>({});

  useEffect(() => {
    const profile: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      profile[key] = value;
    });
    setUserProfile(profile);

    setTimeout(() => {
      setOffers([
        {
          id: 1,
          nome_offerta: "Energia Verde Fix",
          descrizione: "Tariffa fissa con energia 100% rinnovabile",
          tipo_offerta: "FISSO",
          prezzo_annuo: 1250,
          durata: 24,
          caratteristiche: ["green", "prezzo_fisso", "domiciliazione"]
        },
        {
          id: 2,
          nome_offerta: "Flex Power",
          descrizione: "Tariffa variabile con prezzi di mercato",
          tipo_offerta: "VARIABILE",
          prezzo_annuo: 1180,
          durata: 12,
          caratteristiche: ["prezzo_variabile", "domiciliazione"]
        },
        {
          id: 3,
          nome_offerta: "Super Green Plus",
          descrizione: "La migliore offerta per l'ambiente",
          tipo_offerta: "FISSO",
          prezzo_annuo: 1320,
          durata: 24,
          caratteristiche: ["green", "prezzo_fisso", "bonus_attivazione"]
        }
      ]);
      setLoading(false);
    }, 1500);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">
            Stiamo analizzando le migliori offerte per te...
          </p>
        </div>
      </div>
    );
  }

  const bestOffer = offers[0];

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="container max-w-4xl mx-auto p-4 pb-20 space-y-6">
        {/* Header con risultato principale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 py-8"
        >
          <Sparkles className="h-12 w-12 text-violet-800 mx-auto" />
          <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">
            Abbiamo trovato l&apos;offerta perfetta per te!
          </h1>
          <p className="text-3xl font-bold text-violet-800">
            €{bestOffer.prezzo_annuo} all&apos;anno
          </p>
          <p className="text-muted-foreground">
            Ecco le {offers.length} migliori offerte selezionate in base alle tue risposte
          </p>
        </motion.div>

        {/* Lista Offerte */}
        <div className="space-y-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`border-2 ${index === 0 ? 'border-violet-800' : ''}`}>
                {index === 0 && (
                  <div className="bg-violet-800 text-white text-center py-2 text-sm font-medium">
                    Migliore offerta consigliata
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{offer.nome_offerta}</CardTitle>
                      <CardDescription className="mt-2">
                        {offer.descrizione}
                      </CardDescription>
                    </div>
                    <Badge variant={offer.tipo_offerta === 'FISSO' ? 'default' : 'secondary'}>
                      {offer.tipo_offerta === 'FISSO' ? 'Prezzo Fisso' : 'Prezzo Variabile'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Prezzo e durata */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium">Prezzo annuo stimato</span>
                      <span className="text-lg font-bold">€{offer.prezzo_annuo}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium">Durata contratto</span>
                      <span className="font-medium">{offer.durata} mesi</span>
                    </div>
                  </div>

                  {/* Caratteristiche */}
                  <div className="space-y-2">
                    {offer.caratteristiche.includes('green') && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Energia 100% rinnovabile</span>
                      </div>
                    )}
                    {offer.caratteristiche.includes('prezzo_fisso') && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        <span>Prezzo bloccato per {offer.durata} mesi</span>
                      </div>
                    )}
                    {offer.caratteristiche.includes('prezzo_variabile') && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span>Prezzo aggiornato mensilmente</span>
                      </div>
                    )}
                    {offer.caratteristiche.includes('domiciliazione') && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-violet-600" />
                        <span>Domiciliazione bancaria inclusa</span>
                      </div>
                    )}
                    {offer.caratteristiche.includes('bonus_attivazione') && (
                      <div className="flex items-center gap-2 text-sm">
                        <Sparkles className="h-4 w-4 text-yellow-600" />
                        <span>Bonus di benvenuto incluso</span>
                      </div>
                    )}
                  </div>

                  {/* Pulsante azione */}
                  <Button 
                    className={`w-full ${index === 0 ? 'bg-violet-800' : ''} text-white`}
                    size="lg"
                  >
                    {index === 0 ? 'Attiva Offerta Consigliata' : 'Scopri di Più'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Riepilogo profilo */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Il tuo profilo</CardTitle>
            <CardDescription>
              Le offerte sono state selezionate in base alle tue risposte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Consumo annuo</p>
                  <p className="text-sm text-muted-foreground">
                    {userProfile.consumo_annuo === 'BASSO' ? 'Fino a 2700 kWh' :
                     userProfile.consumo_annuo === 'MEDIO' ? '2700-4500 kWh' : 'Oltre 4500 kWh'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Utilizzo principale</p>
                  <p className="text-sm text-muted-foreground">
                    {userProfile.utilizzo_principale === 'DIURNO' ? 'Durante il giorno' :
                     userProfile.utilizzo_principale === 'SERALE' ? 'La sera e la notte' : 
                     'Nel weekend'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer con CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
          <div className="container max-w-4xl mx-auto">
            <Button className="w-full bg-violet-800 text-white" size="lg">
              Attiva Offerta Consigliata
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

// Componente principale che avvolge il contenuto con Suspense
export default function OffersPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[100dvh] items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">
            Caricamento...
          </p>
        </div>
      </div>
    }>
      <OffersContent />
    </Suspense>
  );
}