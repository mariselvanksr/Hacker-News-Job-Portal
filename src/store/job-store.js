const API_END_POINT = 'https://hacker-news.firebaseio.com/v0';

export async function fetchJobIds() {
  let jobIdRes = [];

  try {
    jobIdRes = await fetch(`${API_END_POINT}/jobstories.json`);
    jobIdRes = await jobIdRes.json();
  } catch (err) {
    console.log('FetchJobIs failed to get data ', err);
  }

  return jobIdRes;
}

export async function fetchJobDetails(id = null) {
  if (!id) return {}

  let jobDetails = {};

  try {
    jobDetails = await fetch(`${API_END_POINT}/item/${id}.json`)
    jobDetails = await jobDetails.json();
  } catch (err) {
    console.log('fetchJobDetails failed to get data ', err);
  }

  return jobDetails;
}

export async function getBulkJobs(jobIds = []) {
  if(!jobIds?.length) return [];
  
  const promises = jobIds.map(id => fetchJobDetails(id));

  return await Promise.allSettled(promises);
}