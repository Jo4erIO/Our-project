import axios, { AxiosError, AxiosResponse } from 'axios';

// Явно указываем URL бэкенда
const API_URL = '/auth';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    console.log('Sending registration request to:', `${API_URL}/register`);
    
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_URL}/register`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('Registration response:', response.data);
    
    if (!response.data.token) {
      throw new Error('Server did not return authentication token');
    }

    // Сохраняем токен и данные пользователя
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error: unknown) {
    let errorMessage = 'Registration failed';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      console.error('Axios error details:', {
        config: axiosError.config,
        request: axiosError.request,
        response: axiosError.response
      });
      
      if (axiosError.response) {
        // Проверяем различные форматы ответов об ошибках
        if (typeof axiosError.response.data === 'string') {
          errorMessage = axiosError.response.data;
        } else if (typeof axiosError.response.data === 'object' && axiosError.response.data !== null) {
          errorMessage = (axiosError.response.data as any)?.message || 
                         (axiosError.response.data as any)?.error || 
                         JSON.stringify(axiosError.response.data);
        }
      } else if (axiosError.request) {
        errorMessage = 'No response received from server';
      } else {
        errorMessage = axiosError.message || 'Axios request error';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Registration API error:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    console.log('Sending login request to:', `${API_URL}/login`);
    
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('Login response:', response.data);
    
    if (!response.data.token) {
      throw new Error('Server did not return authentication token');
    }

    // Сохраняем токен и данные пользователя
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error: unknown) {
    let errorMessage = 'Login failed';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      console.error('Axios error details:', {
        config: axiosError.config,
        request: axiosError.request,
        response: axiosError.response
      });
      
      if (axiosError.response) {
        // Проверяем различные форматы ответов об ошибках
        if (typeof axiosError.response.data === 'string') {
          errorMessage = axiosError.response.data;
        } else if (typeof axiosError.response.data === 'object' && axiosError.response.data !== null) {
          errorMessage = (axiosError.response.data as any)?.message || 
                         (axiosError.response.data as any)?.error || 
                         JSON.stringify(axiosError.response.data);
        }
      } else if (axiosError.request) {
        errorMessage = 'No response received from server';
      } else {
        errorMessage = axiosError.message || 'Axios request error';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Login API error:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = (): { id: string; email: string } | null => {
  const userString = localStorage.getItem('user');
  if (!userString) return null;
  
  try {
    return JSON.parse(userString) as { id: string; email: string };
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};