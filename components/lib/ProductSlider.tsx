'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ProductCard } from "@/components";

export default function ProductSlider(){
    return (
        <>
            <div className="w-full">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                >
                    <SwiperSlide>
                        <ProductCard />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}