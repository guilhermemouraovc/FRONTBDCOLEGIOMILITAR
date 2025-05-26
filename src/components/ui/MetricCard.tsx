import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'primary' 
}) => {
  const colorClasses = {
    primary: 'border-primary bg-primary/10',
    secondary: 'border-secondary bg-secondary/10',
    accent: 'border-accent bg-accent/10',
    success: 'border-success bg-success/10',
    warning: 'border-warning bg-warning/10',
    danger: 'border-danger bg-danger/10'
  };

  const iconColorClasses = {
    primary: 'bg-primary text-light',
    secondary: 'bg-secondary text-light',
    accent: 'bg-accent text-dark',
    success: 'bg-success text-light',
    warning: 'bg-warning text-light',
    danger: 'bg-danger text-light'
  };

  return (
    <div className={`card rounded-lg border-l-4 ${colorClasses[color]} p-4 h-full`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-dark/70 text-sm font-medium mb-1">{title}</h3>
          <p className="text-dark text-2xl font-bold">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs ${trend.isPositive ? 'text-success' : 'text-danger'} flex items-center`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                <span className="ml-1 text-dark/60">vs. mês anterior</span>
              </span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${iconColorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;