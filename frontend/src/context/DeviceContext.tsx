// src/context/DeviceContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type DeviceType = 'mobile' | 'desktop';

interface DeviceContextType {
  deviceType: DeviceType;
  setDeviceType: (type: DeviceType) => void;
  isMobile: boolean;
  isDesktop: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    // Проверяем localStorage при инициализации
    const savedDeviceType = localStorage.getItem('deviceType') as DeviceType | null;
    return savedDeviceType || (window.innerWidth < 768 ? 'mobile' : 'desktop');
  });

  useEffect(() => {
    // Сохраняем выбор в localStorage
    localStorage.setItem('deviceType', deviceType);
  }, [deviceType]);

  const value = {
    deviceType,
    setDeviceType,
    isMobile: deviceType === 'mobile',
    isDesktop: deviceType === 'desktop'
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};