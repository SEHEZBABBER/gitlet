import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function NewRepo() {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [username,setusername] = useState('');
  const [error,seterror] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/newRepo',{repoName,description},{withCredentials:true})
    .then((res)=>{
      console.log(res);
      navigate("/home");
    })
    .catch((err)=>{
      seterror(err.response.data.message);
      console.log(err);
    })
  };
  useEffect(()=>{
    axios.get("http://localhost:8080/getusername",{withCredentials:true})
    .then((res)=>{
      setusername(res.data.username);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[]);

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      <h1 className="mb-4">Create a new repository</h1>
      <p className="text-muted">A repository contains all project files, including the revision history.</p>
      
      <hr className="my-4" />
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="owner" className="form-label">Owner</label>
          <div className="input-group">
            <span className="input-group-text bg-light">{username}</span>
            <span className="input-group-text">/</span>
            <input 
              type="text" 
              className="form-control" 
              id="repoName" 
              placeholder="repository-name" 
              value={repoName}
              onChange={(e) => {
                setRepoName(e.target.value);
                seterror('');
              }}
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="form-label">Description <span className="text-muted">(optional)</span></label>
          <textarea 
            type="text" 
            className="form-control" 
            id="description" 
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        {error ? (<p style={{color:"red"}}>{error}</p>) : (<p></p>) }
        <div className="d-grid">
          <button type="submit" className="btn btn-success">Create repository</button>
        </div>
      </form>
    </div>
  );
}

export default NewRepo;