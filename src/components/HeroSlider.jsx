import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './button';



const HeroSlider = props => {
    const data = props.data;

    const timeOut = props.timeOut? props.timeOut :3000;


    const [activeSlider, setActiveSlider] = useState(0)

    const nextSlider =   useCallback(() => {
        
            const index = activeSlider +1 === data.length ? 0 : activeSlider +1;
            setActiveSlider(index)
         
    }, [activeSlider, data])

    const prevSlider = () => {
        const index = activeSlider - 1 < 0 ? data.length -1 : activeSlider - 1;
        setActiveSlider(index)
    }

     useEffect(() => {
         if(props.auto) {
             const autoSlide = setInterval(() =>{
                nextSlider()
             }, timeOut)
             return () => {
                 clearInterval(autoSlide)
             }
         }
     },[nextSlider, timeOut, props])


    return (
        <div className='hero-slider'>
            {
                data.map((item, index) => {
                    return (
                        <HeroSliderItem key={index} item={item} active={activeSlider === index} />
                    )
                }
                )
            }
            {
                props.control ? (
                    <div className="hero-slider__control">
                        <div className="hero-slider__control__item" onClick={prevSlider}>
                            <i className ='bx bx-chevron-left'></i>
                        </div>
                        <div className="hero-slider__control__item">
                            <div className="index">
                            {activeSlider+1}/{data.length}
                            </div>
                        </div>
                        <div className="hero-slider__control__item" onClick={nextSlider}>
                            <i className ='bx bx-chevron-right'></i>
                        </div>
                    </div>
                ) : null
            }

        </div>
    )
};



HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    controller: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
}

const HeroSliderItem = props => {
    const item = props.item;
    const active = props.active;
    return (
        <div className={`hero-slider__item ${active ? 'active' : ''}`}>
            <div className="hero-slider__item__info">
                <div className={`hero-slider__item__info__title color-${item.color}`}>
                    <span>{item.title}</span>
                </div>
                <div className="hero-slider__item__info__desc">
                    <span> {item.description}</span>
                </div>
                <div className="hero-slider__item__info__btn">
                    <Link to={item.path}>
                        <Button 
                        background={item.color} 
                        icon = 'bx bx-cart'
                        animate = {true}
                        size = 'small'
                        >
                             Xem chi tiết
                             </Button>
                    </Link>
                </div>
            </div>
            <div className="hero-slider__item__img">
                <div className={`shape bg-${item.color}`}></div>
                <img src={item.img} alt="" />
            </div>
        </div>

    )
}

export default HeroSlider
