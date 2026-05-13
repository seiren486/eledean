import React from 'react';
import { LayoutDashboard, BarChart2, Target, Settings, Home } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-margin-desktop h-16 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-on-secondary-fixed-variant">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <BarChart2 className="text-primary dark:text-inverse-primary shrink-0" size={24} />
          <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary truncate whitespace-nowrap">
            11번가 전시입찰광고 매출현황
          </h1>
        </div>
        <div className="flex items-center gap-element-gap">
          <div className="hidden md:flex gap-6 items-center">
            <a className="text-primary dark:text-inverse-primary font-bold border-b-2 border-primary font-label-sm text-label-sm px-1" href="#">대시보드</a>
            <a className="text-secondary dark:text-secondary-fixed-dim font-label-sm text-label-sm hover:bg-surface-container-high transition-colors" href="#">매출 분석</a>
            <a className="text-secondary dark:text-secondary-fixed-dim font-label-sm text-label-sm hover:bg-surface-container-high transition-colors" href="#">캠페인 관리</a>
          </div>
        </div>
      </header>

      {/* NavigationDrawer (Desktop) */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-72 p-4 gap-element-gap z-40 bg-surface-container-low dark:bg-inverse-surface border-r border-outline-variant dark:border-on-secondary-fixed-variant">
        <div className="px-2 py-4">
          <h2 className="font-headline-lg text-headline-lg font-black text-primary dark:text-inverse-primary">광고 분석 시스템</h2>
        </div>
        <nav className="flex flex-col gap-1">
          <a className="flex items-center gap-3 px-4 py-3 bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-xl font-bold scale-[0.98] transition-transform duration-150" href="#">
            <LayoutDashboard size={20} />
            <span className="font-body-md text-body-md">대시보드</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-secondary-fixed-dim hover:bg-surface-container-high rounded-xl transition-colors" href="#">
            <BarChart2 size={20} />
            <span className="font-body-md text-body-md">매출 분석</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-secondary-fixed-dim hover:bg-surface-container-high rounded-xl transition-colors" href="#">
            <Target size={20} />
            <span className="font-body-md text-body-md">캠페인 관리</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-secondary-fixed-dim hover:bg-surface-container-high rounded-xl transition-colors" href="#">
            <Settings size={20} />
            <span className="font-body-md text-body-md">시스템 설정</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-24 pb-20 lg:pb-8 lg:ml-72 px-4 md:px-margin-desktop max-w-container-max mx-auto">
        {children}
      </main>

      {/* BottomNavBar (Mobile) */}
      <footer className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-on-secondary-fixed-variant bg-surface/80 backdrop-blur-md shadow-lg rounded-t-xl">
        <a className="flex flex-col items-center justify-center text-primary dark:text-inverse-primary font-bold scale-95 transition-all" href="#">
          <Home size={20} />
          <span className="font-label-sm text-label-sm mt-1">홈</span>
        </a>
        <a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container transition-colors" href="#">
          <BarChart2 size={20} />
          <span className="font-label-sm text-label-sm mt-1">분석</span>
        </a>
        <a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container transition-colors" href="#">
          <LayoutDashboard size={20} />
          <span className="font-label-sm text-label-sm mt-1">관리</span>
        </a>
        <a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container transition-colors" href="#">
          <Settings size={20} />
          <span className="font-label-sm text-label-sm mt-1">설정</span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
