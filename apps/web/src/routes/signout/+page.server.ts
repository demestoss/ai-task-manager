import { signOut } from '@repo/auth';
import type { Actions } from './$types';
export const actions: Actions = { default: signOut };