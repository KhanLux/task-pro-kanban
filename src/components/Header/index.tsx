"use client";

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { IconLayoutKanban } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onAddColumn: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddColumn }) => {
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
            TaskFlow
            <span className="text-primary ml-1">Pro</span>
          </h1>
          <p className="text-xs text-muted-foreground hidden sm:block animate-in">
            Streamline your workflow, boost your productivity
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          onClick={onAddColumn}
          className={cn(
            "transition-all duration-300",
            "hover:shadow-md hover:translate-y-[-2px]",
            "active:translate-y-[0px]",
            "animate-in"
          )}
        >
          <span className="mr-1">+</span> Add Column
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
    </header>
  );
};

export default Header;
