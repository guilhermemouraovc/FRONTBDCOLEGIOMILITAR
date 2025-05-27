import React from 'react';
import { Edit2Icon, Trash2Icon } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
}

function DataTable<T extends { [key: string]: any }>({ 
  data, 
  columns, 
  onEdit, 
  onDelete,
  loading 
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-primary/10 mb-4 rounded"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-primary/5 mb-2 rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="military-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            {(onEdit || onDelete) && <th className="w-24">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} 
                className="text-center py-4"
              >
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : item[column.accessor]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td>
                    <div className="flex gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1 text-primary hover:text-secondary transition-colors"
                          title="Editar"
                        >
                          <Edit2Icon size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="p-1 text-danger hover:text-danger/70 transition-colors"
                          title="Excluir"
                        >
                          <Trash2Icon size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;