export type Project = {
  name: string;
  description: string;
  status: 'BUILDING' | 'EXPERIMENT' | 'WRITING' | 'LIVE';
  // Add a verified https:// URL when a project is ready to link to.
  url?: string;
};

export const projects: Project[] = [
  {
    name: 'PulseWatch',
    description: 'External monitoring for scheduled jobs and automations.',
    status: 'LIVE',
    url: 'https://pulsewatch.ai/',
  },
  {
    name: 'AthleteAsk',
    description: 'Connecting amateur athletes in the UK with people who can help with practical sporting asks.',
    status: 'BUILDING',
  },
  {
    name: 'Didn’t Ship',
    description: 'A playful experiment. The name may turn out to be accurate.',
    status: 'EXPERIMENT',
  },
  {
    name: 'Well Built',
    description: 'An idea taking shape. More when there’s more to say.',
    status: 'BUILDING',
  },
  {
    name: 'A novel, in progress',
    description: 'Fiction exploring consciousness, AI and human survival. One draft at a time.',
    status: 'WRITING',
  },
];
