import React from 'react'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { BiSolidRightArrow } from 'react-icons/bi'
import newsData from "../../Data/newsData";

export default function NewsCarousel() {
  const [articlesRemaining, setArticlesRemaining] = React.useState(newsData.length - 3)
  const [articlePosition, setArticlePosition] = React.useState(articlesRemaining)
  const [ translateDeg, setTranslateDeg] = React.useState(0)
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
  const [viewChange, setViewChange] = React.useState(false)
  const [newsDataImport, setNewsDataImport] = React.useState(newsData)

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleWindowResize)

    if(windowWidth < 800) {
      setArticlesRemaining(newsData.length - 1)
      setArticlePosition(newsData.length - 1)
      setViewChange(false)
    } else if(windowWidth >= 800) {
      setArticlesRemaining(newsData.length - 3)
      setArticlePosition(newsData.length - 3)
      setViewChange(true)
    }
  }, [windowWidth])

  React.useEffect(() => {
    setTranslateDeg(0)
  }, [viewChange])

  const styles = {
    transform: `translateX(${translateDeg}%)`
  }

  function shiftCarouselLeft() {
    if(articlePosition !== articlesRemaining) {
      setTranslateDeg(prevDeg => prevDeg + 100)
      setArticlePosition(prevPosiiton => prevPosiiton + 1)
    }
  }

  function shiftCarouselRight() {
    if(articlePosition > 0) {
      setTranslateDeg(prevDeg => prevDeg - 100)
      setArticlePosition(prevPosiiton => prevPosiiton - 1)
    }
  }

  return (
    <div className='news-carousel'>
      <BsFillArrowLeftCircleFill className='carousel-arrow left-arrow' onClick={(shiftCarouselLeft)}/>
      <div className='carousel-items-container'>
       
        {newsDataImport.map(item => {
              return  <div className='carousel-item' style={item.styles}>
                  <Link to={`${item.url}/${item.id}`} className='carousel-item-link' >
                    <img 
                      className='carousel-item-img' 
                      src={`https://dinardavis.github.io/dac_portfolio/images/news_images/${item.carouselImg}`} 
                      alt={item.imgDesc}   
                    />
                    <h1 className='carousel-item-header'>{item.title}</h1>
                    <p className='carousel-item-date'>{item.date}</p> 
                    <p className='carousel-item-summary'>{item.body[0].slice(0,150)}<span>{item.body[0].length > 149 ? "..." : ""}</span></p>
                  </Link>
                  <Link to={`${item.url}/${item.id}`} className='carousel-item-readmore' >
                    <p className='link-blue-text'>Read More</p><BiSolidRightArrow />
                  </Link>
                </div>
            }
          )
        }  
      </div>
      <BsFillArrowRightCircleFill className='carousel-arrow right-arrow' onClick={(shiftCarouselRight)} />
    </div>
  )
}