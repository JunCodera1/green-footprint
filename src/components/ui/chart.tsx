import * as React from 'react';
import { cn } from '../../lib/utils';

interface ChartConfig {
  data: Record<string, number>[];
  categories: string[];
  index: string;
  colors: string[];
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ChartTooltipProps {
  children: React.ReactNode;
}

type ChartTooltipContentProps = React.HTMLAttributes<HTMLDivElement>;

export function ChartContainer({ children, className, ...props }: ChartContainerProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      {children}
    </div>
  );
}

export function ChartTooltip({ children }: ChartTooltipProps) {
  return <div className="relative">{children}</div>;
}

export function ChartTooltipContent({ className, ...props }: ChartTooltipContentProps) {
  return (
    <div className={cn('rounded-lg border bg-background p-2 shadow-sm', className)} {...props} />
  );
}

export { type ChartConfig };
