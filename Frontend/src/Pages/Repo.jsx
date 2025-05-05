import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Repo() {
  const { id } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [branches, setBranches] = useState([]);
  const [currentBranch, setCurrentBranch] = useState("");
  const [error, setError] = useState("");

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

  const allFilesSet = new Set();

  if (repoData && repoData[currentBranch]) {
    repoData[currentBranch].forEach((commit) => {
      Object.keys(commit.files || {}).forEach((file) => {
        allFilesSet.add(file);
      });
    });
  }

  const allFiles = Array.from(allFilesSet);

  return (
    <div className="container py-5">
      <h1 className="mb-4">📁 Repo File Viewer</h1>

      {error && (
        <div className="alert alert-warning">
          <strong>⚠️ {error}</strong>
          <p className="mt-2">
            Use <code>java -jar push.jar {id}</code> to push your
            commits.
          </p>
        </div>
      )}

      {!error && allFiles.length > 0 && (
        <>
          <div className="mb-3">
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

          <div className="card mt-4 shadow">
            <div className="card-header bg-dark text-white">
              All Files in <strong>{currentBranch}</strong>
            </div>
            <ul className="list-group list-group-flush">
              {allFiles.map((fileName, index) => (
                <li className="list-group-item" key={index}>
                  <Link
                    to={`/repo/${id}/file/${encodeURIComponent(
                      fileName
                    )}?branch=${currentBranch}`}
                    className="text-decoration-none text-dark"
                  >
                    📄 {fileName}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-end mt-3">
              <Link
                to={`/repo/${id}/history`}
                className="btn btn-outline-primary"
              >
                📜 View Commit History
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Repo;
