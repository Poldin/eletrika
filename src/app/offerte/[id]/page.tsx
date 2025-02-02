// app/offerte/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../supabase";
import { Loader2, Calendar, CreditCard, ArrowLeft, Zap, FileText, Wallet, Share2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

interface SupabaseError {
    message: string;
    code?: string;
    details?: string;
    hint?: string;
  }

interface OfferDetail {
  id: number;
  tipo_mercato: string;
  offerta_singola: string;
  tipo_cliente: string;
  tipo_offerta: string;
  nome_offerta: string;
  descrizione: string;
  durata: number;
  garanzie: string;
  data_inizio: string;
  data_fine: string;
}

interface CompanyComponent {
  id: number;
  nome: string;
  descrizione: string;
  tipologia: string;
  macroarea: string;
  price_intervals: {
    fascia_componente: string;
    prezzo: number;
    unita_misura: string;
  }[];
}

interface PaymentMethod {
  modalita_pagamento: string;
  descrizione: string | null;
}

export default function OfferPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offerDetail, setOfferDetail] = useState<OfferDetail | null>(null);
  const [components, setComponents] = useState<CompanyComponent[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    async function fetchOfferDetails() {
      try {
        console.log('Fetching offer with ID:', id);
        setLoading(true);
        setError(null);

        // First check if the offer exists in the main offers table
        const { data: offerExists, error: offerExistsError } = await supabase
          .from('offers')
          .select('id')
          .eq('id', id)
          .single();

        if (offerExistsError) {
          console.error('Error checking offer existence:', offerExistsError);
          throw new Error(`Offerta non trovata: ${offerExistsError.message}`);
        }

        if (!offerExists) {
          throw new Error(`Nessuna offerta trovata con ID: ${id}`);
        }
        
        // Fetch offer details
        const { data: offerData, error: offerError } = await supabase
          .from('offer_details')
          .select('*')
          .eq('offer_id', id)
          .single();

        if (offerError) {
          console.error('Error fetching offer details:', offerError);
          throw new Error(`Errore nel caricamento dei dettagli: ${offerError.message}`);
        }

        if (!offerData) {
          throw new Error(`Nessun dettaglio trovato per l'offerta ${id}`);
        }

        // Fetch company components with price intervals
        const { data: componentData, error: componentError } = await supabase
          .from('company_components')
          .select(`
            id,
            nome,
            descrizione,
            tipologia,
            macroarea,
            price_intervals (
              fascia_componente,
              prezzo,
              unita_misura
            )
          `)
          .eq('offer_id', id);

        if (componentError) {
          console.error('Error fetching components:', componentError);
          throw new Error(`Errore nel caricamento dei componenti: ${componentError.message}`);
        }

        // Fetch payment methods
        const { data: paymentData, error: paymentError } = await supabase
          .from('payment_methods')
          .select('modalita_pagamento, descrizione')
          .eq('offer_id', id);

        if (paymentError) {
          console.error('Error fetching payment methods:', paymentError);
          throw new Error(`Errore nel caricamento dei metodi di pagamento: ${paymentError.message}`);
        }

        setOfferDetail(offerData);
        setComponents(componentData || []);
        setPaymentMethods(paymentData || []);

    } catch (err: unknown) {
        const error = err as SupabaseError;
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        setError(error.message || 'Errore sconosciuto nel caricamento dell\'offerta');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchOfferDetails();
    }
  }, [id]);

  const formatPaymentMethod = (method: string): string => {
    const paymentMethods: Record<string, string> = {
      '01': 'Bonifico Bancario',
      '02': 'Carta di Credito',
      '03': 'Addebito Diretto',
      '04': 'PayPal',
      '99': 'Altro'
    };
    return paymentMethods[method] || method;
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: offerDetail?.nome_offerta || 'Offerta Energia',
          text: offerDetail?.descrizione || 'Scopri questa offerta energia!',
          url: window.location.href,
        });
      } else {
        // Fallback per browser che non supportano Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiato negli appunti!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const formatTipoMercato = (tipo: string): string => {
    const tipi: Record<string, string> = {
      '01': 'Mercato Libero',
      '02': 'Tutela Graduale',
      '03': 'Servizio di Default'
    };
    return tipi[tipo] || tipo;
  };

  const formatTipoCliente = (tipo: string): string => {
    const tipi: Record<string, string> = {
      '01': 'Domestico',
      '02': 'Business'
    };
    return tipi[tipo] || tipo;
  };

  if (loading) {
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Caricamento offerta...</p>
        </div>
      </div>
    );
  }

  if (error || !offerDetail) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Errore</AlertTitle>
          <AlertDescription>
            {error || "Impossibile caricare i dettagli dell'offerta"}
          </AlertDescription>
        </Alert>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna indietro
        </Button>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="container max-w-4xl mx-auto p-4 pb-20 space-y-6">
        {/* Header con pulsante back */}
        <div className="flex items-start gap-4 -ml-2">
            <Button 
                variant="ghost" 
                className="h-8 w-8 p-0 lg:h-9 lg:w-9"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <div className="flex-1">
                <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight lg:text-3xl">
                    {offerDetail.nome_offerta}
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="h-6">
                        {formatTipoMercato(offerDetail.tipo_mercato)}
                    </Badge>
                    <Badge variant="outline" className="h-6">
                        {formatTipoCliente(offerDetail.tipo_cliente)}
                    </Badge>
                    <Badge variant="secondary" className="h-6">
                        {offerDetail.durata} mesi
                    </Badge>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-fit px-2 bg-violet-800 text-white"
                    onClick={handleShare}
                >
                    <Share2 className="h-4 w-4 lg:h-5 lg:w-5" />
                    condividi offerta
                </Button>
                </div>
            </div>
            </div>

        {/* Tabs principali */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Panoramica</span>
            </TabsTrigger>
            <TabsTrigger value="components" className="space-x-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Componenti</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="space-x-2">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Pagamenti</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dettagli Offerta</CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  {offerDetail.descrizione}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Data inizio</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(offerDetail.data_inizio).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Data fine</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(offerDetail.data_fine).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Caratteristiche</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-muted rounded-lg items-center">
                      <span className="text-sm font-medium">Tipo Offerta</span>
                      <Badge variant="secondary">
                        {offerDetail.tipo_offerta === '02' ? 'Variabile' : 'Fissa'}
                      </Badge>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded-lg items-center">
                      <span className="text-sm font-medium">Garanzie Richieste</span>
                      <Badge variant="secondary">
                        {offerDetail.garanzie === 'SI' ? 'Sì' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded-lg items-center">
                      <span className="text-sm font-medium">Offerta Singola</span>
                      <Badge variant="secondary">
                        {offerDetail.offerta_singola === 'SI' ? 'Sì' : 'No'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components">
            <Card>
              <CardHeader>
                <CardTitle>Componenti dell`&apos;`Offerta</CardTitle>
                <CardDescription>
                  Dettaglio delle componenti di prezzo e delle condizioni economiche
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {components.map((component) => (
                    <AccordionItem key={component.id} value={component.id.toString()}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-1 items-center justify-between pr-4">
                          <span className="text-sm font-medium">{component.nome}</span>
                          {component.price_intervals.length > 0 && (
                            <Badge variant="secondary" className="ml-4">
                              {component.price_intervals[0].prezzo} €/
                              {component.price_intervals[0].unita_misura === '01' ? 'anno' : 'kWh'}
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">{component.descrizione}</p>
                          {component.price_intervals.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-sm font-medium">Prezzi per fascia:</h4>
                              <div className="space-y-2">
                                {component.price_intervals.map((interval, idx) => (
                                  <div 
                                    key={idx} 
                                    className="flex justify-between items-center bg-muted p-3 rounded-lg"
                                  >
                                    <span className="text-sm">Fascia {interval.fascia_componente}</span>
                                    <span className="text-sm font-medium">
                                      {interval.prezzo.toFixed(6)}
                                      €/{interval.unita_misura === '01' ? 'anno' : 'kWh'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Metodi di Pagamento</CardTitle>
                <CardDescription>
                  Metodi di pagamento accettati per questa offerta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {paymentMethods.map((method, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {formatPaymentMethod(method.modalita_pagamento)}
                        </p>
                        {method.descrizione && (
                          <p className="text-sm text-muted-foreground">
                            {method.descrizione}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Footer Azioni Mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
          <div className="container max-w-4xl mx-auto">
            <Button className="w-full bg-violet-800 text-white" size="lg">
              Attiva Offerta
            </Button>
          </div>
        </div>
        
        {/* Footer Azioni Desktop */}
        <div className="hidden md:block">
          <Button size="lg" className="bg-violet-800 text-white">
            Attiva Offerta
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}