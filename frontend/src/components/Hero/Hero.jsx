import "./Hero.scss";

import AppWrap from "../../Wrapper/AppWrap";
import { hero } from "../../assets";
import MotionWrap from "../../Wrapper/MotionWrap";

const Hero = () => {
  return (
    <div className="app__hero">
      <div className="app__hero-intro">
        <h1>
          Hey, Im <span>Younes</span>
          <br /> a <span>self-taught</span> front-end developer.
        </h1>
        <h3>Stick around to see some of my work.</h3>

        <a href="#work" className="btn">See my work</a>
      </div>
      <div className="app__hero-img">
        <img src={hero} alt="hero" />
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(Hero, "app__hero"), "home");
