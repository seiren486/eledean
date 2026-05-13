import { useState } from 'react';
import type { ProcessedData } from './utils/dataProcessor';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import UploadScreen from './components/UploadScreen';

function App() {
  const [data, setData] = useState<ProcessedData[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleDataProcessed = (processedData: ProcessedData[]) => {
    setData(processedData);
    setIsDataLoaded(true);
  };

  return (
    <Layout>
      {!isDataLoaded ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
          <UploadScreen onProcess={handleDataProcessed} />
        </div>
      ) : (
        <Dashboard data={data} onOpenUpload={() => setIsDataLoaded(false)} />
      )}
    </Layout>
  );
}

export default App;
