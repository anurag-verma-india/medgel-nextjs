// 'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { fetchPolicy} from './fetch_investor';
import { fetchShareholder} from './fetch_investor';

const InvestorRelation = async () => {
  const shareholders = await fetchShareholder();
  const policies = await fetchPolicy();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-teal-600 font-medium">
              Investor Relations
              <div className="h-1 w-24 sm:w-32 lg:w-48 bg-orange-400 mt-2" />
            </h1>
          </div>

          {/* Shareholders Section */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8 mb-4">
            <h2 className="text-xl sm:text-2xl text-teal-600 font-medium mb-4">
             Annual Returns
            </h2>
            <div className="space-y-3">
              {shareholders.section_detail ? (
                shareholders.section_detail.map((item, index) => (
                  <div key={index} className="block bg-white rounded-lg p-3 shadow-sm">
                    <h3 className="text-orange-400">{shareholders.section1_title}</h3>
                    <ul className="list-disc pl-6">
                      {item.section_detail.map((detail, detailIndex) => (
                        <li key={detailIndex}>
                          <a href={detail.section1_link} className="text-blue-600 underline">
                            {detail.section1_link_title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No  data available.</p>
              )}
            </div>
          </div>

          {/* Policies Section */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl text-teal-600 font-medium mb-4">Policies</h2>
            <div className="space-y-3">
              {policies.section_info ? (
                policies.section_info.map((info, index) => (
                  <div key={index} className="block bg-white rounded-lg p-3 shadow-sm">
                    <h3 className="text-orange-400">{policies.section2_title}</h3>
                    <ul className="list-disc pl-6">
                      <li>
                        <a href={info.section2_link} className="text-blue-600 underline">
                          {info.section2_link_title}
                        </a>
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <p>No data available.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestorRelation;



