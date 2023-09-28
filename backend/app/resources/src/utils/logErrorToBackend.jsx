import axios from 'axios';
export const logErrorToBackend = async (errorMessage) => {
  try {
    console.log('Logging error to backend:');
    const response = await axios.post(`${ import.meta.env.VITE_BASE_URL }/api/log-error`,
        {
          error: errorMessage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
    console.log(response.data.message);
  } catch (error) {
    console.error('Failed to log error to backend:', error);
  }
};