import { COACH, SAMPLE_ACTIONS, SAMPLE_MEETINGS, SAMPLE_MESSAGES } from './sampleCoachData.js';

// Everything the Home screen shows from the job coach comes through this function.
// It returns sample data for now; to connect a real system, replace the body with a
// fetch() that returns the same shape.
export async function fetchCoachUpdates() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return {
    coach: COACH,
    messages: SAMPLE_MESSAGES,
    meetings: SAMPLE_MEETINGS,
    actions: SAMPLE_ACTIONS,
  };
}
