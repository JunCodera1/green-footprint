import { AppSidebar } from '../../components/feature/app-sidebar';
import { ChartAreaInteractive } from '../../components/feature/chart-area-interactive';
import { DataTable } from '../../components/feature/data-table';
import { SectionCards } from '../../components/feature/section-cards';
import { SiteHeader } from '../../components/feature/site-header';
import { SidebarInset, SidebarProvider } from '../../components/ui/sidebar';
import { useState } from 'react';

import data from './data.json';
import { useDarkMode } from '../../hooks/useDarkMode';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
      className="flex h-screen overflow-hidden"
    >
      <div className="sticky top-0 h-screen shrink-0">
        <AppSidebar isDarkMode={isDarkMode} />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <SidebarInset isDarkMode={isDarkMode}>
          <SiteHeader
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
