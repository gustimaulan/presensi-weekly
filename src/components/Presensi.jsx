import React, { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const RANGE = 'Presensi_View!A1:E';

const Presensi = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 1, direction: 'ascending' }); // Default to column B (index 1) ascending
  
    useEffect(() => {
      const fetchData = async () => {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        
        try {
          const response = await fetch(url);
          const result = await response.json();
  
          if (result.values && result.values.length > 0) {
            setData(result.values);
            setFilteredData(result.values.slice(1));  // Skip the header row for filtered data
          } else {
            console.log('No data found.');
          }
        } catch (error) {
          console.error("Error fetching data:", error);
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
  
      // Sort data after filtering
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
        <div className='flex items-center justify-between py-4'>
      <h1 className="text-2xl font-bold text-center">Presensi Pekan Ini</h1>

      <div>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#2C9CDA] text-white uppercase text-sm leading-normal">
              {data[0] && data[0].map((header, index) => (
                <th
                  key={index}
                  className="py-2 px-2 text-left cursor-pointer"
                  onClick={() => handleSort(index)}
                >
                  {header}
                  {sortConfig.key === index && (
                    <span className="ml-2">
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`divide-x + ${rowIndex % 2 === 0 ? 'bg-[#E6F3FA]' : 'bg-white'} border-b border-gray-200 hover:bg-gray-100`}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2 px-2 text-left whitespace-nowrap">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Presensi;
