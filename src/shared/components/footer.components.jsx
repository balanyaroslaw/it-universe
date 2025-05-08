import React from 'react';
import { useLocation } from 'react-router-dom'
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const {pathname} = location;
  return (
    pathname!=='/tree'&&<div className="w-full mx-auto px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 bottom-0">
        <div className="mt-1">
            <div className="col-span-1">
                <h4 className="font-semibold mb-1 mt-2">Quick Links</h4>
                <ul className="text-sm flex gap-5">
                    <li className="hover:text-white cursor-pointer">Home</li>
                    <li className="hover:text-white cursor-pointer">Create Tree</li>
                    <li className="hover:text-white cursor-pointer">Templates</li>
                    <li className="hover:text-white cursor-pointer">Import Data</li>
                    <li className="hover:text-white cursor-pointer">Export Tree</li>
                </ul>
            </div>
        </div>
        
        <div className="mt-1 pt-1 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {currentYear} FamilyTree. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-400">
                <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer">Terms of Service</span>
                <span className="hover:text-white cursor-pointer">Cookie Policy</span>
            </div>
        </div>
    </div>
  );
};

export default Footer;