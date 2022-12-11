import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Navbar from './Navbar';
import { getCategories } from '../Slices/categoriesSlice';
import { getProduct } from '../Slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getStoreProduct } from '../Slices/storeProductSlice';
import { Carousel } from 'antd';
import Grid from '@mui/material/Grid';
import {  getTmpBasket } from '../Slices/tmpBasketSlice';

export default function MediaControlCard() {
  const theme = useTheme();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getStoreProduct());
    dispatch(getTmpBasket());
}, []);

  const products = useSelector((state) => state.product);
  const storeProducts = useSelector((state) => state.storeProduct);
  const categories = useSelector((state) => state.categories);
  const tmpBaskets = useSelector((state) => state.tmpBasket);


  return (
    <>
    <Navbar/>
    <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
          {products?.map((product) =>(
            tmpBaskets?.map((tmpBasket) =>(
              product.id === tmpBasket.product_id ?
              <Grid item key={tmpBasket.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Carousel autoplay>
                  <CardMedia
                    component="img"
                    sx={{
                      pt: '56.25%',
                    }}
                    image={'http://127.0.0.1:8000/Image/' + tmpBasket.get_photos[0]?.path}
                    alt="random"
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={'http://127.0.0.1:8000/Image/' + tmpBasket.get_photos[1]?.path}
                    alt="random"
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={'http://127.0.0.1:8000/Image/' + tmpBasket.get_photos[2]?.path}
                    alt="random"
                  />
                  </Carousel>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <div key={product.id}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                   </Typography>
                   <Typography gutterBottom variant="h5" component="h2">
                    {product.description}
                   </Typography>
                   </div>
                    <Typography gutterBottom variant="h5" component="h2">
                      {tmpBasket.price}
                    </Typography>
                    <Typography>
                    {tmpBasket.stock}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Sepete Ekle</Button>
                  </CardActions>
                </Card>
              </Grid>:null
              ))
            ))}
          </Grid>
        </Container>
        </>
      );
}