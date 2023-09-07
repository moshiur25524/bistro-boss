import FoodCard from "../../components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// TODO: implement pagination for orders

const OrderTab = ({ items }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <Swiper pagination={pagination} modules={[Pagination]} className="mySwiper">
      <SwiperSlide>
        <div className="grid md:grid-cols-3 gap-10">
          {items.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default OrderTab;
