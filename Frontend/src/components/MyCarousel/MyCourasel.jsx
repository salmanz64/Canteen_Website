import React from 'react'
import './MyCourasel.css'
import Carousel from 'react-bootstrap/Carousel';
import image1 from './carousel_1.jpg'
import image2 from './carousel_2.jpg'
import image3 from './carousel_3.png'

const MyCourasel = () => {
  return (
    <div className='carousel-container'>
       <Carousel interval={3000} pause={false}  className='custom-carousel'>
      <Carousel.Item>
      <img
    
    src={image1}  // Replace with actual image URL
    alt="First slide"
  />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
   
    src={image2}  // Replace with actual image URL
    alt="First slide"
  />
        
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
    
    src={image3}  // Replace with actual image URL
    alt="First slide"
  />
        
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default MyCourasel
