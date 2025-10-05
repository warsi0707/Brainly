import  { memo } from 'react'

 function TwitterEmbed({link}) {
    const embedLink = link.replace("x.com", "twitter.com")
  return (
    <blockquote className="twitter-tweet h-32">
        <a href={`${embedLink}`}></a>
    </blockquote>
  )
}
export default memo(TwitterEmbed)