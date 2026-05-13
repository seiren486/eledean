import React, { useState, useRef } from 'react';
import { processFiles } from '../utils/dataProcessor';
import { UploadCloud, FileText, AlertCircle, X } from 'lucide-react';

interface Props {
  onProcess: (data: any[]) => void;
  onClose: () => void;
}

const FileUploadModal: React.FC<Props> = ({ onProcess, onClose }) => {
  const [salesFile, setSalesFile] = useState<File | null>(null);
  const [advFile, setAdvFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!salesFile || !advFile) {
      setError('두 파일(매출 현황, 광고주 관리)을 모두 업로드해주세요.');
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

  const FileDropzone = ({ 
    label, 
    file, 
    setFile 
  }: { 
    label: string, 
    file: File | null, 
    setFile: (f: File | null) => void 
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div 
        className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <input 
          type="file" 
          accept=".csv, .tsv, .txt" 
          className="hidden" 
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
              setError(null);
            }
          }}
        />
        {file ? (
          <>
            <FileText className="text-primary mb-2" size={32} />
            <p className="font-body-md text-on-surface font-semibold text-center">{file.name}</p>
            <button 
              className="mt-2 text-secondary text-label-sm underline"
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
            >
              다시 선택
            </button>
          </>
        ) : (
          <>
            <UploadCloud className="text-secondary mb-2" size={32} />
            <p className="font-body-md text-secondary text-center">{label}</p>
            <p className="font-label-sm text-tertiary mt-1">클릭하여 파일 업로드 (CSV/TSV)</p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface">
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">데이터 업로드</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface-container rounded-full transition-colors text-secondary">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-6 flex-1 overflow-y-auto">
          {error && (
            <div className="bg-error-container text-on-error-container p-3 rounded-lg flex items-center gap-2 font-body-md">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <FileDropzone label="1. 매출 파일 (전시입찰광고매출현황)" file={salesFile} setFile={setSalesFile} />
          <FileDropzone label="2. 광고주 파일 (광고주관리)" file={advFile} setFile={setAdvFile} />
        </div>
        
        <div className="px-6 py-4 border-t border-outline-variant bg-surface flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-label-sm font-bold text-secondary hover:bg-surface-container transition-colors"
          >
            건너뛰기 (빈 화면)
          </button>
          <button 
            onClick={handleProcess}
            disabled={isProcessing || !salesFile || !advFile}
            className="px-6 py-2 rounded-lg font-label-sm font-bold bg-primary text-white hover:bg-surface-tint transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isProcessing ? '처리 중...' : '데이터 분석 시작'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
