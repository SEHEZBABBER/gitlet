import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function History() {
  const { id } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [branches, setBranches] = useState([]);
  const [currentBranch, setCurrentBranch] = useState("");
  const [error, setError] = useState("");
  const [expandedCommits, setExpandedCommits] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getrepodata/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.success && res.data.data) {
          const data = res.data.data;
          const branchNames = Object.keys(data);
          setRepoData(data);
          setBranches(branchNames);
          setCurrentBranch(branchNames[0] || "");
        } else {
          setError("No data found. Use `git push` to upload your repo.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch repository data.");
      });
  }, [id]);

  const handleBranchChange = (e) => {
    setCurrentBranch(e.target.value);
  };

  const toggleCommit = (commitId) => {
    setExpandedCommits((prev) => ({
      ...prev,
      [commitId]: !prev[commitId],
    }));
  };

  const commits = repoData?.[currentBranch] || [];

  return (
    <div className="container py-5">
      <h1 className="mb-4">📜 Commit History</h1>

      {error && <div className="alert alert-warning">{error}</div>}

      {!error && (
        <>
          <div className="mb-4">
            <label className="form-label fw-bold">Select Branch</label>
            <select
              className="form-select"
              value={currentBranch}
              onChange={handleBranchChange}
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {commits.length === 0 && (
            <div className="alert alert-info">No commits found in this branch.</div>
          )}

          {commits.map((commit) => (
            <div key={commit.commitId} className="card mb-4 shadow-sm">
              <div className="card-header bg-primary text-white">
                <strong>Commit ID:</strong> {commit.commitId}
              </div>
              <div className="card-body">
                <p><strong>Message:</strong> {commit.message || "No message"}</p>
                <h6 className="fw-bold mt-3">Files:</h6>
                <ul className="list-group">
                  {Object.entries(commit.files || {}).map(([filename, content]) => (
                    <li key={filename} className="list-group-item">
                      <h6 className="mb-2">📄 {filename}</h6>
                      <pre className="bg-light p-3 rounded small mb-0">
                        {content || "Empty file"}
                      </pre>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default History;
