import React from 'react'
import { Link } from 'react-router-dom'
import { BiSolidRightArrow } from 'react-icons/bi'
import { newsData } from '../../Data/newsData'

export default function NewsCarouselItem(props) {
  const [newsInfo, setNewsInfo] = React.useState(newsData)

  console.log(newsInfo)

  return (newsInfo.map(newsItem => {
      <div className='carousel-item' style={newsItem.styles}>
        <Link to={`${newsItem.url}/${newsItem.id}`} className='carousel-item-link' >
        <img 
          className='carousel-item-img' 
          src={`${newsItem.img}`} 
          alt={newsItem.imgDesc}   
        />
        <h1 className='carousel-item-header'>{newsItem.title}</h1>
        <p className='carousel-item-date'>{newsItem.date}</p> 
        <p className='carousel-item-summary'>{newsItem.body[0].slice(0,150)}<span>{newsItem.body[0].length > 149 ? "..." : ""}</span></p>
        </Link>
        <Link to={`${newsItem.url}/${newsItem.id}`} className='carousel-item-readmore' >
          <p className='link-blue-text'>Read More</p><BiSolidRightArrow />
        </Link>
      </div>
    }))
}