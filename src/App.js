import React, { useEffect, useRef, useState } from 'react';
import { fetchJobIds, getBulkJobs } from './store/job-store';
import LoadMore from './components/loading-status';
import SearchEndBanner from './components/search-end-banner';
import JobDetailsCard from './components/job-details-card';
import './styles.css';

export default function App() {
  const [jobIds, setJobIds] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [isSearchEnd, setIsSearchEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState([]);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    (async () => {
      const jobIdValuesFromAPI = await fetchJobIds();
      setJobIds(jobIdValuesFromAPI);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!jobIds.length) return;

    setIsLoading(true);

    const previousPage = page - 1;

    const slicedIds = jobIds.slice(previousPage * 6, page * 6);

    if (!slicedIds.length) {
      setIsSearchEnd(true);

      return;
    }

    getBulkJobs(slicedIds).then((jobs) => {
      setJobDetails([...jobDetails, ...jobs.map(({ value }) => value)]);
    }).finally(() => {
      setIsLoading(false);
    });

  }, [page, jobIds]);

  useEffect(() => {
    if (isSearchEnd || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isSearchEnd, isLoading]);

  return (
    <div>
      <h1 className='application-title'>Job Listing From Hacker News</h1>
      {jobDetails.map(jobDetail => {
            return Object.keys(jobDetail).length
              ? <JobDetailsCard details={jobDetail} key={jobDetail.id} />
              : <></>
          })
      }
      {isSearchEnd 
        ? <SearchEndBanner />
        : isLoading && <LoadMore />}
      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
    </div>
  );
}