import React, { useMemo, useState } from 'react';
import type { ProcessedData } from '../utils/dataProcessor';
import { TrendingUp, MoreVertical, Search } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  data: ProcessedData[];
  onOpenUpload: () => void;
}

const Dashboard: React.FC<Props> = ({ data, onOpenUpload }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. KPI 집계
  const totalRevenue = useMemo(() => data.reduce((acc, curr) => acc + curr.totalRevenue, 0), [data]);
  const totalSettled = useMemo(() => data.reduce((acc, curr) => acc + curr.settledRevenue, 0), [data]);
  
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
      const d = item.date.substring(5); // MM-DD or MM/DD 형식 추출
      trend[d] = (trend[d] || 0) + item.totalRevenue;
    });
    return Object.entries(trend)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  // 4. 상세 매출 내역 필터링
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.advertiserId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.marketerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.team.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">대시보드 요약</h2>
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
            <h3 className="font-headline-lg text-headline-lg text-on-surface mt-1">총 누적 매출 (전체광고비)</h3>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-4xl font-extrabold text-primary">{totalRevenue.toLocaleString()}</span>
                <span className="text-lg font-bold text-on-surface ml-1">KRW</span>
              </div>
              <div className="text-right">
                <span className="block text-secondary font-label-sm text-label-sm">정산광고비: {totalSettled.toLocaleString()} KRW</span>
              </div>
            </div>
            {/* Progress Bar (Mock Target 100M) */}
            <div className="w-full h-4 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (totalRevenue / 100000000) * 100)}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col items-center justify-center text-center">
          <TrendingUp className="text-4xl text-primary mb-2" size={36} />
          <span className="font-label-sm text-label-sm text-secondary">처리된 데이터 건수</span>
          <div className="font-headline-xl text-headline-xl text-primary mt-2">{data.length.toLocaleString()} 건</div>
        </div>
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-element-gap mb-8">
        {/* View 1: Revenue by Team & Marketer */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">팀 및 담당자별 매출 실적</h3>
            <button className="text-secondary hover:text-primary transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="overflow-hidden border border-outline-variant rounded-lg max-h-[300px] overflow-y-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-surface-container-low z-10">
                <tr className="border-b border-outline-variant">
                  <th className="px-4 py-2 font-label-sm text-label-sm text-secondary">팀 (Team)</th>
                  <th className="px-4 py-2 font-label-sm text-label-sm text-secondary">담당자 (Marketer)</th>
                  <th className="px-4 py-2 font-label-sm text-label-sm text-secondary text-right">매출 실적 (Revenue)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {marketerStats.length > 0 ? marketerStats.map((stat, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-4 py-2 font-body-md text-body-md">{stat.team}</td>
                    <td className="px-4 py-2 font-body-md text-body-md">{stat.marketerName}</td>
                    <td className="px-4 py-2 font-body-md text-body-md text-right font-bold text-primary">
                      {stat.revenue.toLocaleString()} KRW
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={3} className="text-center py-4 text-secondary">데이터가 없습니다.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View 2: Daily Revenue Trend */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">일간 매출 추이</h3>
          </div>
          <div className="h-[300px] w-full">
            {dailyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyTrend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edeeef" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#555f6d', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#555f6d', fontSize: 12}} tickFormatter={(val: number) => `${(val/10000).toFixed(0)}만`} />
                  <Tooltip 
                    formatter={(value: any) => [`${Number(value).toLocaleString()} KRW`, '매출']}
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
          <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-lg px-3 py-1.5 w-full md:w-80 focus-within:border-primary transition-colors">
            <Search className="text-secondary text-lg" size={18} />
            <input 
              className="bg-transparent border-none focus:ring-0 text-body-md w-full p-0 outline-none" 
              placeholder="광고주 ID 또는 담당자/팀 검색..." 
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-surface-container-low z-10">
              <tr className="border-b border-outline-variant">
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary">날짜</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary">회원번호</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary">광고주 ID</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary">팀</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary">담당자</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary text-right">전체광고비</th>
                <th className="px-6 py-2.5 font-label-sm text-label-sm text-secondary text-right">정산광고비</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredData.slice(0, 50).map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-2 font-body-md text-body-md text-secondary">{row.date}</td>
                  <td className="px-6 py-2 font-body-md text-body-md font-mono">{row.memberNo}</td>
                  <td className="px-6 py-2 font-body-md text-body-md font-mono text-primary">{row.advertiserId}</td>
                  <td className="px-6 py-2 font-body-md text-body-md">{row.team}</td>
                  <td className="px-6 py-2 font-body-md text-body-md">{row.marketerName}</td>
                  <td className="px-6 py-2 font-body-md text-body-md text-right font-bold">{row.totalRevenue.toLocaleString()}</td>
                  <td className="px-6 py-2 font-body-md text-body-md text-right">{row.settledRevenue.toLocaleString()}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-secondary">
                    검색 결과가 없거나 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Info */}
        <div className="px-6 py-3 bg-surface-container-low flex items-center justify-between border-t border-outline-variant">
          <span className="font-label-sm text-label-sm text-secondary">
            Showing {Math.min(filteredData.length, 50)} of {filteredData.length} results (최대 50건 표시)
          </span>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
