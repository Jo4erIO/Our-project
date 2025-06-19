import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

interface BreadcrumbItem {
  path: string;
  name: string;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = pathnames.map((path, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const name = decodeURIComponent(path)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    
    return { path: routeTo, name };
  });

  return (
    <nav className="mb-6 text-sm" aria-label="Хлебные крошки">
      <ol className="flex items-center flex-wrap">
        <li>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
            Главная
          </Link>
        </li>
        
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            <FiChevronRight className="mx-2 text-gray-400" size={14} />
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-500 dark:text-gray-400">
                {crumb.name}
              </span>
            ) : (
              <Link 
                to={crumb.path} 
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}