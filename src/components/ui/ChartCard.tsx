import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-primary/10 overflow-hidden h-full">
      <div className="bg-primary text-light p-3 font-medium">
        {title}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;