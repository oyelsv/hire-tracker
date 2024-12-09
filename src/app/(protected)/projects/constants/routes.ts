const ROOT = '/projects';

export const PROJECTS_ROUTES = {
  ROOT,
  DETAILS: (id: string) => `${ROOT}/${id}`,
};
