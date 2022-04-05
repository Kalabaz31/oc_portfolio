import { wrap } from "popmotion";
import React, { useState , useEffect} from "react";
import { motion } from "framer-motion";

import AppWrap from "../../Wrapper/AppWrap";
import MotionWrap from "../../Wrapper/MotionWrap";
import { urlFor, client } from '../../client';

import "./Works.scss";


const Works = () => {

  const [works, setWorks] = useState([]);


  const [[page, direction], setPage] = useState([0, 0]);

  const workIndex = wrap(0, works.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
    });
  }, []);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
  };
  return (
    <div className="app__works">
      <div className="app__works-heading">
        <h3>
          <span></span> Work
        </h3>

        <h1>Hand-picked projects for you to see.</h1>

        <div className="app__works-pagination">
          <button onClick={() => paginate(1)} className="btnPagination">
            {"<"}{" "}
          </button>
          <span>
            {workIndex + 1} / {works.length}
          </span>
          <button onClick={() => paginate(-1)} className="btnPagination">
            {">"}{" "}
          </button>
        </div>
      </div>

      <div className="app__works-container">
        {works.map(
          (work, index) =>
            index === workIndex && (
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 2,
                  },
                  opacity: { duration: 0.5 },
                }}
                className="app__works-item"
              >
                <div className="app__works-item-details">
                  <h2>{work.title}</h2>
                  <h3>
                    <span></span> {work.subTitle}
                  </h3>
                  <p>{work.description}</p>
                  <a href={work.projectLink} className="btn"> Visit Project</a>
                </div>
                <div className="app__works-item-img">
                  <motion.img
                    animate={{ y: [-5, 5] }}
                    transition={{ yoyo: Infinity, duration: 2 }}
                    src={urlFor(work.imgUrl)}
                    alt=""
                  />
                </div>
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export default AppWrap(MotionWrap(Works, "app__works"), "work", "app__lightbg");
