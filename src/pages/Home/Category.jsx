import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import img1 from "../../../../assets/home/slide1.jpg";
import img2 from "../../../../assets/home/slide2.jpg";
import img3 from "../../../../assets/home/slide3.jpg";
import img4 from "../../../../assets/home/slide4.jpg";
import img5 from "../../../../assets/home/slide5.jpg";

import { Pagination } from "swiper/modules";

const Category = () => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper mb-24"
    >
      <SwiperSlide>
        <img src={img1} alt="" />
        <h3 className="text-4xl uppercase -mt-16 text-center text-white">
          Salads
        </h3>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} alt="" />
        <h3 className="text-4xl uppercase -mt-16 text-center text-white">
          pizzas
        </h3>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} alt="" />
        <h3 className="text-4xl uppercase -mt-16 text-center text-white">
          soups
        </h3>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img4} alt="" />
        <h3 className="text-4xl uppercase -mt-16 text-center text-white">
          desserts
        </h3>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img5} alt="" />
        <h3 className="text-4xl uppercase -mt-16 text-center text-white">
          salads
        </h3>
      </SwiperSlide>
    </Swiper>
  );
};

export default Category;
