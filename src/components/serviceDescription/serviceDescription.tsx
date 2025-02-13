import React from 'react';
import { Card } from "@/components/ui/card";
import { AlertCircle, ShieldCheck } from "lucide-react";

const ServiceDescription = () => {
  return (
    <div className="space-y-12 mt-16">
      {/* Main Value Proposition Card */}
      <Card className="p-8 bg-violet-900 text-primary-foreground rounded-xl">
        <h2 className=" flex text-3xl font-bold mb-6 text-center gap-4">
          <ShieldCheck className='h-8 w-8'/> Al tuo fianco, bolletta dopo bolletta.
        </h2>
        <p className="text-lg leading-relaxed text-violet-200">
          Studiamo giorno dopo giorno le offerte di luce e gas che offre il mercato e affiniamo i nostri modelli di valutazione per darti il nostro consiglio migliore. Qualsiasi siano i tuoi consumi o la tua posizione, sappiamo cosa consigliarti quando si parla di bollette luce&gas.
        </p>
        <div className="mt-6 p-4 bg-primary-foreground/10 rounded-lg">
          <p className="text-lg font-medium">
            Inserisci le tue ultime bollette e verifica il risparmio potenziale: potrai sbloccare l&apos;indicazione delle offerte che troviamo in linea con il tuo profilo energetico.
          </p>
          <p className="mt-2 text-3xl font-semibold">
            Paghi €6.90: ricevi la tua analisi.
          </p>
        </div>
      </Card>

      {/* Why We Charge Section */}
      <div className="bg-card p-8 rounded-xl shadow-md">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Perché non eroghiamo le analisi gratis.
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Diversi operatori promettono di trovarti il giusto fornitore di luce e gas gratuitamente. Non lo fanno perché amano il volontariato ma piuttosto perché hanno un modello di business molto chiaro: ricevono una commissione dal fornitore a cui ti indirizzano.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Questo è un problema: non stanno seguendo il tuo interesse ma tentano di &quot;piazzarti&quot; al miglior offerente. [PS: la commissione che ricevono la paghi tu, quando paghi le bollette]
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                <b>Vogliamo cambiare il paradigma: non vogliamo diventare partner dei fornitori, vogliamo diventare il Tuo partner, la tua guida nella scelta del fornitore.</b>
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                <b>Così saremo sempre allineati al tuo interesse.</b>
                </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDescription;