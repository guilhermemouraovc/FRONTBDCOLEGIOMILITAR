import React, { useState } from 'react';
import { ArrowUpDown, Search } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  searchable?: boolean;
  searchKeys?: Array<keyof T>;
}

function Table<T>({ 
  columns, 
  data, 
  keyExtractor,
  searchable = false,
  searchKeys = []
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handle sorting
  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];
      
      if (aValue === bValue) return 0;
      
      const comparison = 
        aValue < bValue ? -1 : 1;
      
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);
  
  // Filter data by search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm || !searchable || searchKeys.length === 0) return sortedData;
    
    return sortedData.filter(item => {
      return searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      });
    });
  }, [sortedData, searchTerm, searchable, searchKeys]);
  
  // Get cell value
  const getCellValue = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    return item[column.accessor] as React.ReactNode;
  };
  
  return (
    <div className="overflow-hidden border border-primary/20 rounded-lg">
      {searchable && (
        <div className="p-3 bg-light border-b border-primary/20">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-dark/60" />
            </div>
            <input
              type="text"
              className="military-input pl-10 w-full"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="military-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="whitespace-nowrap">
                  {column.sortable ? (
                    <button
                      className="flex items-center gap-1 focus:outline-none"
                      onClick={() => typeof column.accessor === 'string' && handleSort(column.accessor)}
                    >
                      {column.header}
                      <ArrowUpDown size={14} />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={keyExtractor(item)}>
                  {columns.map((column, index) => (
                    <td key={index}>{getCellValue(item, column)}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-dark/60">
                  Nenhum dado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;