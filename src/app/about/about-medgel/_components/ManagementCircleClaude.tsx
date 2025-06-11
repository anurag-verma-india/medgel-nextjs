import React from 'react';
import "./ManagementCircleClaude.css";

const ManagementCircleClaude = () => {
  const management = [
    {
      name: 'Mr. R C Mittal',
      position: 'Chairman',
      imageUrl: '/images/chairman.png'
    },
    {
      name: 'Mr. Praveen Nalwaya',
      position: 'Director',
      imageUrl: '/images/Mr.Praveen Malwaya Director.png'
    },
    {
      name: 'Mr. Alok K. Garg',
      position: 'Director',
      imageUrl: '/images/Mr.Alok K. Garg Director.png'
    },
    {
      name: 'Dr. Shashi Kant Sharma',
      position: 'Director',
      imageUrl: '/api/placeholder/150/150'
    }
  ];

  return (
    <div className="management-container">
      <div className="circle-container">
        {/* Center Text */}
        <div className="center-text">
          <h2>Management</h2>
          <p>at Medgel</p>
        </div>

        {/* Decorative Circle */}
        <div className="decorative-circle"></div>

        {/* Management Cards */}
        {management.map((person, index) => {
          const angle = (index * 360) / management.length;
          const radius = 42; 
          
          // Calculate position around the circle
          const top = 50 - radius * Math.cos((angle - 90) * (Math.PI / 180));
          const left = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));

          return (
            <div
              key={person.name}
              className="management-card"
              style={{
                top: `${top}%`,
                left: `${left}%`,
              }}
            >
              <div className="card-content">
                <div className="image-container">
                  <img
                    src={person.imageUrl}
                    alt={person.name}
                  />
                </div>
                <h3>{person.name}</h3>
                <p>{person.position}</p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
  );
};
export default ManagementCircleClaude;