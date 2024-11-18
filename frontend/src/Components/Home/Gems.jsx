import React from 'react';
import { Grid, Card, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import 'swiper/swiper-bundle.css'; // Import Swiper styles

const gems = [
  {
    name: 'Sapphire',
    image: 'https://wallpapercave.com/wp/wp2012511.jpg',
  },
  {
    name: 'Aquamarine',
    image: 'https://i.etsystatic.com/24644811/r/il/8e327d/2549949330/il_1588xN.2549949330_5uii.jpg',
  },
  {
    name: 'Topaz',
    image: 'https://images.squarespace-cdn.com/content/v1/5abd718f7106990bb39a36f4/1668109011794-SZ7NX50ZMAS9CXB1UYE0/different+colour+topaz.jpg',
  },
  {
    name: 'Ruby',
    image: 'https://www.gemporia.com/image/asset/166625/Ruby-Majestic.jpg',
  },
  {
    name: 'Opal',
    image: 'https://www.gemselect.com/media/article-images/opal_main-cat.jpg',
  },
  {
    name: 'Tourmaline',
    image: 'https://diamondforgood.com/cdn/shop/articles/Pink_Tourmaline.jpg?v=1709318068',
  },
];

const imageBarItems = [
  'https://cdn-chefn.nitrocdn.com/IcbkoxBoZAaIwhSaprplormwGmobedsR/assets/images/optimized/rev-9831c11/antavo.com/wp-content/uploads/2020/08/jewellery-cover-image.png',
  'https://scontent.xx.fbcdn.net/v/t1.6435-9/76756904_10157791448093491_8346626872230019072_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=2a1932&_nc_ohc=0N1qFSbOTlsQ7kNvgElxjvo&_nc_ht=scontent.xx&_nc_gid=AaQiwzpHZWdFUhEeExvh2od&oh=00_AYDEc8WmE6-m1jAo1-6XmNJVMakoVnsjSQ5s97SXblHGlg&oe=671930E4',
  'http://www.valdostavault.com/wp/wp-content/uploads/2012/10/xmas-cover.jpg',
];

const Gems = () => {
  const navigate = useNavigate();

  const handleGemClick = () => {
    navigate('/appointment');
  };

  return (
    <div>
      <Navbar />
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        navigation
        style={{ marginBottom: '20px' }}
        breakpoints={{
          320: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          960: { slidesPerView: 3 },
        }}
      >
        {imageBarItems.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Promo ${index + 1}`}
              className="image-bar-image" // Apply the new image bar class
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Typography variant="h4" align="center" gutterBottom>
      FOR ALL TASTES AND ALL DESIRES
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {gems.map((gem, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={handleGemClick}
              className="gem-card" // Apply the card hover class
              sx={{
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.3s ease',
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={gem.image}
                alt={gem.name}
                className="gem-image" // Apply the image hover class
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  textAlign: 'center',
                  padding: '10px 0',
                }}
              >
                <Typography variant="h6" color="white">
                  {gem.name}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Footer />
    </div>
  );
};

export default Gems;
