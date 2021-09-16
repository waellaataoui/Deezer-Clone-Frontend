import { useState, useEffect } from "react"
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronRight } from 'react-icons/fa';

import useSwiperRef from '../utils/useSwipeRef';

import 'swiper/swiper.scss';
import { Link } from "react-router-dom";

SwiperCore.use([Navigation]);
const Carousel = ({ title, children }) => {
    const [nextEl, nextElRef] = useSwiperRef();
    const [prevEl, prevElRef] = useSwiperRef();
    useEffect(() => {

    }, [])
    return (
        <Swiper
            className="carousel"
            modules={[Navigation]}
            speed={1000}
            navigation={{
                prevEl,
                nextEl,
            }}
            onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevElRef.current;
                swiper.params.navigation.nextEl = nextElRef.current;
                swiper.navigation.update();
            }}
            // Responsive breakpoints

            breakpoints={{
                // when window width is >= 320px
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                    slidesPerGroup: 2
                },
                1050: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                800: {
                    slidesPerView: 3,
                    spaceBetween: 200
                },
                500: {
                    slidesPerView: 2,
                    spaceBetween: 100
                },
                0: {
                    slidesPerView: 1,
                    spaceBetween: 30
                }



            }
            }
        >
            <div className="carousel-header">
                <h1 className={`${title.isLink ? "heading--clickable" : "heading"}`}>
                    {
                        title.isLink ? <Link to={title.to}>{title.text}  <FaChevronRight></FaChevronRight> </Link> : title.text

                    } </h1>

                <div className='carousel-controls'>
                    <span ref={prevElRef}>
                        {"<"}
                    </span>
                    <span ref={nextElRef}>

                        {">"}
                    </span>
                </div>
            </div>
            {children.map((child, index) => <SwiperSlide key={index}>{child} </SwiperSlide>)}
        </Swiper>

    )
}
export default Carousel;