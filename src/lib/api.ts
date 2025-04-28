const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export async function apiRequest<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  payload?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const fullUrl = `${API_BASE_URL}${url}`;
  const token = localStorage.getItem('token');
  
  if (!fullUrl) {
    throw new Error('API base URL is not defined in environment variables');
  }
  if (!token) {
    throw new Error('No token found in local storage');
  }

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options?.headers,
    },
    body: payload ? JSON.stringify(payload) : undefined,
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `API request failed: ${response.statusText}`
    );
  }

  const data = await response.json();
  return {
    data,
    message: response.statusText,
    status: response.status,
  };
}

export async function authRequest<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  payload?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const fullUrl = `${API_BASE_URL}${url}`;
  const token = localStorage.getItem('token');
  
  if (!fullUrl) {
    throw new Error('API base URL is not defined in environment variables');
  }

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: payload ? JSON.stringify(payload) : undefined,
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `API request failed: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}
