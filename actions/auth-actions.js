'use server';

import { createAuthSession } from '@/lib/auth';
import { hashUserPassword } from '@/lib/hash';
import { createuser, getUserByEmail } from '@/lib/user';
import { redirect } from 'next/navigation';

export async function signup(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const errors = {};

  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }

  if (password.trim().length < 8) {
    errors.email = 'Password must me at least 8 chars long.';
  }
  if (Object.keys(errors).length > 0) {
    return {
      errors
    }
  }


  const userId = createuser(email, hashUserPassword(password));

  createAuthSession(userId);
  redirect('/training');  
}

export async function login(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "User does not exist",
      }
    };
  }

  const hashedPassword = hashUserPassword(password);

  if (hashedPassword === existingUser.password) {
    createAuthSession(userId);
    redirect('/training');  
  } else {
    return {
      errors: {
        password: "Invalid password",
      }
    };
  }

}

