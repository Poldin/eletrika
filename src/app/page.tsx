// app/page.tsx
"use client";

import React from 'react';  
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Building2, Zap, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";

// Funzione di validazione CAP
const validateCAP = (cap: string) => {
  return /^\d{5}$/.test(cap);
};

interface Question {
  id: string;
  title: string;
  description: string;
  type?: 'choice' | 'input';
  options?: {
    id: string;
    label: string;
    icon?: React.ReactElement;
    description?: string;
  }[];
  validation?: (value: string) => boolean;
  inputType?: string;
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: "tipo_cliente",
    type: "choice",
    title: "Che tipo di cliente sei?",
    description: "Seleziona il tipo di fornitura che ti interessa",
    options: [
      {
        id: "01",
        label: "Domestico",
        icon: <Home className="h-6 w-6" />,
        description: "Casa e famiglia"
      },
      {
        id: "02",
        label: "Business",
        icon: <Building2 className="h-6 w-6" />,
        description: "Aziende e professionisti"
      }
    ]
  },
  {
    id: "tipo_fornitura",
    type: "choice",
    title: "Quale fornitura ti interessa?",
    description: "Scegli il tipo di fornitura che desideri attivare",
    options: [
      {
        id: "EE",
        label: "Energia Elettrica",
        icon: <Zap className="h-6 w-6" />,
      },
      {
        id: "DUAL",
        label: "Luce e Gas",
        icon: <Zap className="h-6 w-6" />,
      }
    ]
  },
  {
    id: "consumo_annuo",
    type: "choice",
    title: "Qual è il tuo consumo annuo?",
    description: "Indica il tuo consumo annuo in kWh",
    options: [
      {
        id: "BASSO",
        label: "Fino a 2700 kWh/anno",
        description: "Famiglia piccola o single"
      },
      {
        id: "MEDIO",
        label: "2700-4500 kWh/anno",
        description: "Famiglia media"
      },
      {
        id: "ALTO",
        label: "Oltre 4500 kWh/anno",
        description: "Famiglia numerosa o consumi elevati"
      }
    ]
  },
  {
    id: "cap",
    type: "input",
    title: "Qual è il tuo CAP?",
    description: "Inserisci il CAP della tua zona per vedere le offerte disponibili",
    inputType: "text",
    placeholder: "Inserisci il CAP",
    validation: validateCAP
  },
  {
    id: "utilizzo_principale",
    type: "choice",
    title: "Quando consumi più energia?",
    description: "Indica quando utilizzi maggiormente l'energia elettrica",
    options: [
      {
        id: "DIURNO",
        label: "Durante il giorno",
        description: "Principalmente tra le 8:00 e le 19:00"
      },
      {
        id: "SERALE",
        label: "La sera e la notte",
        description: "Principalmente dopo le 19:00"
      },
      {
        id: "WEEKEND",
        label: "Nel weekend",
        description: "Maggior consumo nei fine settimana"
      }
    ]
  },
  {
    id: "elettrodomestici",
    type: "choice",
    title: "Quali elettrodomestici usi di più?",
    description: "Seleziona gli elettrodomestici che impattano maggiormente sui tuoi consumi",
    options: [
      {
        id: "CLIMATIZZATORE",
        label: "Climatizzatore",
        description: "Uso frequente del condizionatore"
      },
      {
        id: "POMPA_CALORE",
        label: "Pompa di Calore",
        description: "Riscaldamento/raffrescamento con pompa di calore"
      },
      {
        id: "CUCINA",
        label: "Piano cottura elettrico",
        description: "Utilizzo di piano a induzione o elettrico"
      }
    ]
  },
  {
    id: "green_preferences",
    type: "choice",
    title: "Sei interessato all'energia verde?",
    description: "Indica se preferisci offerte con energia da fonti rinnovabili",
    options: [
      {
        id: "GREEN_FULL",
        label: "Sì, voglio solo energia verde",
        description: "100% energia da fonti rinnovabili"
      },
      {
        id: "GREEN_PARTIAL",
        label: "Sì, ma non è la priorità",
        description: "Valuto anche altre offerte"
      },
      {
        id: "NO_GREEN",
        label: "No, priorità al risparmio",
        description: "Cerco l'offerta più economica"
      }
    ]
  },
  {
    id: "price_preference",
    type: "choice",
    title: "Che tipo di prezzo preferisci?",
    description: "Scegli la tipologia di prezzo che meglio si adatta alle tue esigenze",
    options: [
      {
        id: "FISSO",
        label: "Prezzo Fisso",
        description: "Prezzo bloccato per la durata del contratto"
      },
      {
        id: "VARIABILE",
        label: "Prezzo Variabile",
        description: "Prezzo che segue l'andamento del mercato"
      }
    ]
  }
];

export default function WizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    moveToNextStep();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setInputError(null);
  };

  const handleInputSubmit = () => {
    const currentQuestion = questions[currentStep];
    if (currentQuestion.validation && !currentQuestion.validation(inputValue)) {
      setInputError("Inserisci un CAP valido (5 numeri)");
      return;
    }
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: inputValue }));
    setInputValue("");
    moveToNextStep();
  };

  const moveToNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Redirect to offers page with filters
      router.push(`/riepilogo`);
    }
  };
  console.log(answers)
  const currentQuestion = questions[currentStep];

  return (
    <>
    <Header />
    <ScrollArea className="h-[100dvh]">
      <div className="container max-w-4xl mx-auto p-4 pb-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12 pt-8">
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="text-violet-800" />
          <h1 className="text-4xl font-bold tracking-tight">
            Gas e Luce: trova l&apos;offerta migliore per te.
          </h1>
          <Sparkles className="text-violet-800"/>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rispondi a poche semplici domande e ti aiuteremo a trovare l&apos;offerta 
            più adatta alle tue esigenze.
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-16 rounded-full transition-colors ${
                idx === currentStep
                  ? "bg-violet-800"
                  : idx < currentStep
                  ? "bg-violet-300"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle>{currentQuestion.title}</CardTitle>
                <CardDescription>
                  {currentQuestion.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentQuestion.type === 'input' ? (
                  <div className="space-y-4">
                    <Input
                      type={currentQuestion.inputType}
                      placeholder={currentQuestion.placeholder}
                      value={inputValue}
                      onChange={handleInputChange}
                      className="text-center text-lg"
                    />
                    {inputError && (
                      <Alert variant="destructive">
                        <AlertDescription>{inputError}</AlertDescription>
                      </Alert>
                    )}
                    <Button 
                      className="w-full bg-violet-800 text-white"
                      onClick={handleInputSubmit}
                    >
                      Continua
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {currentQuestion.options?.map((option) => (
                      <Button
                        key={option.id}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center gap-4 hover:border-violet-800 hover:bg-violet-50 transition-colors"
                        onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                      >
                        {option.icon}
                        <div className="space-y-2 text-center">
                          <h3 className="font-medium">{option.label}</h3>
                          {option.description && (
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Indietro
          </Button>
          <div className="text-sm text-muted-foreground">
            {currentStep + 1} di {questions.length}
          </div>
        </div>
      </div>
    </ScrollArea>
    <Footer />
    </>
  );
}