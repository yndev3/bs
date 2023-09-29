import axios from 'axios';
export const logErrorToBackend = async (errorMessage) => {
  try {
    const response = await axios.post(`${ import.meta.env.VITE_BASE_URL }/api/log-error`,
        {
            message: errorMessage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
  } catch (error) {
    console.error('Failed to log error to backend:', error);
  }
};