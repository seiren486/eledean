import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, AlertCircle, Trash2, BarChart2 } from 'lucide-react';
import { processFiles } from '../utils/dataProcessor';

interface Props {
  onProcess: (data: any[]) => void;
}

const UploadScreen: React.FC<Props> = ({ onProcess }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles].slice(0, 2)); // 최대 2개만 허용
      setError(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length < 2) {
      setError('매출 파일과 광고주 파일(총 2개)을 모두 업로드해주세요.');
      return;
    }

    let salesFile: File | null = null;
    let advFile: File | null = null;

    // 파일 이름으로 유추
    files.forEach(f => {
      if (f.name.includes('매출')) salesFile = f;
      else if (f.name.includes('광고주')) advFile = f;
    });

    // 이름으로 유추 실패 시 순서대로 할당
    if (!salesFile && !advFile) {
      salesFile = files[0];
      advFile = files[1];
    } else if (!salesFile && advFile) {
      salesFile = files.find(f => f !== advFile) || null;
    } else if (salesFile && !advFile) {
      advFile = files.find(f => f !== salesFile) || null;
    }

    if (!salesFile || !advFile) {
      setError('파일을 식별할 수 없습니다. 다시 시도해주세요.');
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
    <div className="w-full max-w-[800px] flex flex-col items-center gap-element-gap mx-auto animate-in fade-in duration-500 pt-8">
      {/* Simplified Layout: Title and Upload Zone only */}
      <div className="text-center mb-4">
        <h2 className="font-headline-xl text-headline-xl text-on-surface">데이터 업로드</h2>
        <p className="font-body-lg text-secondary mt-2">매출 분석을 시작하기 위해 파일을 선택해주세요. (매출, 광고주 파일 2개)</p>
      </div>

      {error && (
        <div className="w-full bg-error-container text-on-error-container p-4 rounded-xl flex items-center gap-3 font-body-md shadow-sm">
          <AlertCircle size={20} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Zone */}
      <div 
        className="w-full bg-white rounded-xl border-2 border-dashed border-outline-variant p-12 md:p-24 flex flex-col items-center justify-center gap-6 hover:border-primary hover:bg-surface-container-low transition-all group cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <input 
          type="file" 
          accept=".csv,.tsv,.txt" 
          multiple
          className="hidden" 
          ref={inputRef}
          onChange={handleFileChange}
        />
        <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:scale-110 transition-transform">
          <UploadCloud className="text-5xl text-primary" size={48} />
        </div>
        <div className="text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">분석할 파일을 선택하거나 드래그하세요</h2>
          <p className="font-body-lg text-secondary">Excel, CSV 형식 파일 2개 (매출현황, 광고주관리) 동시 선택 가능</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border border-outline-variant">
          <FileText className="text-secondary text-sm" size={16} />
          <span className="font-label-sm text-secondary">최대 50MB까지 지원</span>
        </div>
      </div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="w-full flex flex-col gap-2 mt-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-outline-variant shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-surface-container-high rounded-lg">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-body-md font-bold text-on-surface">{file.name}</p>
                  <p className="font-label-sm text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                className="p-2 text-secondary hover:text-error hover:bg-error-container rounded-full transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      <button 
        onClick={handleProcess}
        disabled={isProcessing || files.length < 2}
        className="mt-8 px-12 py-4 bg-primary text-on-primary font-headline-md rounded-xl hover:bg-primary-container shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:cursor-not-allowed"
      >
        <BarChart2 size={24} />
        <span>{isProcessing ? '처리 중...' : 'Analyze Data'}</span>
      </button>
    </div>
  );
};

export default UploadScreen;
