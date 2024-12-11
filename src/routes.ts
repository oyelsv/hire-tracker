import { PROJECTS_ROUTES } from '@/app/(protected)/projects/constants';

export const publicRoutes = ['/about'];

export const authRoutes = ['/auth/login', '/auth/error'];

export const apiAuthPrefix = '/api/auth';

export const BASE_SEGMENT_REDIRECT = PROJECTS_ROUTES.ROOT;

export const DEFAULT_LOGIN_REDIRECT = PROJECTS_ROUTES.ROOT;
