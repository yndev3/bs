import { useState } from 'react';
import axios from 'axios';
import { useDisconnect } from 'wagmi';

// APIリクエスト用のカスタムフック
export const useFetchFromApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {disconnect} = useDisconnect();
  const fetchFromApi = async ({ endpoint, method = 'GET', data = null, headers = {}, params = null }) => {
    setLoading(true);
    setError(null);

    // CSRF cookie設定
    if (method === 'POST') {
      await fetchFromApi({
        endpoint: '/sanctum/csrf-cookie',
        method: 'GET',
      });
    }

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
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        // API 認証エラー
        alert('You are not logged in. Please log in and try again.');
        // ウォレット接続を解除
        disconnect();
      }

      setError(err);
      throw err;
    }
  };

  return { fetchFromApi, loading, error };
};

// ログアウト用のカスタムフック
export const useLogout = () => {
  const { fetchFromApi } = useFetchFromApi();

  const logout = async () => {
    try {
      await fetchFromApi({ endpoint: '/sanctum/csrf-cookie' });
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

  return { logout };
};

// すべてのクッキーを削除する関数
function deleteAllCookies() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;max-age=0';
  }
}
