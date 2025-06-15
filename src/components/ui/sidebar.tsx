import React from 'react';
import { cn } from '../../lib/utils';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: 'offcanvas' | 'overlay';
  variant?: 'inset' | 'default';
  isDarkMode: boolean;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ isDarkMode, className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full w-64 flex-col border-r',
          isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-emerald-50/50 border-emerald-900',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-14 items-center border-b border-emerald-100 bg-emerald-50 px-4',
        className
      )}
      {...props}
    />
  )
);

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex-1 overflow-auto p-4', className)} {...props} />
));

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-t border-emerald-100 bg-emerald-50/50 p-4', className)}
      {...props}
    />
  )
);

export const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />
  )
);

export const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
));

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-emerald-700',
      className
    )}
    {...props}
  />
));

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {
  isDarkMode?: boolean;
}

export const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ isDarkMode, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-1 flex-col', isDarkMode ? 'bg-gray-900' : 'bg-white', className)}
      {...rest}
    >
      {children}
    </div>
  )
);

export const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex h-screen bg-emerald-50/30', className)} {...props} />
));
