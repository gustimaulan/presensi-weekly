import React from 'react';

const SkeletonTable = () => {
  const skeletonRows = Array(5).fill(null); // Adjust the number of skeleton rows

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-[#2C9CDA] text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">
              <div className="h-4 bg-gray-300 rounded animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-[length:200%_100%]"></div>
            </th>
            <th className="py-3 px-6 text-left">
              <div className="h-4 bg-gray-300 rounded animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-[length:200%_100%]"></div>
            </th>
            <th className="py-3 px-6 text-left">
              <div className="h-4 bg-gray-300 rounded animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-[length:200%_100%]"></div>
            </th>
            <th className="py-3 px-6 text-left">
              <div className="h-4 bg-gray-300 rounded animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-[length:200%_100%]"></div>
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {skeletonRows.map((_, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-[#E6F3FA]' : 'bg-white'} border-b border-gray-200 hover:bg-gray-100`}
            >
              <td className="py-3 px-6">
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-[length:200%_100%]"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 bg-gray-300 rounded w-1/2 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-[length:200%_100%]"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 bg-gray-300 rounded w-1/4 animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-[length:200%_100%]"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 bg-gray-300 rounded w-full animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-[length:200%_100%]"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
