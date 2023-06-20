import { getJWT } from './jwt';

export async function fetchWithJWT(url: string, options: RequestInit = {}): Promise<Response> {
  const jwt = getJWT();

  if (jwt) {
    options.headers = new Headers(options.headers);
    options.headers.append('Authorization', `Bearer ${jwt}`);
  }

  // todo: remove jwt if expired
  const response = await fetch(url, options);

  // Handle unauthorized response or any other error scenarios if needed
  return response;
}