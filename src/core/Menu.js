import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';


// If the history and pathname match then it will change the color of the link to inidicate that it's active. 
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#000", fontWeight: '600' };
        else return { color: "#333333" };
}

// This is a functional component, not a class component since it doesn't need to have a state.
const Menu = ({history}) => (
    <div>
        {/* <Link> will render the components dynamically as opposed to <a href> tag which reloads the entire page. */}
        <ul className="nav nav-tabs bg-light justify-content-end pr-2">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/find/jobs")} to="/find/jobs">Jobs</Link>
            </li>
            {/* If the user is not authenticated then we only display the sign in and sign up components. */}
            {!isAuthenticated() && (
                <> {/* This is a react fragment. */}
                   <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
                    </li>
                </>
            )}
            {/* If the user is authenticated then we display the sign out component. */}
            {isAuthenticated() && (
                <>
                    {/* For Section 15: Posts and Users */}
                    <li className="nav-item">
                        <Link
                            to={`/post/create`}
                            style={isActive(history, `/post/create`)}
                            className="nav-link"
                        >
                            Create Post
                        </Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
                            Find People
                        </Link>
                    </li>
                    <li className="nav-item">
                        {/* This will display the user's username and go to their profile page when the username is clicked. */}
                        <Link to={`/user/${isAuthenticated().user._id}`} className="nav-link" style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>
                    <li className="nav-item">
                        {/* We use the a tag because we're not trying to navigate the user to another component. */}
                        <span 
                            className="nav-link" 
                            style={(isActive(history, "/signup"), {cursor: "pointer"}, {color: '#333333'})} 
                            onClick={() => signout(() => history.push('/'))}
                        >
                            Sign Out
                        </span>
                    </li>
                </>
            )}
        </ul>
    </div>
);


/* withRouter is a higher order component and all that means is it takes in another component as an argument.
   It will also give us access to props which in turn gives us access to the history object. */
export default withRouter(Menu);
