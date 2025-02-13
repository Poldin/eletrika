"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lightbulb, Wallet, TrendingDown, Battery, Upload, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';


interface Saving {
    offer: string;
    amount: number;
    description: string;
    efficiency: number;
}

interface Consumption {
    current: number;
    currentSpend: number;
    potentialSpend: number;
}

interface MarketComparison {
    name: string;
    value: number;
    color: string;
}

interface AnalysisResults {
    savings: Saving[];
    matchingOffersCount: number;
    consumption: Consumption;
    marketComparison: MarketComparison[];
}

export const BillAnalyzer = () => {
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [analysisFact, setAnalysisFact] = useState("");
    const [progressValue, setProgressValue] = useState(0);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const energyFacts = [
        "Spegnere le luci quando esci da una stanza può farti risparmiare fino al 15% sulla bolletta.",
        "Un frigorifero di classe A+++ consuma il 60% in meno rispetto a uno di classe B.",
        "Le lampadine LED consumano l'80% in meno di quelle tradizionali.",
        "Il riscaldamento rappresenta il 70% dei consumi energetici domestici.",
        "Un rubinetto che gocciola può sprecare fino a 6 litri d'acqua al giorno.",
        "Una doccia di 5 minuti consuma 1/3 dell'acqua di un bagno.",
        "Abbassare di 1°C il termostato riduce i consumi del 7%."
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(prev => [...prev, ...selectedFiles]);

        const newUrls = selectedFiles.map(file => {
            if (file.type.startsWith('image/')) {
                return URL.createObjectURL(file);
            }
            return file.type === 'application/pdf' ? '/icons/pdf-icon.svg' : '/icons/file-icon.svg';
        });
        setPreviewUrls(prev => [...prev, ...newUrls]);
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);
        
        // Cleanup URL object
        URL.revokeObjectURL(previewUrls[index]);
        
        setFiles(newFiles);
        setPreviewUrls(newUrls);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-violet-500');
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-violet-500');
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-violet-500');
        
        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter(file => 
            file.type.startsWith('image/') || file.type === 'application/pdf'
        );

        if (validFiles.length) {
            const changeEvent = {
                target: { files: validFiles }
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleFileChange(changeEvent);
        }
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setShowDialog(false);
        setProgressValue(0);

        // Simula progresso analisi con fatti casuali
        for (let i = 0; i <= 100; i += 20) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProgressValue(i);
            setAnalysisFact(energyFacts[Math.floor(Math.random() * energyFacts.length)]);
        }

        const simulatedResults = {
            savings: [
                { offer: "Offerta Green", amount: 150, description: "Energia 100% rinnovabile", efficiency: 95 },
                { offer: "Offerta Luce Smart", amount: 120, description: "Tariffa bi-oraria automatica", efficiency: 88 },
                { offer: "Offerta Gas Promo", amount: 100, description: "Prezzo bloccato per 12 mesi", efficiency: 82 },
            ],
            matchingOffersCount: 25,
            consumption: {
                current: 2800,
                currentSpend: 1800,
                potentialSpend: 1450
            },
            marketComparison: [
                { name: 'La tua offerta', value: 180, color: '#ef4444' },
                { name: 'Media mercato', value: 220, color: '#6b7280' },
                { name: 'Migliore offerta', value: 150, color: '#22c55e' }
            ]
        };

        setAnalysisResults(simulatedResults);
        setIsAnalyzing(false);
        setShowDialog(true);
    };

    return (
        <>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="text-violet-800" />
                        Carica le tue bollette e scopri se puoi risparmiare
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 transition-colors duration-200 hover:border-violet-500"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf, .png, .jpg, .jpeg"
                        />
                        <div className="flex flex-col items-center gap-4">
                            <Upload className="h-6 w-6 text-violet-800" />
                            <div className="text-center">
                                <p className="text-lg font-medium">Trascina qui i tuoi file o</p>
                                <Button 
                                    onClick={() => fileInputRef.current?.click()}
                                    variant="ghost" 
                                    className="text-violet-800 hover:text-violet-900 hover:bg-violet-50"
                                >
                                    seleziona dal dispositivo
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500">PDF, JPG o PNG (max 10MB per file)</p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {files.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            >
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <div className="aspect-square rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center">
                                            <img 
                                                src={url} 
                                                alt={`File ${index + 1}`} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-3 border-t pt-4">
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="terms"
                                checked={acceptedTerms}
                                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                                className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="terms"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Accetto i <a href="/termini-e-condizioni" className="text-violet-800 hover:text-violet-900 underline">Termini e Condizioni</a> e{" "}
                                    <a href="/privacy-policy" className="text-violet-800 hover:text-violet-900 underline">Privacy Policy</a>
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    La tua privacy è importante per noi. Leggi come trattiamo i tuoi dati.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleAnalyze}
                        disabled={files.length === 0 || isAnalyzing || !acceptedTerms}
                        className="w-full bg-violet-800 hover:bg-violet-900 text-white transition-colors duration-200"
                    >
                        {isAnalyzing ? 'Analisi in corso...' : 'Avvia l\'analisi'}
                    </Button>
                </CardContent>
            </Card>

            {isAnalyzing && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <Card className="w-full max-w-md mx-4">
                        <CardContent className="py-8">
                            <div className="flex flex-col items-center gap-6">
                                <Progress value={progressValue} className="w-full" />
                                <div className="text-center space-y-2">
                                    <p className="text-lg font-medium">Analisi in corso...</p>
                                    <p className="text-sm text-gray-500">Stiamo analizzando le tue bollette</p>
                                </div>
                                <div className="p-4 bg-violet-50 rounded-lg max-w-sm">
                                    <p className="text-sm text-violet-800 italic flex items-center gap-2">
                                        <Lightbulb className="h-4 w-4" />
                                        {analysisFact}
                                    </p>
                                </div>
                                <Sparkles className="text-violet-800 h-12 w-12 animate-spin" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="mx-4 max-h-[90vh] overflow-y-auto min-w-[90vw]">
                    <div className="border-b pb-4">
                        <DialogTitle className="text-xl font-bold text-gray-800">
                            Abbiamo completato l&apos;analisi.
                        </DialogTitle>
                    </div>

                    <div className="py-6 space-y-8">
                        <DialogDescription className="space-y-8">
                            <div className="text-center bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-lg">
                                <h3 className="text-3xl font-bold text-violet-800">
                                    Risparmio Potenziale
                                </h3>
                                <p className="text-5xl font-bold text-violet-900 mt-2">
                                    {analysisResults?.savings.reduce((max, saving) => Math.max(max, saving.amount), 0)}€
                                </p>
                                <p className="text-gray-600">all&apos;anno sulla tua bolletta</p>
                                <Button 
                                    onClick={() => router.push('/riepilogo')}
                                    className="w-fit font-bold bg-violet-800 hover:bg-violet-900 text-white text-lg py-6 mt-4"
                                >
                                    Iscriviti a €30 all&apos;anno per vedere le migliori offerte
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Battery className="text-green-600" />
                                        <h4 className="font-semibold">Consumo Attuale</h4>
                                    </div>
                                    <p className="text-2xl font-bold text-green-700 mt-2">
                                        {analysisResults?.consumption.current} kWh
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Wallet className="text-blue-600" />
                                        <h4 className="font-semibold">Spesa Annua Attuale*</h4>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-700 mt-2">
                                        {analysisResults?.consumption.currentSpend}€
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <TrendingDown className="text-purple-600" />
                                        <h4 className="font-semibold">Spesa Annua Potenziale*</h4>
                                    </div>
                                    <p className="text-2xl font-bold text-purple-700 mt-2">
                                        {analysisResults?.consumption.potentialSpend}€
                                    </p>
                                </div>
                            </div>

                            <div className="h-72 bg-gray-50 p-6 rounded-lg">
                                <h4 className="font-semibold mb-4">Confronto con il Mercato</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={analysisResults?.marketComparison}>
                                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        <Bar 
                                            dataKey="value" 
                                            radius={[4, 4, 0, 0]}
                                        >
                                            {
                                                analysisResults?.marketComparison.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold">Migliori Offerte Disponibili</h4>
                                {analysisResults?.savings.map((saving, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-gray-50 border">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold text-lg">{saving.offer}</h3>
                                                <p className="text-gray-600">{saving.description}</p>
                                                <div className="mt-2 bg-gray-200 rounded-full h-2 w-32">
                                                    <div 
                                                        className="bg-violet-600 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${saving.efficiency}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-green-600">-{saving.amount}€</p>
                                                <p className="text-sm text-gray-500">annui</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-sm text-gray-500">
                                * Stima basata sui dati forniti
                            </div>
                        </DialogDescription>

                        <div className="mt-6 border-t pt-6 flex flex-col items-center gap-4">
                            <p className="text-center text-gray-600">
                                Iscriviti per vedere le offerte che abbiamo identificato per te
                            </p>
                            <Button 
                                onClick={() => router.push('/riepilogo')}
                                className="w-fit font-bold bg-violet-800 hover:bg-violet-900 text-white text-lg py-6"
                            >
                                Iscriviti a €30 all&apos;anno e vedi le migliori offerte
                            </Button>
                            <p className="text-center text-sm text-violet-800 font-medium">
                                Al tuo fianco, bolletta dopo bolletta
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};