import React from 'react';
import SceneButton from './SceneButton'; // Make sure this points to the correct file path
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-start pt-10 items-center">
      <SceneButton apiEndpoint="your-api-endpoint-here" />
    </div>
  );
}

export default App;