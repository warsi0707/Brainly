import { memo } from "react";
import TwitterEmbed from "./TwitterEmbed";
import YoutubeEmbed from "./YoutubeEmbed";

function SharedCard({item}) {
    console.log(item)
  return (
    <div className={`${item?.type === 'YOUTUBE' && "h-96 w-96 py-3 flex flex-col  gap-2 p-2"} ${item.type === 'TEXT' && "w-72 h-72 p-3 flex flex-col justify-between"} ${item.type === 'TWITTER' && "py-3 h-96 overflow-hidden max-h-[600px] flex flex-col gap-5 p-2"}  bg-gray-200 border-2 border-black shadow-md    rounded-md `}>
            <div className={`${item?.type === 'YOUTUBE' && "flex flex-col gap-2"}`}>
              <div className="flex gap-2">
                <p>
                  {item?.type ==='TEXT' && <i className="fa-solid fa-note-sticky"></i>}
                  {item?.type ==='TWITTER' && <i className="fa-brands fa-x-twitter"></i>}
                  {item?.type ==='YOUTUBE' && <i className="fa-brands fa-youtube"></i>}
                  {item?.type ==='LINK' && <i className="fa-solid fa-link"></i>}
                </p>
                <p>{item?.title}</p>
              </div>
              {item?.type ==='TEXT' &&
              <p>{item?.description}</p>}
    
              {item?.type ==='YOUTUBE' &&
                <div >
                <YoutubeEmbed link={item?.link}/>
                <p className="py-2">{item?.description}</p>
                </div>
              }
              {item?.type ==='TWITTER' &&
                <div className="  ">
                <TwitterEmbed link={item?.link} />?
                </div>
              }
              
              
            </div>
            <div className="flex justify-between  gap-2">
              <div className="flex gap-1 items-end">
                <img src="/user.png" className="w-5 h-5 md:w-8 md:h-8 rounded-full" alt="" />
                <p>{item?.userId?.username}</p>
              </div>
              <div className="flex gap-5">
                  {/* <button className="cursor-pointer md:text-xl"><i className="fa-solid fa-pen-to-square"></i></button> */}
                 
              </div>
              
            </div>
          </div>
  )
}
export default memo(SharedCard)