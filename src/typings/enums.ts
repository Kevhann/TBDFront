export type Action = typeof generations[number] | typeof modifications[number];

export const generations = ['random', 'smooth', 'neighbour'] as const;
export const modifications = ['gaussian'] as const;
