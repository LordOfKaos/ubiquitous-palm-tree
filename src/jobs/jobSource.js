import { SAMPLE_JOBS } from './sampleJobs.js';

// Every advert the Jobs screen shows comes through this function. It returns sample
// data for now; to use a real job-search API, replace the body with a fetch() that
// returns adverts in the same shape as SAMPLE_JOBS.
export async function fetchJobs({ area, radius }) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return SAMPLE_JOBS.filter((job) => job.distance <= radius).map((job) => ({
    ...job,
    location: `${job.distance} ${job.distance === 1 ? 'mile' : 'miles'} from ${area}`,
  }));
}
