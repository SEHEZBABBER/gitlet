import { GitBranch, Search } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function LandingPage() {
  function handleLoginClick(){
    navigate('/Login');
  }
  function handleRegisterClick(){
    navigate('/Register');
  }
  const navigate = useNavigate();
  return (
    <div className="min-vh-100 bg-white">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light border-bottom bg-white">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <svg
              className="me-2"
              width="32"
              height="32"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59..."
              />
            </svg>
            <span className="fw-bold fs-5">GitHub</span>
          </a>

          {/* Search */}
          <form className="d-flex mx-auto w-50">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={18} className="text-muted" />
              </span>
              <input
                className="form-control border-start-0"
                type="search"
                placeholder="Search repositories"
                aria-label="Search"
              />
            </div>
          </form>

          {/* Auth Buttons */}
          <div className="d-flex">
            <button href="#" className="btn btn-link text-muted me-2" onClick={handleLoginClick}>
              Sign in
            </button>
            <button href="#" className="btn btn-success" onClick={handleRegisterClick}>
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">Where code lives</h1>
          <p className="lead mx-auto" style={{ maxWidth: "720px" }}>
            Millions of developers use GitHub to build, ship, and maintain their software. Join the community today.
          </p>
          <button href="#" className="btn btn-success btn-lg mt-4" onClick={handleRegisterClick}>
            Sign up for GitHub
          </button>
        </div>
      </section>

      {/* Code Block */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="bg-white rounded shadow overflow-hidden">
            <div className="bg-dark py-2 px-3 d-flex align-items-center">
              <div className="d-flex gap-2">
                <div className="bg-danger rounded-circle" style={{ width: "12px", height: "12px" }}></div>
                <div className="bg-warning rounded-circle" style={{ width: "12px", height: "12px" }}></div>
                <div className="bg-success rounded-circle" style={{ width: "12px", height: "12px" }}></div>
              </div>
            </div>
            <div className="p-3 bg-black text-success font-monospace">
              <div className="mb-2">$ git clone https://github.com/username/project.git</div>
              <div className="mb-2">$ cd project</div>
              <div>$ code .</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-top py-4">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <GitBranch size={18} className="text-muted me-2" />
            <small className="text-muted">© 2025 GitHub, Inc.</small>
          </div>
          <div className="d-flex gap-3">
            <a href="#" className="text-muted small text-decoration-none">Terms</a>
            <a href="#" className="text-muted small text-decoration-none">Privacy</a>
            <a href="#" className="text-muted small text-decoration-none">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
