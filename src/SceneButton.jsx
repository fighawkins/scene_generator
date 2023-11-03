import React, { useState } from 'react';

const SceneButton = ({ apiEndpoint }) => {
  const [sceneInfo, setSceneInfo] = useState(null);

  const fetchSceneInfo = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setSceneInfo(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <button
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold uppercase rounded-lg shadow-md hover:bg-gradient-to-l hover:from-teal-500 hover:to-blue-600 transition duration-300 ease-in-out"
        onClick={fetchSceneInfo}
      >
        Generate Scene
      </button>
      {sceneInfo && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">{sceneInfo.title}</h2>
          <p>{sceneInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default SceneButton;