'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/dist/server/api-utils';

export async function githubSignIn() {
  await signIn('github');
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}
