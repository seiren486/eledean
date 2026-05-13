import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary" data-icon="analytics">analytics</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface whitespace-nowrap">11번가 전시입찰광고 매출현황</h1>
        </div>
      </header>

      {/* NavigationDrawer (Hidden on Mobile) */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-72 p-4 gap-element-gap bg-surface-container-low border-r border-outline-variant">
        <div className="px-4 py-6">
          <h2 className="font-headline-md text-headline-md font-black text-primary">광고 분석 시스템</h2>
        </div>
        <nav className="flex flex-col gap-2">
          <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors" href="#">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span className="font-body-md">대시보드</span>
          </a>
          <a className="flex items-center gap-3 p-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold transition-transform scale-[0.98]" href="#">
            <span className="material-symbols-outlined" data-icon="query_stats">query_stats</span>
            <span className="font-body-md">매출 분석</span>
          </a>
          <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors" href="#">
            <span className="material-symbols-outlined" data-icon="ads_click">ads_click</span>
            <span className="font-body-md">캠페인 관리</span>
          </a>
          <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors" href="#">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            <span className="font-body-md">시스템 설정</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 min-h-screen flex flex-col items-center justify-start md:justify-center p-margin-mobile md:p-margin-desktop">
        {children}
      </main>

      {/* BottomNavBar (Visible on Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-surface/80 backdrop-blur-md border-t border-outline-variant shadow-lg">
        <a className="flex flex-col items-center justify-center text-secondary" href="#">
          <span className="material-symbols-outlined" data-icon="home">home</span>
          <span className="font-label-sm">홈</span>
        </a>
        <a className="flex flex-col items-center justify-center text-primary font-bold scale-95" href="#">
          <span className="material-symbols-outlined" data-icon="bar_chart">bar_chart</span>
          <span className="font-label-sm">분석</span>
        </a>
        <a className="flex flex-col items-center justify-center text-secondary" href="#">
          <span className="material-symbols-outlined" data-icon="list_alt">list_alt</span>
          <span className="font-label-sm">관리</span>
        </a>
        <a className="flex flex-col items-center justify-center text-secondary" href="#">
          <span className="material-symbols-outlined" data-icon="settings">settings</span>
          <span className="font-label-sm">설정</span>
        </a>
      </nav>
    </div>
  );
};

export default Layout;
