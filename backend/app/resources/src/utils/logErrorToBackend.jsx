import axios from 'axios';
export const logErrorToBackend = async (error) => {
  // BigIntを文字列に変換（もし含まれていれば）
  let sanitizedAdditionalInfo = null;
  if (error.additionalData?.additional_info) {
    sanitizedAdditionalInfo = JSON.parse(JSON.stringify(
        error.additionalData?.additional_info,
        (_key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
  }
  try {
    await axios.post(`${ import.meta.env.VITE_BASE_URL }/api/log-error`,
        {
          level: error.additionalData?.level || null,
          message: error.message,
          stack: error.stack,
          additional_info: sanitizedAdditionalInfo,  // JSON文字列ではなく、そのままのオブジェクトまたはnullを送信
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
  } catch (backendError) {
    console.error('Failed to log error to backend:', backendError);
  }
};