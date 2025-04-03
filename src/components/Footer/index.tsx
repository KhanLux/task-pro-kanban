"use client";

import React from 'react';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-6 bg-card border-t flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-1 animate-in">
        <span>© {currentYear} Creado por</span>
        <span className="font-semibold text-card-foreground">KhanLux</span>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="https://github.com/khanlux"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-1 hover:text-primary transition-colors duration-200",
            "hover:scale-105 active:scale-95 transform",
            "animate-in"
          )}
          aria-label="Perfil de GitHub"
        >
          <IconBrandGithub className="h-5 w-5" stroke={1.5} />
          <span className="hidden sm:inline">GitHub</span>
        </a>

        <a
          href="https://www.linkedin.com/in/kevin-collazos-783564224/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-1 hover:text-primary transition-colors duration-200",
            "hover:scale-105 active:scale-95 transform",
            "animate-in"
          )}
          aria-label="Perfil de LinkedIn"
        >
          <IconBrandLinkedin className="h-5 w-5" stroke={1.5} />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
