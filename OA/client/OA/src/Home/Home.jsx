import { NavLink } from 'react-router-dom';
import './Home.css';

const Navbar = ({ currState, score }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h2 style={{ fontFamily: "inherit" }}>Exam<span style={{ fontFamily: "cursive", color: "#0D7C66" }}>Ease</span></h2>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/login">{currState === "Login" ? "Log in" : "Log out"}</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <h3>{currState === "Login" ? "Please log in to continue with the test" : `Your score is: ${score}`}</h3>
    </nav>
  );
};

export default Navbar;