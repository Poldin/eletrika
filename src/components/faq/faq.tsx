import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Che tipo di bollette posso caricare per l'analisi?",
      answer: "Puoi caricare bollette di luce e gas di qualsiasi fornitore del mercato libero o del servizio di maggior tutela. È importante che le bollette siano complete e leggibili, preferibilmente in formato PDF. Per un'analisi ottimale, consigliamo di caricare almeno due bollette consecutive per tipo di fornitura."
    },
    {
      question: "Quanto tempo ci vuole per ricevere l'analisi?",
      answer: "L'analisi viene elaborata entro 24 ore dal caricamento delle bollette e del pagamento. Riceverai una email dettagliata con tutte le nostre valutazioni e i consigli personalizzati per la tua situazione specifica."
    },
    {
      question: "Come funziona il pagamento dei €5.90?",
      answer: "Il pagamento è sicuro e viene processato attraverso i principali circuiti (carte di credito, debito, PayPal). La tariffa è una tantum e include l'analisi completa di tutte le bollette caricate in quella sessione, sia luce che gas. Non ci sono costi ricorrenti o nascosti."
    },
    {
      question: "Siete indipendenti dai fornitori di energia?",
      answer: "Sì, siamo completamente indipendenti. Non accettiamo commissioni dai fornitori e questo ci permette di essere imparziali nelle nostre analisi. Il nostro unico obiettivo è trovare la soluzione migliore per te, basandoci esclusivamente sui dati delle tue bollette e sulle offerte disponibili sul mercato."
    },
    {
      question: "Cosa include l'analisi delle bollette?",
      answer: "L'analisi include: valutazione dettagliata dei tuoi consumi, confronto con le medie di mercato, identificazione di eventuali anomalie nei costi, suggerimenti personalizzati per il risparmio, selezione delle migliori offerte compatibili con il tuo profilo di consumo, e una stima del potenziale risparmio annuale."
    },
    {
      question: "Posso richiedere un'analisi aggiornata in futuro?",
      answer: "Sì, puoi richiedere una nuova analisi in qualsiasi momento. Ogni analisi è considerata separata e richiede un nuovo pagamento, in quanto le offerte di mercato e le condizioni cambiano costantemente. Consigliamo di aggiornare l'analisi ogni 6-12 mesi per massimizzare il risparmio."
    },
    {
      question: "Come gestite i dati personali presenti nelle bollette?",
      answer: "Trattiamo i tuoi dati nel pieno rispetto del GDPR. Le bollette vengono utilizzate esclusivamente per l'analisi richiesta e vengono conservate in modo sicuro e criptato. Non condividiamo mai i tuoi dati con terze parti e li eliminiamo dopo 30 giorni dal completamento dell'analisi."
    },
    {
      question: "Cosa succede se non sono soddisfatto dell'analisi?",
      answer: "Se non sei soddisfatto della qualità o completezza della nostra analisi, offriamo una garanzia di rimborso entro 14 giorni dalla ricezione. Basta inviarci una email spiegando i motivi dell'insoddisfazione e provvederemo al rimborso completo."
    }
  ];

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Domande Frequenti</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;