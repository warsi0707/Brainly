import { memo } from "react";

function YoutubeEmbed({link}) {
    const embedLink = link.split('v=')[1]
    
  return (
    <iframe
      width="300"
      height="150"
       className="w-full rounded-md"
      src={`https://www.youtube.com/embed/${embedLink}`}
      frameBorder="0"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
export default memo(YoutubeEmbed)