"use client";

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { IconLayoutKanban, IconChartBar, IconCalendar } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// No props needed for Header component

const Header: React.FC = () => {
  const pathname = usePathname();
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-5 bg-card shadow-sm gap-3 sm:gap-0 border-b relative overflow-hidden">
      <div className="flex items-center gap-2 group">
        <div className="relative">
          <IconLayoutKanban
            className="h-7 w-7 text-primary transition-all duration-300 group-hover:scale-110"
            stroke={1.5}
          />
          <div className="absolute -inset-1 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-card-foreground tracking-tight">
            GestorTareas
            <span className="text-primary ml-1">Pro</span>
          </h1>
          <p className="text-xs text-muted-foreground hidden sm:block animate-in">
            Optimiza tu flujo de trabajo, aumenta tu productividad
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <div className="flex items-center gap-2">
          <Link href="/calendar">
            <Button
              variant={pathname === '/calendar' ? 'default' : 'outline'}
              className={cn(
                "transition-all duration-300",
                "hover:shadow-md hover:translate-y-[-2px]",
                "active:translate-y-[0px]",
                "animate-in"
              )}
            >
              <IconCalendar className="h-4 w-4 mr-1" />
              Calendario
            </Button>
          </Link>

          <Link href="/statistics">
            <Button
              variant={pathname === '/statistics' ? 'default' : 'outline'}
              className={cn(
                "transition-all duration-300",
                "hover:shadow-md hover:translate-y-[-2px]",
                "active:translate-y-[0px]",
                "animate-in"
              )}
            >
              <IconChartBar className="h-4 w-4 mr-1" />
              Estadísticas
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
    </header>
  );
};

export default Header;
