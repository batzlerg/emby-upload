import { redirect, type Handle, fail } from "@sveltejs/kit";
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from "./constants";

function extractTokenFromHeader(header: string | null) {
  // Extract the token from the "Bearer <token>" format
  if (header && header.startsWith('Bearer ')) {
    return header.substring(7); // Remove 'Bearer ' from the header
  }
  return null;
}


export const handle: Handle = async ({ event, resolve }) => {
  const token = extractTokenFromHeader(event.request.headers.get('Authorization'));
  let decodedToken: any | null; // todo
  // Verify the token
  try {
    decodedToken = verify(token, JWT_SECRET);
    // The token is valid
    // You can access the decoded token's payload via `decodedToken`
  } catch (error) {
    // The token is invalid or has expired
    console.error(error)
  }
  if (event.route.id?.includes("protected")) {
    if (!!decodedToken) {
      console.log('-- TODO')
    } else {
      throw redirect(302, '/login');
    }
  }
  const response = await resolve(event);
  return response;
}