import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function MyRepos() {
  const [repos, setRepos] = useState([]);
  const naviage = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/getrepos", { withCredentials: true })
      .then((res) => {
        setRepos(res.data.message);
      })
      .catch((err) => {
        alert("you're not authorised to access this page");
        navigate("/");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 display-4 fw-bold text-primary">My Repositories</h1>
      <div className="row g-4">
        {repos.length === 0 ? (
          <div className="col-12 text-center">
            <p className="fs-4">No repositories found.</p>
          </div>
        ) : (
          repos.map((repo) => (
            <div className="col-md-4" key={repo._id}>
              <div className="card h-100 shadow rounded-4 border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-success fw-bold">{repo.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{repo.owner}</h6>
                  <p className="card-text flex-grow-1">{repo.description || "No description provided."}</p>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
                  <button className="btn btn-outline-primary btn-sm">View</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyRepos;
