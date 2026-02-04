// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';
import photo1 from '../../../assets/Photorealistic_bangladeshi_family_2k_2026012.jpeg'
import photo2 from '../../../assets/Photorealistic_hero_banner_2k_202601270536.jpeg'
import photo3 from '../../../assets/Photorealistic_isp_technician_2k_20260127053.jpeg'
import photo4 from '../../../assets/Image_202601270537.jpeg'
// import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
    return (
        <div className="mx-auto w-full overflow-hidden aspect-[16/9] max-h-[80vh] rounded-none">
            <Swiper
                pagination={{ dynamicBullets: true }}
                modules={[Pagination]}
                className="h-full w-full"
            >
                {[photo1, photo2, photo3, photo4].map((p, i) => (
                    <SwiperSlide key={i} className="h-full w-full">
                        <img src={p} alt="" className="h-full w-full object-cover" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
}
