import type { dataUserModel } from '@/models/checkout';
import type { DeliveryInformationModel } from '@/models/checkout';
import type { allProduct } from '@/models/product';

const AUTH_KEY = 'auth data';
const DELIVERY_KEY = 'delivery info';
const CHECKOUT_KEY = 'checkout data';

/** Bentuk data auth yang disimpan (hasil RTK mutation: { data: ... }) */
export interface StoredAuth {
  data: dataUserModel;
}

export function getStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

export function getStoredDeliveryInfo(): DeliveryInformationModel | null {
  try {
    const raw = localStorage.getItem(DELIVERY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DeliveryInformationModel;
  } catch {
    return null;
  }
}

export function getStoredCheckout(): allProduct[] | null {
  try {
    const raw = localStorage.getItem(CHECKOUT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as allProduct[];
  } catch {
    return null;
  }
}

export function setStoredAuth(payload: StoredAuth): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
}

export function setStoredDeliveryInfo(data: DeliveryInformationModel): void {
  localStorage.setItem(DELIVERY_KEY, JSON.stringify(data));
}

export function setStoredCheckout(data: allProduct[]): void {
  localStorage.setItem(CHECKOUT_KEY, JSON.stringify(data));
}

export function removeStoredAuth(): void {
  localStorage.removeItem(AUTH_KEY);
}
