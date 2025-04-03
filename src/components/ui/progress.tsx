"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: number
    max: number
    variant?: "default" | "success" | "info" | "warning" | "danger"
  }
>(({ className, value, max, variant = "default", ...props }, ref) => {
  const percentage = (value / max) * 100
  
  const variantClasses = {
    default: "bg-primary",
    success: "bg-green-500 dark:bg-green-600",
    info: "bg-blue-500 dark:bg-blue-600",
    warning: "bg-yellow-500 dark:bg-yellow-600",
    danger: "bg-red-500 dark:bg-red-600",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full flex-1 transition-all duration-500 ease-in-out",
          variantClasses[variant]
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }
