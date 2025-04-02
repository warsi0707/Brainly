import { memo } from "react";
import { motion } from "framer-motion";
 function Card({ title, link, type, content, time, owner, onclick}) {

  return (
    <motion.div 
    initial={{opacity:0, y:100}}
    whileInView={{opacity:1, y:0}}
    whileHover={{rotate:1}}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="flex ">
      <div className="max-w-72 ml-8 min-h-32 min-w-72 shadow-xl rounded-xl bg-white border-1 border-gray-200  p-3">
        <div className="titles flex justify-between mx- mt-2">
          <div className="heading ml-2 mt-1 text-lg">
            <h1>{title}</h1>
          </div>
          <div className="btns flex gap-5 text-xl mt-2.5 text-gray-700">
            {/* <i className="fa-solid fa-share-nodes hover:cursor-pointer"></i> */}
            <motion.button
            whileHover={{scale:1.5}}
            transition={{duration: 0.2}}
            onClick={onclick}><i className="fa-solid fa-trash hover:cursor-pointer"></i></motion.button>
          </div>
        </div>
        {/* Text  */}
        {type === "text" && (
          <div className="content mt-5">
            <p className="text-lg text-gray-700 text-center">{content}</p>
          </div>
        )}
        {/*Twitter */}
        {type === "twitter" && (
          <div className="content mt-5">
            <blockquote className="twitter-tweet h-40">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
        {/*Youtube*/}
        {type === "youtube" && (
          <div className="content mt-5 ">
            {/* <iframe width="420" height="315" src={link.replace('watch','embed')} frameBorder="0" allowfullscreen></iframe> */}

            <iframe
              width="250"
              height="315"
              src={link.replace("watch", "embed")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>

            {/* src="https://www.youtube.com/embed/S_xwQNHOuSI?si=5h6oik7NKNwIwca8" */}
          </div>
        )}
        <div className="times mt-5 flex justify-between">
          <p className="text-gray-600 italic">{time}</p>
          <p className="text-gray-600">{owner}</p>
        </div>
      </div>
    </motion.div>
  );
}
export default memo(Card)