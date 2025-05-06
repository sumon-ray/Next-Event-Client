'use server';

import { cookies } from 'next/headers';

const buildQueryString = (query: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== 'all') {
      params.append(key, String(value));
    }
  });
  return params.toString();
};

export const getAllPayment = async (query: Record<string, any> = {}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const queryString = buildQueryString(query);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/payments${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch payments: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('getAllPayment error:', error);
    return null;
  }
};
