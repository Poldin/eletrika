"use client";

import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { BillAnalyzer } from '@/components/billAnalyzer/billAnalyzer';
import ServiceDescription from '@/components/serviceDescription/serviceDescription';
import FAQSection from '@/components/faq/faq';
import WhatsAppSection from '@/components/whatsapp/whatsapp';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <ScrollArea className="flex-grow">
                <main className="container max-w-4xl mx-auto p-4 pb-20">
                    <section className="text-center space-y-6 mb-12 pt-8">
                        <div className="flex items-center justify-center gap-4">
                            <Sparkles className="text-violet-800 animate-pulse" />
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-800 to-purple-600 bg-clip-text text-transparent">
                                Gas e Luce: trova l&apos;offerta migliore per te
                            </h1>
                            <Sparkles className="text-violet-800 animate-pulse" />
                        </div>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Carica le tue bollette e ti aiuteremo a trovare l&apos;offerta più adatta alle tue esigenze
                        </p>
                    </section>

                    <BillAnalyzer />
                    <ServiceDescription />
                    <FAQSection />
                    <WhatsAppSection/>
                </main>
            </ScrollArea>
            <Footer />
        </div>
    );
}