// SERVER ONLY - todo: rename?


// let USER_ACCESS_TOKEN = null;
// let USER_ID = null;

export async function makeEmbyAPIRequest(url: string, requestInit?: RequestInit) {
  const headers = new Headers(requestInit?.headers);
  headers.append("Content-Type", "application/json");
  // if (USER_ACCESS_TOKEN) {
  //   headers.append("X-Emby-Token", USER_ACCESS_TOKEN);
  // }
  // todo: device details here, make more concise
  // if (USER_ID) {
  //   headers.append("X-Emby-Authorization", `Emby Client="Emby Photo Uploader", UserId="${USER_ID}" Device="testing", DeviceId="4567", Version="1234"`);
  // } else {
  headers.append("X-Emby-Authorization", 'Emby Client="Emby Photo Uploader", Device="testing", DeviceId="4567", Version="1234"');
  // }

  return fetch(url, {
    ...requestInit,
    headers
  });
}

const EMBY_BASE_URL = 'http://192.168.0.151:8096';

interface AuthResult {
  userId: string,
  userName: string,
  accessToken: string
}

export async function loginToEmby(username: string, password: string): Promise<AuthResult> {
  // try {
  // Authenticate with the Emby server to obtain an access token
  const authUrl = `${EMBY_BASE_URL}/emby/Users/AuthenticateByName`;
  const authResponse = await makeEmbyAPIRequest(authUrl, {
    method: 'POST',
    body: JSON.stringify({
      Username: username,
      Pw: password,
    }),
  });

  if (!authResponse.ok) {
    throw new Error('Invalid username or password.');
  }

  const authData = await authResponse.json();

  return {
    userId: authData.User.Id,
    userName: authData.User.Name,
    accessToken: authData.AccessToken
  }
}