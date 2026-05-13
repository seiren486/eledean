import React, { useMemo, useState } from 'react';
import type { ProcessedData } from '../utils/dataProcessor';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  data: ProcessedData[];
  onOpenUpload: () => void;
}

const DashboardResults: React.FC<Props> = ({ data, onOpenUpload }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [filterMarketer, setFilterMarketer] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'7' | '30'>('7');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 31;

  // 1. KPI 집계
  const totalRevenue = useMemo(() => data.reduce((acc, curr) => acc + curr.totalRevenue, 0), [data]);
  const totalSettled = useMemo(() => data.reduce((acc, curr) => acc + curr.settledRevenue, 0), [data]);
  
  const targetRevenue = 12000000; // 목표 1200만
  const progressPercent = Math.min(100, (totalRevenue / targetRevenue) * 100);

  // 2. 팀 및 담당자별 집계
  const marketerStats = useMemo(() => {
    const stats: Record<string, { team: string; marketerName: string; revenue: number }> = {};
    data.forEach(item => {
      const key = item.marketerId;
      if (!stats[key]) {
        stats[key] = { team: item.team, marketerName: item.marketerName, revenue: 0 };
      }
      stats[key].revenue += item.totalRevenue;
    });
    return Object.values(stats).sort((a, b) => b.revenue - a.revenue);
  }, [data]);

  // 3. 일자별 트렌드 집계
  const dailyTrend = useMemo(() => {
    const trend: Record<string, number> = {};
    data.forEach(item => {
      const d = item.date.substring(5); // MM-DD
      trend[d] = (trend[d] || 0) + item.totalRevenue;
    });
    let sorted = Object.entries(trend)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name));
    
    // 필터: 최근 7일 또는 30일
    if (dateRange === '7') {
      sorted = sorted.slice(-7);
    } else {
      sorted = sorted.slice(-30);
    }
    return sorted;
  }, [data, dateRange]);

  // 4. 상세 매출 내역 필터링 및 페이징
  const uniqueTeams = useMemo(() => Array.from(new Set(data.map(item => item.team))).sort(), [data]);
  const uniqueMarketers = useMemo(() => {
    let marketers = data;
    if (filterTeam !== 'all') {
      marketers = marketers.filter(item => item.team === filterTeam);
    }
    return Array.from(new Set(marketers.map(item => item.marketerName))).sort();
  }, [data, filterTeam]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchSearch = item.advertiserId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.marketerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTeam = filterTeam === 'all' || item.team === filterTeam;
      const matchMarketer = filterMarketer === 'all' || item.marketerName === filterMarketer;
      return matchSearch && matchTeam && matchMarketer;
    });
  }, [data, searchTerm, filterTeam, filterMarketer]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* 데이터 재업로드 버튼 (디자인 외 편의성 추가) */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={onOpenUpload}
          className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-label-sm font-bold hover:bg-secondary hover:text-on-secondary transition-colors"
        >
          데이터 재업로드
        </button>
      </div>

      {/* KPI Card Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-element-gap mb-8">
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Overall Performance</span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mt-1">총 누적 매출 현황</h3>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-4xl font-extrabold text-primary">{totalRevenue.toLocaleString()}</span>
                <span className="text-lg font-bold text-on-surface ml-1">원</span>
              </div>
              <div className="text-right">
                <span className="block text-secondary font-label-sm text-label-sm">목표 금액: {targetRevenue.toLocaleString()} 원</span>
                <span className="font-bold text-primary">{progressPercent.toFixed(1)}% 달성</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-4 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="mt-2 text-right">
              <span className="text-secondary font-label-sm text-label-sm">정산광고비: {totalSettled.toLocaleString()} 원</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-2" data-icon="trending_up" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
          <span className="font-label-sm text-label-sm text-secondary">처리된 데이터 건수</span>
          <div className="font-headline-xl text-headline-xl text-primary mt-2">{data.length.toLocaleString()}</div>
          <p className="font-body-md text-body-md text-secondary mt-1">성공적으로 분석 완료</p>
        </div>
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-element-gap mb-8">
        {/* View 1: Revenue by Team & Marketer */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">팀 및 담당자별 매출 실적</h3>
            <button className="text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
            </button>
          </div>
          <div className="overflow-hidden border border-outline-variant rounded-lg flex-1">
            <div className="max-h-[300px] overflow-y-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-surface-container-low z-10 border-b border-outline-variant">
                  <tr>
                    <th className="px-4 py-2 font-label-sm text-label-sm text-secondary">팀 (Team)</th>
                    <th className="px-4 py-2 font-label-sm text-label-sm text-secondary">담당자 (Marketer)</th>
                    <th className="px-4 py-2 font-label-sm text-label-sm text-secondary text-right">매출 실적 (Revenue)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {marketerStats.map((stat, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-4 py-2 font-body-md text-body-md">{stat.team}</td>
                      <td className="px-4 py-2 font-body-md text-body-md">{stat.marketerName}</td>
                      <td className="px-4 py-2 font-body-md text-body-md text-right font-bold text-primary">
                        {stat.revenue.toLocaleString()} 원
                      </td>
                    </tr>
                  ))}
                  {marketerStats.length === 0 && (
                    <tr><td colSpan={3} className="text-center py-4 text-secondary">데이터가 없습니다.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* View 2: Daily Revenue Trend */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">일간 매출 추이</h3>
            <div className="flex bg-surface-container rounded-lg p-1">
              <button 
                onClick={() => setDateRange('7')}
                className={`px-3 py-1 rounded shadow-sm font-label-sm text-label-sm transition-colors ${dateRange === '7' ? 'bg-white text-on-surface' : 'text-secondary hover:bg-white/50'}`}
              >
                7일
              </button>
              <button 
                onClick={() => setDateRange('30')}
                className={`px-3 py-1 rounded shadow-sm font-label-sm text-label-sm transition-colors ${dateRange === '30' ? 'bg-white text-on-surface' : 'text-secondary hover:bg-white/50'}`}
              >
                30일
              </button>
            </div>
          </div>
          {/* Recharts Visualization */}
          <div className="h-64 relative w-full">
            {dailyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyTrend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edeeef" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#555f6d', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#555f6d', fontSize: 12}} tickFormatter={(val: number) => `${(val/10000).toFixed(0)}만`} />
                  <Tooltip 
                    formatter={(value: any) => [`${Number(value).toLocaleString()} 원`, '매출']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e1e3e4', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#b70011" strokeWidth={3} dot={{r: 4, fill: '#b70011', strokeWidth: 0}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-secondary">
                데이터가 없습니다.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* View 3: Detailed Table */}
      <section className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-headline-md text-headline-md text-on-surface">상세 매출 내역</h3>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <select 
              className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 text-body-md text-on-surface w-full md:w-32 outline-none focus:border-primary transition-colors"
              value={filterTeam}
              onChange={e => {
                setFilterTeam(e.target.value);
                setFilterMarketer('all');
                setCurrentPage(1);
              }}
            >
              <option value="all">전체 팀</option>
              {uniqueTeams.map(team => <option key={team} value={team}>{team}</option>)}
            </select>
            
            <select 
              className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 text-body-md text-on-surface w-full md:w-32 outline-none focus:border-primary transition-colors"
              value={filterMarketer}
              onChange={e => {
                setFilterMarketer(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">전체 담당자</option>
              {uniqueMarketers.map(marketer => <option key={marketer} value={marketer}>{marketer}</option>)}
            </select>

            <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-lg px-3 py-1.5 w-full md:w-64 focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined text-secondary text-lg" data-icon="search">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-body-md w-full p-0 outline-none" 
                placeholder="검색..." 
                type="text"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary">날짜(Date)</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary">팀(Team)</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary">담당자(Marketer)</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary">광고주 ID(Advertiser)</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary text-right">전체매출</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary text-right">정산매출</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {currentData.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-2 font-body-md text-body-md text-secondary">{row.date}</td>
                  <td className="px-6 py-2 font-body-md text-body-md">{row.team}</td>
                  <td className="px-6 py-2 font-body-md text-body-md">{row.marketerName}</td>
                  <td className="px-6 py-2 font-body-md text-body-md font-mono text-primary">{row.advertiserId}</td>
                  <td className="px-6 py-2 font-body-md text-body-md text-right font-bold">{row.totalRevenue.toLocaleString()}</td>
                  <td className="px-6 py-2 font-body-md text-body-md text-right">{row.settledRevenue.toLocaleString()}</td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-secondary">
                    검색 결과가 없거나 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 bg-surface-container-low flex items-center justify-between border-t border-outline-variant">
          <span className="font-label-sm text-label-sm text-secondary">
            Showing {(currentPage - 1) * itemsPerPage + (filteredData.length > 0 ? 1 : 0)}-{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 border border-outline-variant rounded hover:bg-white transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm" data-icon="chevron_left">chevron_left</span>
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = currentPage;
              if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;
              
              if (pageNum < 1 || pageNum > totalPages) return null;

              return (
                <button 
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-2.5 py-0.5 rounded font-label-sm text-label-sm ${
                    currentPage === pageNum 
                      ? 'bg-primary text-white' 
                      : 'border border-outline-variant hover:bg-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 border border-outline-variant rounded hover:bg-white transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardResults;
