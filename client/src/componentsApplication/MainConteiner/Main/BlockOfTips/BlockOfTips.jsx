import './BlockOfTips.css';
import { useState } from "react";
import Slider from "react-slick";
import advice1 from './advices/advice1.png';
import advice2 from './advices/advice2.png';
import advice3 from './advices/advice3.png';
import advice4 from './advices/advice4.png';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";


const images = [advice1, advice2, advice3, advice4]

const BlockOfTips = () => {

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

   const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  //настройка карусели
  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  return (
           <div className="blockOfTips">
             <h3 className="text">Фотографии пользователей</h3>
                  <Slider {...settings}>
                      {images.map((img, idx) => (
                        <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                          <img src={img} alt={img} />
                        </div>
                      ))}
                  </Slider>
           </div>
  );
}

export default BlockOfTips;