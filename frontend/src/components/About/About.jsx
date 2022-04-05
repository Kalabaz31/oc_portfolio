import { AppWrap, MotionWrap } from "../../Wrapper";
import { profile } from "../../assets";
import { urlFor, client } from "../../client";

import "./About.scss";
import { useState, useEffect } from "react";
const About = () => {
  const [me, setMe] = useState({});

  useEffect(() => {
    const query = '*[_type == "about"]';

    client.fetch(query).then((data) => {
      console.log(data);
      setMe(data);
    });
  }, []);
  return (
    <div className="app__about">
      <div className="app__about-heading">
        <h3>
          <span></span> About Me
        </h3>

        <h1>Get a closer look at who I am.</h1>
      </div>
      {me.length > 0 && (
        <div className="app__about-info">
          <div className="app__about-info-img">
            <img src={urlFor(me[0].imgUrl)} alt="" />
          </div>

          <div className="app__about-info-intro">
            <h3>
              <span></span> Who am I
            </h3>

            <p>{me[0].selfIntro}</p>

            <h3>
              <span></span> Skills & Tools
            </h3>

            <p>
              {me[0].skills.split(". ")[0]}.

              <br />
              {me[0].skills.split(". ")[1]}
            </p>

            <a className="btn" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppWrap(MotionWrap(About, "app__about"), "about");
