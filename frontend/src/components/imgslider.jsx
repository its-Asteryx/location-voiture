import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="slider-container">
      <Slider
        {...settings}
        className="mt-5 [&>button]:opacity-0 [&>button]:h-full [&>button]:w-[5vw] [&>button]:z-[1] hover:[&>button]:opacity-100 hover:[&>button]:transition-opacity hover:[&>button]:duration-200 hover:[&>button]:ease-[ease]"
      >
        <div className="rounded-[4px] cursor-pointer relative">
          <div className="rounded-[4px] shadow-[0_26px_30px_-10px_rgba(0,0,0,0.69),0_16px_10px_-10px_rgba(0,0,0,0.73)] cursor-pointer block relative p-[4px] hover:p-0 hover:border-2 hover:border-[rgba(0,0,0,0.6)] hover:transition-[300ms]">
            <img src="https://res.cloudinary.com/dv4fkqnbd/image/upload/v1745614398/car_images/db546d618ac5f2cf0cf4e3fa6cda5ce5.webp" alt="i20" className="w-full h-56 object-cover rounded-[4px] block" />
          </div>
        </div>

        <div className="rounded-[4px] cursor-pointer relative">
          <div className="rounded-[4px] shadow-[0_26px_30px_-10px_rgba(0,0,0,0.69),0_16px_10px_-10px_rgba(0,0,0,0.73)] cursor-pointer block relative p-[4px] hover:p-0 hover:border-2 hover:border-[rgba(0,0,0,0.6)] hover:transition-[300ms]">
            <img src="https://res.cloudinary.com/dv4fkqnbd/image/upload/v1745614877/car_images/7f5b6697d1bbdc32f7e80a6a67ca7244.webp" alt="i10" className=" rounded-[4px] block w-full h-56 object-cover" />
          </div>
        </div>

        <div className="rounded-[4px] cursor-pointer relative">
          <div className=" rounded-[4px] shadow-[0_26px_30px_-10px_rgba(0,0,0,0.69),0_16px_10px_-10px_rgba(0,0,0,0.73)] cursor-pointer block relative p-[4px] hover:p-0 hover:border-2 hover:border-[rgba(0,0,0,0.6)] hover:transition-[300ms]">
            <img src="https://res.cloudinary.com/dv4fkqnbd/image/upload/v1745614701/car_images/91b011899f7586976d9c18c1e237f712.webp" alt="polo6" className="w-full h-56 object-cover rounded-[4px] block" />
          </div>
        </div>

        <div className="rounded-[4px] cursor-pointer relative">
          <div className="rounded-[4px] shadow-[0_26px_30px_-10px_rgba(0,0,0,0.69),0_16px_10px_-10px_rgba(0,0,0,0.73)] cursor-pointer block relative p-[4px] hover:p-0 hover:border-2 hover:border-[rgba(0,0,0,0.6)] hover:transition-[300ms]">
            <img src="https://res.cloudinary.com/dv4fkqnbd/image/upload/v1745614745/car_images/9c23c11ac0e582d097baa67fd41d480d.webp" alt="golf8" className="w-full h-56 object-cover rounded-[4px] block" />
          </div>
        </div>
        <div className="rounded-[4px] cursor-pointer relative">
          <div className="rounded-[4px] shadow-[0_26px_30px_-10px_rgba(0,0,0,0.69),0_16px_10px_-10px_rgba(0,0,0,0.73)] cursor-pointer block relative p-[4px] hover:p-0 hover:border-2 hover:border-[rgba(0,0,0,0.6)] hover:transition-[300ms]">
            <img src="https://res.cloudinary.com/dv4fkqnbd/image/upload/v1745614796/car_images/5d760d66e3d74e27a8cf0e8a9628c67a.avif" alt="golf8" className="w-full h-56 object-cover rounded-[4px] block" />
          </div>
        </div>
      </Slider>

      {/* Add this to your global CSS file */}
      <style>{`
        .slick-dots li button:before {
          font-size: 10px;
          color: rgba(0, 0, 0, 0.6);
        }
        .slick-dots li.slick-active button:before {
          color: grey;
        }
        .slick-list {
          overflow: initial;
        }
        .slick-prev {
          left: -75px;
        }
        .slick-next {
          right: -75px;
        }
      `}</style>
    </div>
  );
};

export default ImgSlider;