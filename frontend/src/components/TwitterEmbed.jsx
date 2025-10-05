import React from 'react'

export default function TwitterEmbed({link}) {
    const embedLink = link.replace("x.com", "twitter.com")
  return (
    <blockquote className="twitter-tweet h-32">
        <a href={`${embedLink}`}></a>
    </blockquote>
  )
}
