import { Github, Instagram, Linkedin, Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-4 px-4 sm:px-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="font-bold">Desenvolvido por Quilion Oliveira</p>
        </div>
        <div className="flex space-x-2">
          <TooltipProvider>
            {[
              {
                href: "https://www.linkedin.com/in/quilion7/",
                icon: Linkedin,
                label: "LinkedIn",
              },
              {
                href: "https://github.com/QuiLion7",
                icon: Github,
                label: "GitHub",
              },
              {
                href: "https://quildev.vercel.app/",
                icon: Globe,
                label: "Portfólio",
              },
              {
                href: "https://www.instagram.com/quilion7",
                icon: Instagram,
                label: "Instagram",
              },
            ].map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors p-2 rounded-full hover:bg-primary-foreground hover:text-primary inline-flex items-center justify-center"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </footer>
  );
}
