import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Link 
        to="/" 
        className="flex items-center font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent
                   hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
      >
        <span className="relative">
          TechShop
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 
                          group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300"></span>
        </span>
      </Link>
    </motion.div>
  );
}