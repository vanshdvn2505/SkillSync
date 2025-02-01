import { motion } from 'framer-motion';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

export function Box({ children, className }: BoxProps) {
  return (
    <motion.div
      className={`p-4 rounded-lg shadow-md h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
