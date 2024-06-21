import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SelectedValueContext } from '../context/SelectedValueContext';

interface Option {
    projectid: number;
    name: string;
    }


const Topbar: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const { selectedValue, setSelectedValue } = useContext(SelectedValueContext);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/projects`);
        setOptions(response.data);
        if (response.data.length > 0) {
            setSelectedValue(response.data[0].projectid); // Selecciona automáticamente el primer valor
          }
      } catch (error) {
        console.error('Error fetching options', error);
      }
    };
    fetchOptions();
  }, [setSelectedValue]);

  return (
    <div className="topbar flex justify-center py-4 bg-white">
      <select 
      className="block w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      value={selectedValue} 
      onChange={(e) => setSelectedValue(e.target.value)}>
        {options.map(option => (
          <option key={option.projectid} value={option.projectid}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Topbar;
