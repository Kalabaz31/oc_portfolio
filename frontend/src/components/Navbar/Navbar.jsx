import { yz_logo } from "../../assets";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="app__navbar">
      <div className="app__navbar-container">
        <img className="app__navbar-logo" src={yz_logo} alt="YZ logo" />

        <ul className="app__navbar-nav">
          <li>
            <a href="#work">Work</a>
          </li>

          <li>
            <a href="#about">About</a>
          </li>

          <li>
            <a href="/#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
