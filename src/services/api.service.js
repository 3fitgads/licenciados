const DEFAULT_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  '';

export async function apiRequest(endpoint, options = {}) {
  if (!endpoint || typeof endpoint !== 'string') {
    return {
      success: false,
      error: 'Endpoint não fornecido ou inválido',
    };
  }

  const {
    method = 'GET',
    body = null,
    headers = {},
    timeout = 10000,
  } = options;

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${DEFAULT_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const fetchOptions = {
    method,
    headers: defaultHeaders,
    cache: 'no-store',
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    fetchOptions.signal = controller.signal;

    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json().catch(() => ({}));
    } else {
      data = await response.text().catch(() => '');
    }

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        data?.error ||
        `Erro ${response.status}: ${response.statusText}` ||
        'Erro ao processar requisição';
      
      return {
        success: false,
        error: errorMessage,
        status: response.status,
      };
    }

    return {
      success: true,
      data,
      status: response.status,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: 'Tempo de requisição excedido. Tente novamente.',
      };
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Erro ao conectar com o servidor. Verifique sua conexão.',
      };
    }

    console.error('apiRequest error:', error);
    return {
      success: false,
      error: 'Erro inesperado ao processar requisição. Tente novamente.',
    };
  }
}

export const api = {
  get: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'POST', body }),

  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'PUT', body }),

  patch: (endpoint, body, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'PATCH', body }),

  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
};
