'use client';

import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import Job from "@/components/Job";
import { useEffect, useState } from "react";
import Btn from "@/components/Btn";

export default function Favorites() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('https://next-js-mongo-db-job-portal.vercel.app/api/jobs');
      const data = await res.json();
      console.log(data.jobs);
      setJobs(data.jobs);
    };
    fetchJobs();
  }, []);

  const favoriteJobs = jobs.filter((job) => job.favorite);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = favoriteJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleNext = () => {
    if (indexOfLastJob < favoriteJobs.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className=" md:px-4 ">
      {currentJobs.length > 0 ? (
        currentJobs.map((job) => (
          <Job key={job._id} job={job} />
        ))
      ) : (
        <p className="text-center text-gray-500 font-semibold my-10">
          No favorite jobs found.
        </p>
      )}

      <div className="flex justify-between gap-4 mt-8">
        <Btn
          title={<GrLinkPrevious />}
          onClick={handlePrev}
          disabled={currentPage === 1}
        />
        <Btn
          title={<GrLinkNext />}
          onClick={handleNext}
          disabled={indexOfLastJob >= favoriteJobs.length}
        />
      </div>
    </div>
  );
}
