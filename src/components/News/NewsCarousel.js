import React from 'react'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import NewsCarouselItem from './NewsCarouselItem';
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
       <NewsCarouselItem />
      </div>
      <BsFillArrowRightCircleFill className='carousel-arrow right-arrow' onClick={(shiftCarouselRight)} />
    </div>
  )
}