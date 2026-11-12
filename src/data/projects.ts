export type Project = {
  name: string;
  description: string;
  status: 'BUILDING' | 'EXPERIMENT' | 'WRITING' | 'LIVE' | 'ARCHIVED' | 'SHELVED';
  // Add a verified public URL or an established internal route when ready.
  url?: string;
};

export const projects: Project[] = [
  {
    name: 'Over Coffee',
    description: 'A small, thoughtfully curated iPhone app for your coffee break. I’m testing the first edition, which pairs the Collatz conjecture with Epictetus, and writing the next.',
    status: 'BUILDING',
    url: 'https://overcoffee.dev/',
  },
  {
    name: 'Didn’t Ship',
    description: 'A playful experiment. The name may turn out to be accurate.',
    status: 'EXPERIMENT',
    url: 'https://didntship.lol/',
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
    url: '/novel/',
  },
  {
    name: 'PulseWatch',
    description: 'External monitoring for scheduled jobs and automations. The hosted service has closed.',
    status: 'ARCHIVED',
    url: '/writing/why-pulsewatch-exists/',
  },
  {
    name: 'AthleteAsk',
    description: 'An experiment to connect UK amateur athletes with people who could help. I’ve taken it off the backlog and don’t expect to return to it.',
    status: 'SHELVED',
  },
];
