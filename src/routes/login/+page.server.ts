// src/routes/login.ts
import { sign } from 'jsonwebtoken';
import { loginToEmby } from '../../api/embyAuth';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit'
import { JWT_SECRET } from '../../constants';


/** @type {import('./$types').Actions} */
export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    if (!password) return fail(400, { incorrect: true });

    try {
      // Authenticate user (e.g., verify credentials against database)
      // todo: fix this typescript shit
      const authResult = await loginToEmby(username as string, password as string);

      if (authResult) {
        // Generate and sign the JWT token
        const token = sign(authResult, JWT_SECRET);

        return {
          success: true,
          token,
        };
      } else {
        throw new Error('something unexpected occurred');
      }
    } catch (error) {
      console.error(error)
      return fail(400, { username, incorrect: true });
    }
  }
}