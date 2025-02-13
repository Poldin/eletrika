import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Termini e Condizioni", href: "/termini-condizioni" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Trasparenza", href: "/trasparenza" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
  ];

  return (
    <footer className="w-full border-t bg-background px-4 py-6">
      <div className="container flex flex-col items-center gap-4">
        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          {legalLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            
            <Link 
              href="https://stripe.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-medium"
            >
              <b>Powered by Stripe</b>
            </Link>
          </div>
          <div className="flex gap-3">
            {/* <img src="/images/payment/visa.svg" alt="Visa" className="h-6" />
            <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="/images/payment/amex.svg" alt="American Express" className="h-6" />
            <img src="/images/payment/maestro.svg" alt="Maestro" className="h-6" /> */}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm text-muted-foreground text-center">
          © 2025 Chiara luce&gas. Tutti i diritti riservati. P.IVA 12345678901
        </div>
      </div>
    </footer>
  );
}