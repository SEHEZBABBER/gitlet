import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  let [registerdUser,setRegisterdUser] = useState({
    username:"",
    email:"",
    password:"",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here

    // e- mail client side validation already handeld 
    // username validation will be from server side
    // passowrd validation 
    if (registerdUser.password.length < 8)setError("Password is too short (min 8 characters)");
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(registerdUser.password))setError("Password must contain at least one special character");
    else if (!/[A-Z]/.test(registerdUser.password))setError("Password must include an uppercase letter");
    else if (!/[a-z]/.test(registerdUser.password))setError("Password must include an lower letter");
    else if (!/[0-9]/.test(registerdUser.password))setError("Password must include a number");
    else {
      setError('');
      console.log('Registration attempt with:', registerdUser);
      axios.post("http://localhost:8080/register",registerdUser,{withCredentials:true}).then((res)=>{
        console.log(res);
        navigate('/home');
      }).catch((err)=>{
        setError(err.response.data.error);
        console.log(err);
      })
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-5">
          <div className="text-center mb-4">
            {/* GitHub-like logo */}
            <svg height="48" width="48" className="mb-3" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <h1 className="h4">Create your account</h1>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    value={registerdUser.email}
                    onChange={(e) => setRegisterdUser({...registerdUser,email:e.target.value})}
                    required
                  />
                  <div className="form-text">We'll occasionally send updates about your account.</div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    value={registerdUser.username}
                    onChange={(e) => setRegisterdUser({...registerdUser,username:e.target.value})}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={registerdUser.password}
                    onChange={(e) => setRegisterdUser({...registerdUser,password:e.target.value})}
                    required
                  />
                  <div className="form-text">Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</div>
                </div>
                
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="agreeTerm" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <label className="form-check-label small" htmlFor="agreeTerm">
                    I agree to the  <p className="text-decoration-none" style={{display:"inline",color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/Chill')}}>Terms and Services</p>. and  <p className="text-decoration-none" style={{display:"inline",color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/Chill')}}>Privacy Statement</p>.
                  </label>
                </div>
                {error ? (<p style={{color:"red"}}>{error}</p>) : (<p></p>)}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success">Sign up</button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="card mt-3">
            <div className="card-body text-center">
              <p className="mb-0">
                Already have an account? <span className="text-decoration-none" style={{display:"inline",color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/Login')}}>Sign In</span>
              </p>
            </div>
          </div>
          
          <div className="mt-4 mb-5">
            <ul className="nav justify-content-center small">
              <li className="nav-item">
              <p className="text-decoration-none ms-5" style={{display:"inline",color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/Chill')}}>Terms</p>
              </li>
              <li className="nav-item">
              <p className="text-decoration-none ms-5" style={{display:"inline",color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/Chill')}}>Privacy</p>
              </li>
              <li className="nav-item">
              <p className="text-decoration-none ms-5" style={{display:"inline",color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/Chill')}}>Security</p>
              </li>
              <li className="nav-item">
              <p className="text-decoration-none ms-5" style={{display:"inline",color:"blue",cursor:"pointer"}} onClick={()=>{navigate('/Chill')}}>Contact</p>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;