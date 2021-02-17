import React from 'react'
import CardUI from './Card/CardUI'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CardsCarousel = ({items}) => {
  return (
    <Carousel className="pb-10 " responsive={responsive}> 
      {items.map(item =>
        <div class="m-3 rounded-2xl transition transform hover:-translate-y-3 hover:shadow-3xl motion-reduce:transition-none motion-reduce:transform-none">
          <CardUI item={item} />
        </div>
      )}
    </Carousel>
  )
}

export default CardsCarousel
