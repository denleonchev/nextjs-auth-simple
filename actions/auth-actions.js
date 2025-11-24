'use server';

import { hashUserPassword } from '@/lib/hash';
import { createuser } from '@/lib/user';

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

  return createuser(email, hashUserPassword(password)); 
}