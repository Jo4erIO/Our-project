import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPercent, FiSettings, FiGift, FiBarChart2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function LeftPanel({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const groups = [
    {
      title: "Персональный подбор",
      items: ["Снаряды", "Материнские платы", "Мониторы", "Корпуса", "Процессоры"]
    },
    {
      title: "Сезонные товары",
      items: ["Вентиляторы", "Мобильные кондиционеры", "Леска", "Транмера безопасные", "Транмеры электрические"]
    },
    {
      title: "Акции и скидки",
      items: ["Ноутбуки", "Кронштейны для телевизоров", "Наушники и гарнитуры", "Планшеты", "Проекторы"]
    },
    {
      title: "Умный дом",
      items: ["Датчики", "Отопление", "Центры управления", "Розетки", "Выключатели"]
    }
  ];

  const [isOpenGroups, setIsOpenGroups] = useState(groups.map(() => true));
  
  const additionalItems = [
    { name: "Акции", icon: <FiPercent />, path: "/sales" },
    { name: "Собрать ПК", icon: <FiSettings />, path: "/pc-builder" },
    { name: "Подарочные карты", icon: <FiGift />, path: "/gift-cards" },
    { name: "Рейтинг сборок ПК", icon: <FiBarChart2 />, path: "/pc-builds-rating" }
  ];

  const toggleGroup = (index: number) => {
    const newOpenGroups = [...isOpenGroups];
    newOpenGroups[index] = !newOpenGroups[index];
    setIsOpenGroups(newOpenGroups);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/10 z-40" // Убрали блюр, оставили только затемнение
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 z-50 shadow-xl"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="p-5 h-full flex flex-col">
              <div className="flex justify-end mb-4">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto">
                {groups.map((group, index) => (
                  <div key={index} className="mb-6">
                    <button
                      className="flex justify-between items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => toggleGroup(index)}
                    >
                      <span className="font-medium text-left">{group.title}</span>
                      <span>{isOpenGroups[index] ? '−' : '+'}</span>
                    </button>
                    
                    {isOpenGroups[index] && (
                      <ul className="mt-2 pl-4 space-y-2">
                        {group.items.map((item, idx) => (
                          <li key={idx}>
                            <a
                              href="#"
                              className="block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <ul className="space-y-2">
                  {additionalItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.path}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={onClose}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}