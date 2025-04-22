import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import Job from "@/components/Job";
import Btn from "@/components/Btn";

export default function Home({ jobs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsperPage = 3;

  const indexOfLastJob = currentPage * jobsperPage;
  const indexOfFirstJob = indexOfLastJob - jobsperPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleNext = () => {
    if (indexOfLastJob < jobs.length) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      {currentJobs.map((job) => {
        return <Job key={job._id} job={job} />;
      })}

      <div className="flex justify-between gap-4">
        <Btn title={<GrLinkPrevious />} onClick={handlePrev} disabled={currentPage === 1} />
        <Btn title={<GrLinkNext />} onClick={handleNext} disabled={indexOfLastJob >= jobs.length} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://next-js-mongo-db-job-portal.vercel.app/api/jobs');
    if (!res.ok) {
      throw new Error('Error fetching jobs');
    }
    const data = await res.json();
    return {
      props: {
        jobs: data.jobs,
      },
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {
      props: {
        jobs: [], 
      },
    };
  }
}
