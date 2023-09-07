import axios from 'axios';

export const fetchFromApi = async ({
  endpoint,
  method = 'GET',
  data = null,
  headers = {},
  params = null,
}) => {
  const config = {
    method,
    url: `${ process.env.REACT_APP_BASE_URL }${ endpoint }`,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    withCredentials: true,
    data,
    params,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('You are not logged in. Please log in and try again.');
      throw new Error('UnauthorizedError');
    }
    console.error('API Error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await fetchFromApi({
      endpoint: '/sanctum/csrf-cookie'
    });
    await fetchFromApi({
      endpoint: '/api/logout',
      method: 'POST',
    });
    deleteAllCookies();
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

function deleteAllCookies() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;max-age=0';
  }
}