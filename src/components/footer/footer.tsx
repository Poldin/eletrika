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

        {/* Copyright */}
        <div className="text-sm text-muted-foreground text-center">
          © 2025 Madame Elettrika. Tutti i diritti riservati. P.IVA 12345678901
        </div>
      </div>
    </footer>
  );
}