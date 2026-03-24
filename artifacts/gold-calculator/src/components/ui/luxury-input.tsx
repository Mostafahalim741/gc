import React from "react";
import { cn } from "@/lib/utils";

export interface LuxuryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
  error?: string;
}

export const LuxuryInput = React.forwardRef<HTMLInputElement, LuxuryInputProps>(
  ({ className, label, icon, suffix, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-3 w-full">
        <label className="text-sm font-bold text-gold-300 font-sans tracking-wide uppercase">
          {label}
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gold-500 group-focus-within:text-gold-300 transition-colors">
            {icon}
          </div>
          <input
            ref={ref}
            className={cn(
              "w-full bg-black/60 border-2 border-gold-900/50 rounded-xl py-4 px-4",
              "text-gold-100 placeholder:text-muted-foreground/30 font-sans text-2xl font-bold text-right",
              "focus:outline-none focus:ring-4 focus:ring-gold-500/20 focus:border-gold-500/50",
              "transition-all duration-300 backdrop-blur-md shadow-inner",
              icon ? "pr-14" : "",
              suffix ? "pl-16" : "",
              error ? "border-destructive/50 focus:ring-destructive/40" : "",
              className
            )}
            style={{ direction: 'ltr' }}
            {...props}
          />
          {suffix && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <span className="text-gold-500 font-bold text-lg">{suffix}</span>
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs text-destructive mt-1 font-medium">{error}</span>
        )}
      </div>
    );
  }
);
LuxuryInput.displayName = "LuxuryInput";
