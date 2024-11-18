import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import background3 from '../Images/background.png';

const URL = "http://localhost:4000/jewellery";

const fetchJewellery = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function JewelleryPage() {
  const [jewellery, setJewellery] = useState([]);
  const [originalJewellery, setOriginalJewellery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  const fetchData = async () => {
    const data = await fetchJewellery();
    setJewellery(data);
    setOriginalJewellery(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setJewellery(originalJewellery);
      return;
    }
    const filteredJewellery = originalJewellery.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setJewellery(filteredJewellery);
  };

  const handleFilter = () => {
    if (category) {
      const filteredJewellery = originalJewellery.filter(item => item.category === category);
      setJewellery(filteredJewellery);
    } else {
      setJewellery(originalJewellery);
    }
  };

  const handleSort = (event) => {
    const value = event.target.value;
    setSortOption(value);

    let sortedJewellery = [...originalJewellery];
    if (value === 'price-asc') {
      sortedJewellery.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      sortedJewellery.sort((a, b) => b.price - a.price);
    }
    setJewellery(sortedJewellery);
  };

  const categories = ['Rings', 'Necklaces', 'Bracelets', 'Earrings'];

  // Image Bar Data
  const imageBarItems = [
    'https://cdn-chefn.nitrocdn.com/IcbkoxBoZAaIwhSaprplormwGmobedsR/assets/images/optimized/rev-9831c11/antavo.com/wp-content/uploads/2020/08/jewellery-cover-image.png',
    'https://scontent.xx.fbcdn.net/v/t1.6435-9/76756904_10157791448093491_8346626872230019072_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=2a1932&_nc_ohc=0N1qFSbOTlsQ7kNvgElxjvo&_nc_ht=scontent.xx&_nc_gid=AaQiwzpHZWdFUhEeExvh2od&oh=00_AYDEc8WmE6-m1jAo1-6XmNJVMakoVnsjSQ5s97SXblHGlg&oe=671930E4',
    'http://www.valdostavault.com/wp/wp-content/uploads/2012/10/xmas-cover.jpg',
  ];

  return (
    <div 
      style={{ 
        backgroundImage: 'url(https://img.freepik.com/free-vector/white-abstract-background_23-2148817571.jpg?w=1380&t=st=1728114360~exp=1728114960~hmac=e6644fdf030f71cf7e3d548f6c2bd369d2e4486144db2c8689799b8195705b50)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        animation: 'fadeIn 1.5s ease-in-out' // Fade-in animation for the background
      }}
    >
      <Header />
      <br />

      {/* Image Bar */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        {imageBarItems.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <img 
              src={image} 
              alt={`Promo ${index + 1}`} 
              style={{ 
                width: '100%', 
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                opacity: 1,
                animation: 'fadeInImageBar 1.5s forwards', // Fade-in animation for image bar
                animationDelay: `${0.5 + index * 0.3}s`, // Stagger the fade-in for each image
              }} 
            />
          </Grid>
        ))}
      </Grid>

      <Container>
        <Typography variant="h4" align="left" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '20px', opacity: 0, animation: 'fadeInText 1.5s forwards', animationDelay: '0.8s' }}>
        SWIPE INTO OUR EVERYDAY WEAR COLLECTION
        </Typography>
        <Grid container justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ marginBottom: '20px', opacity: 0, animation: 'fadeInText 1.5s forwards', animationDelay: '1s' }}>
          <Grid item>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: '300px',
                backgroundColor: 'white',
                borderRadius: 1,
                padding: '1px',
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{
                borderRadius: 2,
                padding: '10px 20px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              }}
            >
              Search
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => setShowCategories(prev => !prev)}
              sx={{
                borderRadius: 2,
                padding: '10px 20px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                color: '#fff',
                marginRight: 2,
              }}
            >
              {showCategories ? 'Hide Categories' : 'Show Categories'}
            </Button>
          </Grid>
          {showCategories && (
            <>
              <Grid item>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFilter}
                  sx={{
                    borderRadius: 2,
                    padding: '10px 20px',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                  }}
                >
                  Filter
                </Button>
              </Grid>
            </>
          )}
          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortOption}
                onChange={handleSort}
                label="Sort by"
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Full-width Grid for Jewellery Items */}
        <Grid container spacing={2}>
          {jewellery.length > 0 ? (
            jewellery.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card
                  sx={{
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
                    },
                    marginBottom: '20px',
                  }}
                >
                  <Link to={`/jewellery/${item._id}`}>
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="300"
                      image={item.image || 'http://localhost:5173/src/Components/Images/3.png'}
                      title={item.name}
                    />
                  </Link>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No jewellery items found.</Typography>
          )}
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

export default JewelleryPage;
