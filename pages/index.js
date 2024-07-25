import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobTitles, setJobTitles] = useState('');
  const [jobCount, setJobCount] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Please upload a resume.');
      return;
    }

    if (!jobTitles.trim()) {
      setError('Please enter job titles.');
      return;
    }

    if (!jobCount || isNaN(jobCount) || jobCount < 1) {
      setError('Please enter a valid number of jobs to return.');
      return;
    }

    // Mock data for demonstration
    const mockJobs = [
      { company: 'TechCorp', title: 'Software Engineer', description: 'Exciting role in AI...', applyLink: 'https://example.com/apply1' },
      { company: 'DataInc', title: 'Data Scientist', description: 'Work with big data...', applyLink: 'https://example.com/apply2' },
    ];

    setJobs(mockJobs);
    console.log('Email sent with job results');
  };

  const handleRefresh = () => {
    setFile(null);
    setJobTitles('');
    setJobCount('');
    setJobs([]);
    setError('');
    // Reset the file input
    const fileInput = document.getElementById('resume');
    if (fileInput) fileInput.value = '';
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AI Job Matcher</title>
        <meta name="description" content="Match your resume with job openings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.darkModeToggle}>
          <label htmlFor="darkMode">Dark Mode</label>
          <input
            type="checkbox"
            id="darkMode"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </div>

        <h1 className={styles.title}>AI Job Matcher</h1>
        
        <p className={styles.description}>
          Welcome to AI Job Matcher! This tool helps you find job opportunities that match your skills and experience. 
          Simply upload your resume, specify the job titles you're interested in, and choose how many job listings you'd like to see. 
          We'll analyze your resume and return a list of relevant job openings. The results will be displayed here and also emailed to you for convenience.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="resume">Upload Resume (PDF):</label>
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="jobTitles">Job Titles:</label>
            <input
              type="text"
              id="jobTitles"
              value={jobTitles}
              onChange={(e) => setJobTitles(e.target.value)}
              placeholder="e.g. Software Engineer, Data Scientist"
              className={styles.textInput}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="jobCount">Number of Jobs:</label>
            <input
              type="number"
              id="jobCount"
              value={jobCount}
              onChange={(e) => setJobCount(e.target.value)}
              min="1"
              className={styles.numberInput}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>Find Jobs</button>
            <button type="button" onClick={handleRefresh} className={styles.refreshButton}>Refresh</button>
          </div>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {jobs.length > 0 && (
          <div className={styles.jobResults}>
            <h2>Job Matches</h2>
            <table className={styles.jobTable}>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Description</th>
                  <th>Apply</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={index}>
                    <td>{job.company}</td>
                    <td>{job.title}</td>
                    <td>{job.description}</td>
                    <td>
                      <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                        Apply
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
