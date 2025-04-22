import React from 'react';

const AwardsAccreditations = () => {
  const images = [
    '/images/achievements1.png',
    '/images/achievements2.png',
    '/images/achievements3.png',
    '/images/achievements1.png',
    '/images/achievements2.png',
    '/images/achievements3.png',
    '/images/achievements1.png',
    '/images/achievements2.png',
    '/images/achievements3.png'
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-teal-700">Awards & Accreditations</h2>
        <button className="text-sm text-teal-600 hover:underline">View All</button>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div className="flex space-x-4 animate-slide">
          {images.map((imageUrl, index) => (
            <div key={index} className="flex-shrink-0 w-80 h-64">
              <img 
                src={imageUrl} 
                alt={`Certificate ${index + 1}`} 
                className="w-full h-full object-contain rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsAccreditations;