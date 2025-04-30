import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();
  const [userRepos, setUserRepos] = useState([]);
  const [publicRepos, setPublicRepos] = useState([]);
  const [username, setUsername] = useState("");
  function ViewNew(){
    navigate("/new");
  }
  function ViewProfile(){
    navigate("/profile");
  }
  useEffect(() => {
    // Check authentication
    axios
      .get("http://localhost:8080/home", { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.user) {
          setUsername(res.data.user.username || "User");
        }
        // Fetch user repositories
        fetchUserRepos();
        // Fetch public repositories
        fetchPublicRepos();
      })
      .catch((err) => {
        console.log(err);
        alert("You're not authorized to access this page");
        navigate("/");
      });
  }, [navigate]);
  function handleLogout() {
    axios
      .get("http://localhost:8080/logout", { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchUserRepos = () => {
    // Mock data - replace with actual API call
    setUserRepos([
      { id: 1, name: "my-project", updated_at: "2025-04-25", stars: 5 },
      { id: 2, name: "awesome-app", updated_at: "2025-04-20", stars: 12 },
      { id: 3, name: "react-demo", updated_at: "2025-04-15", stars: 8 },
    ]);
  };

  const fetchPublicRepos = () => {
    // Mock data - replace with actual API call
    setPublicRepos([
      {
        id: 101,
        name: "tensorflow",
        owner: "google",
        description: "An open source machine learning framework",
        stars: 178000,
        updated_at: "2025-04-27",
      },
      {
        id: 102,
        name: "react",
        owner: "facebook",
        description: "A JavaScript library for building user interfaces",
        stars: 205000,
        updated_at: "2025-04-26",
      },
      {
        id: 103,
        name: "vscode",
        owner: "microsoft",
        description: "Visual Studio Code",
        stars: 152000,
        updated_at: "2025-04-25",
      },
      {
        id: 104,
        name: "bootstrap",
        owner: "twbs",
        description: "The most popular HTML, CSS, and JavaScript framework",
        stars: 165000,
        updated_at: "2025-04-24",
      },
    ]);
  };


  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/home">
          <i className="bi bi-git me-2"></i>
          GitLet
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex mx-auto" style={{ maxWidth: "1200px" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search repositories"
              style={{width:"75vw"}}
            />
          </form>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <button
                onClick={ViewNew}
                style={{
                  backgroundColor: "#1a2526", // Dark background similar to the image
                  color: "#ffffff", // White text
                  textShadow: "1px 0 red, -1px 0 blue, 0 1px green", // Glitchy outline effect
                  fontFamily: "Arial, sans-serif", // Standard font (adjust if needed)
                  padding: "5px 10px", // Padding for spacing
                  border: "none", // No border (the image doesn't show a visible border)
                  borderRadius: "0", // Sharp edges (no rounded corners)
                  cursor: "pointer", // Pointer cursor on hover
                }}
              >
                New Repo
              </button>
            </li>
            <li className="nav-item">
            <button
                onClick={ViewProfile}
                style={{
                  backgroundColor: "#1a2526", // Dark background similar to the image
                  color: "#ffffff", // White text
                  textShadow: "1px 0 red, -1px 0 blue, 0 1px green", // Glitchy outline effect
                  fontFamily: "Arial, sans-serif", // Standard font (adjust if needed)
                  padding: "5px 10px", // Padding for spacing
                  border: "none", // No border (the image doesn't show a visible border)
                  borderRadius: "0", // Sharp edges (no rounded corners)
                  cursor: "pointer", // Pointer cursor on hover
                }}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#1a2526", // Dark background similar to the image
                  color: "#ffffff", // White text
                  textShadow: "1px 0 red, -1px 0 blue, 0 1px green", // Glitchy outline effect
                  fontFamily: "Arial, sans-serif", // Standard font (adjust if needed)
                  padding: "5px 10px", // Padding for spacing
                  border: "none", // No border (the image doesn't show a visible border)
                  borderRadius: "0", // Sharp edges (no rounded corners)
                  cursor: "pointer", // Pointer cursor on hover
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Left sidebar - Repository list */}
          <div
            className="col-md-3 col-lg-2 border-end p-3 bg-light"
            style={{ minHeight: "calc(100vh - 56px)" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">My Repositories</h5>
              <button
                className="btn btn-sm btn-success"
                onClick={ViewNew}
                title="Create new repository"
              >
                New
              </button>
            </div>
            <ul className="list-group list-group-flush">
              {userRepos.map((repo) => (
                <li
                  key={repo.id}
                  className="list-group-item bg-light border-0 ps-0 py-2"
                >
                  <Link
                    to={`/repo/${repo.id}`}
                    className="text-decoration-none"
                  >
                    <i className="bi bi-book me-2"></i>
                    {repo.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Main content - Public repos */}
          <div className="col-md-9 col-lg-10 py-4">
            <div className="container">
              <h3 className="mb-4">Discover Public Repositories</h3>

              <div className="list-group">
                {publicRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="list-group-item border-start-0 border-end-0 py-3"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1">
                          <Link
                            to={`/repo/${repo.id}`}
                            className="text-decoration-none"
                          >
                            {repo.owner}/{repo.name}
                          </Link>
                        </h5>
                        <p className="mb-1 text-muted">{repo.description}</p>
                      </div>
                      <div className="text-nowrap ms-3">
                        <span className="badge bg-secondary me-2">
                          <i className="bi bi-star me-1"></i>
                          {repo.stars.toLocaleString()}
                        </span>
                        <small className="text-muted">
                          Updated{" "}
                          {new Date(repo.updated_at).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
