import React, { useState } from 'react'

function CreateWindow({isOpen,close}) {
    return (
        isOpen&&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Create New Family Tree</h3>
                <p className="text-gray-600 mb-6">Start with yourself or another family member as the root of your tree.</p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tree Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="My Family Tree" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Your Name" />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button 
                    onClick={() => close(false)} 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Create Tree
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateWindow