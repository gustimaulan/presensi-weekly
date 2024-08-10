import React, { useEffect, useState } from 'react';
import SkeletonTable from './SkeletonTable'; // Import the SkeletonTable component

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const RANGE = 'Presensi_VIew!A1:E';

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 1, direction: 'ascending' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.values && result.values.length > 0) {
          setData(result.values);
          setFilteredData(result.values.slice(1));
        } else {
          console.log('No data found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data.slice(1); // Skip header row

    if (searchTerm) {
      filtered = filtered.filter(row =>
        row.some(cell => cell.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sortConfig.key !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(filtered);
  }, [searchTerm, sortConfig, data]);

  const handleSort = (columnIndex) => {
    let direction = 'ascending';
    if (
      sortConfig.key === columnIndex &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[columnIndex] < b[columnIndex]) return direction === 'ascending' ? -1 : 1;
      if (a[columnIndex] > b[columnIndex]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key: columnIndex, direction });
    setFilteredData(sortedData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Google Sheets Data</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <SkeletonTable />
        ) : (
          <>
            {filteredData.length === 0 ? (
              <div className="text-center py-10 text-xl font-semibold">
                No data found.
              </div>
            ) : (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-[#2C9CDA] text-white uppercase text-sm leading-normal">
                    {Array.isArray(data[0]) && data[0].map((header, index) => (
                      <th
                        key={index}
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() => handleSort(index)}
                      >
                        <div className="flex items-center">
                          {header}
                          {sortConfig.key === index && (
                            <span className="ml-2">
                              {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {filteredData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`${rowIndex % 2 === 0 ? 'bg-[#E6F3FA]' : 'bg-white'} border-b border-gray-200 hover:bg-gray-100`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="py-3 px-6 text-left whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
