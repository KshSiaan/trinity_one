import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { apiConfig } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// biome-ignore lint/suspicious/noExplicitAny: blehh
export type idk = any;

const API_BASE = apiConfig.baseUrl ?? "/api";

interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  token?: string;
  headers?: Record<string, string>;
}

export async function howl<T>(
  endpoint: string,
  { method = "GET", body, token, headers = {} }: ApiClientOptions = {}
): Promise<T> {
  const isFormData = body instanceof FormData;
  const requestHeaders: Record<string, string> = {
    "Accept": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  // Only set Content-Type for non-FormData requests
  if (!isFormData) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: requestHeaders,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error((errorData as idk).message || "API request failed");
  }

  return res.json() as Promise<T>;
}


