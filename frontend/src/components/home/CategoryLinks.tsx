import CategoryColumn from './CategoryColumn';

export default function CategoryLinks() {
  const categories = [
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

  return (
    <div className="category-links mb-12">
      <h2 className="text-2xl font-bold mb-6">Популярные категории</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryColumn 
            key={index} 
            title={category.title} 
            items={category.items} 
          />
        ))}
      </div>
    </div>
  );
}