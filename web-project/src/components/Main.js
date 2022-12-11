import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './Navbar';
import { getCategories } from '../Slices/categoriesSlice';
import { getProduct } from '../Slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Carousel } from 'antd';
import { getStoreProduct } from '../Slices/storeProductSlice';
import CheckBox from './CheckBox';
import Form from 'react-bootstrap/Form';
import { getStore } from '../Slices/storeSlice';
import { postTmpBasket, getTmpBasket } from '../Slices/tmpBasketSlice';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link  color="inherit" href="/StoreApplication">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();

export default function Album() {  
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };  
const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getStoreProduct());
    dispatch(getCategories());
    dispatch(getStore());
}, []);

  const products = useSelector((state) => state.product);
  const storeProducts = useSelector((state) => state.storeProduct);
  const stores = useSelector((state)=>state.store);
  const categories = useSelector((state) => state.categories);
  const [tabIndex, setTabIndex] = useState(0);  
  
  // const handleStorePost = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget.value)
  //     dispatch(postTmpBasket(data)).then(()=>{
  //       dispatch(getTmpBasket());
  //     })     
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar/>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
             TEKNOLOJİ MARKET
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* <CheckBox/> */}
          <Grid container spacing={4}>
          
          {products?.map((product) =>(
            storeProducts?.map((storeProduct) =>(
              product.id === storeProduct.product_id ?
              <Grid item key={storeProduct.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Carousel autoplay>
                  <CardMedia name='images[]'
                    component="img"
                    sx={{
                      pt: '56.25%',
                    }}
                    image={'http://127.0.0.1:8000/Image/' + storeProduct.get_photos[0]?.path}
                    alt="random"
                  />
                  <CardMedia name='images[]'
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={'http://127.0.0.1:8000/Image/' + storeProduct.get_photos[1]?.path}
                    alt="random"
                  />
                  <CardMedia name='images[]'
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={'http://127.0.0.1:8000/Image/' + storeProduct.get_photos[2]?.path}
                    alt="random"
                  />
                  </Carousel>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography name='product_id' gutterBottom variant="h5" component="h2">
                    {product.name}
                   </Typography>
                   <Typography gutterBottom variant="h5" component="h2">
                    {product.description}
                   </Typography>
                   {stores?.map((store) =>(
                   <Typography name='store_id' key={store.id} gutterBottom variant="h5" component="h2">
                    {store.name}
                   </Typography>))}
                    <Typography name='price' gutterBottom variant="h5" component="h2">
                      {storeProduct.price}
                    </Typography>
                    <Typography name='stock'>
                    {storeProduct.stock}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button type='submit' size="small">Sepete Ekle</Button>
                  </CardActions>
                  
                </Card>
              </Grid>:null
              ))
            ))}
          
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}