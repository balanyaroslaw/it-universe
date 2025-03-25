import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import MainMenu from '../shared/components/menu.component';
import CreateWindow from '../shared/windows/create.window';
function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center px-6 py-12">
      <div className="flex flex-col items-center space-y-4 mb-12">
        <img src={Logo} alt="AncTree Logo" className="w-48 h-48 md:w-58 md:h-90" />
        <h1 className="text-4xl font-bold text-gray-800">AncTree</h1>
        <p className="text-gray-600 text-lg">Discover your roots, connect your branches</p>
      </div>
      
      <div className="w-full max-w-6xl">
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to Your Family Tree</h2>
          <p className="text-gray-600 text-lg mb-6">
            Create, explore, and share your family history with our intuitive tools. 
            Add family members, upload photos, and discover connections across generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button 
              onClick={() => setShowModal(true)} 
              className="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-700 flex-1 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Start New Tree
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 text-lg rounded-lg hover:bg-gray-300 flex-1 flex items-center justify-center">
              Find relatives
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureCard 
            title="Easy Member Management" 
            description="Add family members with personal details, photos, and stories to create a rich family history."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            }
          />
          <FeatureCard 
            title="Interactive Visualizations" 
            description="View your family tree in multiple formats: traditional tree, timeline, or geographic map."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
              </svg>
            }
          />
          <FeatureCard 
            title="Collaborative Editing" 
            description="Invite family members to contribute to your tree, ensuring a comprehensive family history."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            }
          />
        </div>
        
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Getting Started</h2>
          <div className="space-y-6">
            <StepItem 
              number="1" 
              title="Create Your Tree" 
              description="Start by clicking the 'Start New Tree' button and entering your information as the first family member."
            />
            <StepItem 
              number="2" 
              title="Add Family Members" 
              description="Connect parents, children, siblings and extended family members to build your tree."
            />
            <StepItem 
              number="3" 
              title="Add Details & Media" 
              description="Enrich your family history with dates, locations, photos, and personal stories."
            />
            <StepItem 
              number="4" 
              title="Share & Collaborate" 
              description="Invite family members to view and contribute to your growing family tree."
            />
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-gray-600">
        <p>© 2025 AncTree. All rights reserved.</p>
      </div>
      <CreateWindow isOpen={showModal} close={setShowModal}/>
    </div>
    </>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepItem({ number, title, description }) {
  return (
    <div className="flex items-start">
      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
        {number}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default Dashboard;