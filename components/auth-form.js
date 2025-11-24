'use client'
import { login, signup } from '@/actions/auth-actions';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export default function AuthForm({ mode }) {
  const isSignup = mode === 'signup';
  const action = isSignup ? signup : login;
  const [formState, formAction] = useFormState(action, {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((fieldName) => (
            <li key={fieldName}>{formState.errors[fieldName]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {isSignup ? 'Create Account' : 'Login'}
        </button>
      </p>
      <p>
        <Link href={isSignup ? "/" : "/?mode=signup"}>{isSignup ? 'Login with existing account.' : 'Create account'}</Link>
      </p>
    </form>
  );
}
