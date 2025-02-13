import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="space-x-2">
          <span className="text-xl font-bold flex gap-2 font-mono items-center">
            <Sparkles className="text-violet-800"/> Chiara luce&gas
          </span>
          <span className="text-base flex gap-2 items-center">
            al tuo fianco, bolletta dopo bolletta
          </span>
        </Link>

        {/* CTA Button */}
        <Button variant="default" size="sm" className="bg-violet-800">
          accedi
        </Button>
      </div>
    </header>
  );
}