import React from 'react';
import { motion } from 'framer-motion';

interface ResultSectionProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  color: string;
  textColor: string;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ 
  title, 
  items, 
  icon,
  color,
  textColor 
}) => {
  if (items.length === 0) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border border-white/10 p-6 ${color}`}
    >
      <h3 className={`text-2xl font-bold ${textColor} flex items-center gap-3 mb-4`}>
        {icon}
        {title}
        <span className="ml-2 text-lg font-normal text-white/40">({items.length})</span>
      </h3>
      
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-3 ${textColor}`}
          >
            <span className="text-xl mt-1">•</span>
            <span className="text-lg font-medium">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};