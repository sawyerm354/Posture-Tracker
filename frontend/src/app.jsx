
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadFormPage from '/src/components/UploadForm';



function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-6">
        
         <BrowserRouter>
          <Routes>
            <Route path="/UploadForm" element={<UploadFormPage />} />
            <Route path="/" element={<UploadFormPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

  export default App;