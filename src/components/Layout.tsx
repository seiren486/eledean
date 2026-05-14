import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  showDownload?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showDownload }) => {
  const handleDownload = () => {
    // 1. 현재 문서 복제
    const htmlClone = document.documentElement.cloneNode(true) as HTMLElement;
    
    // 2. 스크립트 제거 (정적인 상태로 고정)
    htmlClone.querySelectorAll('script').forEach(s => s.remove());
    
    // 3. UI 요소 중 불필요한 것들 제거 (다운로드 버튼, 데이터 재업로드 버튼 등)
    htmlClone.querySelectorAll('#download-button, .download-exclude').forEach(el => el.remove());

    // 4. 스타일 캡처 (모든 CSS 규칙 수집)
    let combinedStyles = '';
    const head = htmlClone.querySelector('head') || htmlClone.appendChild(document.createElement('head'));
    
    // 기존 head 내부의 스타일/링크 정리 (중복 방지)
    head.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => el.remove());

    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const rules = Array.from(sheet.cssRules);
        for (const rule of rules) {
          combinedStyles += rule.cssText + '\n';
        }
      } catch (e) {
        // CORS 제한으로 읽을 수 없는 외부 스타일시트의 경우 link 태그로 복제
        if (sheet.href) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = sheet.href;
          head.appendChild(link);
        }
      }
    }

    // 수집된 모든 스타일을 하나의 style 태그로 삽입
    const styleTag = document.createElement('style');
    styleTag.innerHTML = combinedStyles;
    head.appendChild(styleTag);

    // 폰트 및 아이콘 관련 링크 명시적 보존
    document.querySelectorAll('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"], link[href*="material-symbols-outlined"]').forEach(link => {
      head.appendChild(link.cloneNode(true));
    });

    // 5. HTML 파일 생성 및 다운로드
    // DOCTYPE 명시 및 전체 HTML 문자열 생성
    const blob = new Blob(['<!DOCTYPE html>\n' + htmlClone.outerHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
          
          {showDownload && (
            <div className="mt-6">
              <button 
                id="download-button"
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-primary-hover hover:shadow-lg transition-all active:scale-[0.98] group"
              >
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform" data-icon="download">download</span>
                <span>보고서 다운로드</span>
              </button>
              <p className="mt-2 text-[11px] text-secondary text-center">현재 분석 페이지를 HTML 파일로 저장합니다.</p>
            </div>
          )}
        </div>
        <nav className="flex flex-col gap-2">
          {/* Menu items removed as requested */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 min-h-screen flex flex-col items-center justify-start md:justify-center p-margin-mobile md:p-margin-desktop">
        {children}
      </main>

      {/* BottomNavBar (Visible on Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-surface/80 backdrop-blur-md border-t border-outline-variant shadow-lg">
        {/* Menu items removed as requested */}
      </nav>
    </div>
  );
};

export default Layout;
