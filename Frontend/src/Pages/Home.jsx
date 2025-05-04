import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();
  const [userRepos, setUserRepos] = useState([]);
  const [publicRepos, setPublicRepos] = useState([]);
  const [username, setUsername] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [publicPage, setPublicPage] = useState(1);
  const [serached,setsearched] = useState("");
  const reposPerPage = 5;

  function sort_random(arr) {
    // Simple hash function to convert array content into a seed
    const seed = hashArray(arr);
    const rng = mulberry32(seed);
  
    const result = [...arr];
    // Fisher-Yates Shuffle using deterministic RNG
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
  
    return result;
  }
  
  // Hash function to create a numeric seed from the array
  function hashArray(arr) {
    const str = JSON.stringify(arr);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  
  // Deterministic pseudo-random number generator (PRNG)
  function mulberry32(seed) {
    return function() {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  
  function ViewNew() {
    navigate("/new");
  }

  function ViewProfile() {
    navigate("/profile");
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/home", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setUsername(res.data.user.username || "User");
        }
        fetchUserRepos();
        fetchPublicRepos();
      })
      .catch(() => {
        alert("You're not authorized to access this page");
        navigate("/");
      });
  }, [navigate]);

  function handleLogout() {
    axios
      .get("http://localhost:8080/logout", { withCredentials: true })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchUserRepos = () => {
    axios
      .get("http://localhost:8080/getrepos", { withCredentials: true })
      .then((res) => {
        setUserRepos(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPublicRepos = () => {
    axios
      .get("http://localhost:8080/getallrepos")
      .then((res) => {
        let arr = sort_random(res.data.message);
        console.log(arr);
        setPublicRepos(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function handleSubmit(e){
    e.preventDefault();
    axios.get(`http://localhost:8080/search?q=${serached}`)
    .then((res)=>{
      let arr = sort_random(res.data.message);
      setPublicRepos(arr);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  // Pagination Logic
  const indexOfLastUserRepo = userPage * reposPerPage;
  const indexOfFirstUserRepo = indexOfLastUserRepo - reposPerPage;
  const currentUserRepos = userRepos.slice(indexOfFirstUserRepo, indexOfLastUserRepo);

  const indexOfLastPublicRepo = publicPage * reposPerPage;
  const indexOfFirstPublicRepo = indexOfLastPublicRepo - reposPerPage;
  const currentPublicRepos = publicRepos.slice(indexOfFirstPublicRepo, indexOfLastPublicRepo);

  const totalUserPages = Math.ceil(userRepos.length / reposPerPage);
  const totalPublicPages = Math.ceil(publicRepos.length / reposPerPage);

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/home">
          <i className="bi bi-git me-2"></i>GitLet
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
          <form className="d-flex mx-auto" style={{ maxWidth: "1200px" }} onSubmit={(e)=>handleSubmit(e)}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search repositories"
              style={{ width: "75vw" }}
              onChange={(e)=>setsearched(e.target.value)}
            />
          </form>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button
                onClick={ViewNew}
                style={buttonStyle}
              >
                New Repo
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={ViewProfile}
                style={buttonStyle}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                style={buttonStyle}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar - User Repos */}
          <div className="col-md-3 col-lg-2 border-end p-3 bg-light" style={{ minHeight: "calc(100vh - 56px)" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0" onClick={() => navigate("/myrepos")} style={{ cursor: "pointer" }}>My Repositories</h5>
              <button className="btn btn-sm btn-success" onClick={ViewNew} title="Create new repository">New</button>
            </div>
            <ul className="list-group list-group-flush">
              {currentUserRepos.map((repo) => (
                <li key={repo._id} className="list-group-item bg-light border-0 ps-0 py-2">
                  <Link to={`/repo/${repo._id}`} className="text-decoration-none">
                    <i className="bi bi-book me-2"></i>
                    {repo.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <button className="btn btn-sm btn-outline-secondary me-1" disabled={userPage === 1} onClick={() => setUserPage(userPage - 1)}>Prev</button>
              <button className="btn btn-sm btn-outline-secondary" disabled={userPage === totalUserPages} onClick={() => setUserPage(userPage + 1)}>Next</button>
            </div>
          </div>

          {/* Main content - Public repos */}
          <div className="col-md-9 col-lg-10 py-4">
            <div className="container">
              <h3 className="mb-4">Discover Public Repositories</h3>
              <div className="list-group">
                {currentPublicRepos.map((repo) => (
                  <div key={repo.id} className="list-group-item border-start-0 border-end-0 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1">
                          <Link to={`/repo/${repo._id}`} className="text-decoration-none">
                            <span>Owner: {repo.owner}</span><br />
                            <span>Repo Name: {repo.name}</span>
                          </Link>
                        </h5>
                        <p className="mb-1 text-muted">Description: {repo.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <button className="btn btn-sm btn-outline-secondary me-2" disabled={publicPage === 1} onClick={() => setPublicPage(publicPage - 1)}>Prev</button>
                <button className="btn btn-sm btn-outline-secondary" disabled={publicPage === totalPublicPages} onClick={() => setPublicPage(publicPage + 1)}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#1a2526",
  color: "#ffffff",
  textShadow: "1px 0 red, -1px 0 blue, 0 1px green",
  fontFamily: "Arial, sans-serif",
  padding: "5px 10px",
  border: "none",
  borderRadius: "0",
  cursor: "pointer",
};

export default Home;
