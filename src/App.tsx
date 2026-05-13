import { useState } from 'react';
import type { ProcessedData } from './utils/dataProcessor';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import FileUploadModal from './components/FileUploadModal';

function App() {
  const [data, setData] = useState<ProcessedData[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(true);

  const handleDataProcessed = (processedData: ProcessedData[]) => {
    setData(processedData);
    setIsUploadModalOpen(false);
  };

  return (
    <Layout>
      {isUploadModalOpen && (
        <FileUploadModal 
          onProcess={handleDataProcessed} 
          onClose={() => setIsUploadModalOpen(false)} 
        />
      )}
      
      <Dashboard data={data} onOpenUpload={() => setIsUploadModalOpen(true)} />
    </Layout>
  );
}

export default App;
