import { getCompaniesApi } from "@/api/getCompaniesApi";
import { getJobList } from "@/api/getJobListApi";
import JobListP from "@/components/JobListP";
import useFetchHook from "@/hooks/useFetchHook";
import { useEffect, useState } from "react";

const JobListPage = () => {
  const [location, setLocation] = useState("");
  const [searchQuery, setsearchQuery] = useState("");
  const [company_id, setcompany_id] = useState("");

  // get job
  const {
    fn: joblistFn,
    data: joblistData,
    loading: joblistLoading,
    error: joblistError,
  } = useFetchHook(getJobList, { location, searchQuery, company_id });

  // get company
  const { fn: getcompanyfn, data: companies } = useFetchHook(getCompaniesApi);
  useEffect(() => {
    getcompanyfn();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements["search-query"].value.trim();
    setsearchQuery(query);
  };
  useEffect(() => {
    joblistFn();
  }, [location, searchQuery, company_id]);

  return (
    <JobListP
      joblistData={joblistData}
      joblistLoading={joblistLoading}
      joblistError={joblistError}
      handleSearch={handleSearch}
      location={location}
      setLocation={setLocation}
      companies={companies}
      company_id={company_id}
      setcompany_id={setcompany_id}
      setsearchQuery={setsearchQuery}
    />
  );
};

export default JobListPage;
