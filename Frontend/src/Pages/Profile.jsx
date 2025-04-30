import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [userData, setUserData] = useState({});
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        // Replace with actual username or API endpoint for fetching profile info
        const username = "octocat";  // Example GitHub username

        // Fetch user data
        axios.get(`https://api.github.com/users/${username}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data", error);
            });

        // Fetch user's repositories
        axios.get(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                setRepos(response.data);
            })
            .catch(error => {
                console.error("Error fetching repositories", error);
            });
    }, []);

    return ( 
        <div className="container mt-5">
            <div className="card" style={{ maxWidth: '800px', margin: 'auto' }}>
                <div className="card-body text-center">
                    <img 
                        src={userData.avatar_url} 
                        alt="Profile"
                        className="rounded-circle mb-3" 
                        style={{ width: '150px', height: '150px' }}
                    />
                    <div className="mt-4">
                        <h5>Repositories</h5>
                        <ul className="list-group">
                            {repos.map(repo => (
                                <li key={repo.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                        {repo.name}
                                    </a>
                                    <span className="badge badge-primary badge-pill">{repo.stargazers_count} Stars</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
