import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, BarChart2, AlertCircle } from 'lucide-react';
import { processFiles } from '../utils/dataProcessor';

interface Props {
  onProcess: (data: any[]) => void;
}

const UploadScreen: React.FC<Props> = ({ onProcess }) => {
  const [salesFile, setSalesFile] = useState<File | null>(null);
  const [advFile, setAdvFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const salesInputRef = useRef<HTMLInputElement>(null);
  const advInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async () => {
    if (!salesFile || !advFile) {
      setError('매출 파일과 광고주 파일을 모두 선택해주세요.');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    try {
      const result = await processFiles(salesFile, advFile);
      onProcess(result);
    } catch (err: any) {
      setError(err.message || '파일 처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-[800px] flex flex-col items-center gap-element-gap mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-4">
        <h2 className="font-headline-xl text-headline-xl text-on-surface">데이터 업로드</h2>
        <p className="font-body-lg text-secondary mt-2">매출 분석을 시작하기 위해 파일을 선택해주세요.</p>
      </div>

      {error && (
        <div className="w-full bg-error-container text-on-error-container p-4 rounded-xl flex items-center gap-3 font-body-md shadow-sm">
          <AlertCircle size={20} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Zones Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales File Zone */}
        <div 
          className="bg-white rounded-xl border-2 border-dashed border-outline-variant p-8 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-surface-container-low transition-all group cursor-pointer shadow-sm relative overflow-hidden"
          onClick={() => salesInputRef.current?.click()}
        >
          <input 
            type="file" 
            accept=".csv,.tsv,.txt" 
            className="hidden" 
            ref={salesInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSalesFile(e.target.files[0]);
                setError(null);
              }
            }}
          />
          <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:scale-110 transition-transform">
            {salesFile ? <FileText className="text-primary" size={32} /> : <UploadCloud className="text-secondary" size={32} />}
          </div>
          <div className="text-center z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-1">매출 파일</h3>
            {salesFile ? (
              <p className="font-body-md text-primary font-bold break-all">{salesFile.name}</p>
            ) : (
              <p className="font-label-sm text-secondary">클릭하여 파일 찾기 (전시입찰광고매출현황)</p>
            )}
          </div>
        </div>

        {/* Advertiser File Zone */}
        <div 
          className="bg-white rounded-xl border-2 border-dashed border-outline-variant p-8 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-surface-container-low transition-all group cursor-pointer shadow-sm relative overflow-hidden"
          onClick={() => advInputRef.current?.click()}
        >
          <input 
            type="file" 
            accept=".csv,.tsv,.txt" 
            className="hidden" 
            ref={advInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setAdvFile(e.target.files[0]);
                setError(null);
              }
            }}
          />
          <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:scale-110 transition-transform">
            {advFile ? <FileText className="text-primary" size={32} /> : <UploadCloud className="text-secondary" size={32} />}
          </div>
          <div className="text-center z-10">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-1">광고주 파일</h3>
            {advFile ? (
              <p className="font-body-md text-primary font-bold break-all">{advFile.name}</p>
            ) : (
              <p className="font-label-sm text-secondary">클릭하여 파일 찾기 (광고주관리)</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={handleProcess}
        disabled={isProcessing || !salesFile || !advFile}
        className="mt-8 px-12 py-4 bg-primary text-on-primary font-headline-md rounded-xl hover:bg-primary-container shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:cursor-not-allowed"
      >
        <BarChart2 size={24} />
        <span>{isProcessing ? '처리 중...' : 'Analyze Data'}</span>
      </button>
    </div>
  );
};

export default UploadScreen;
