import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Navbar from './Navbar';
import { getUser } from '../Slices/authSlice';
import {getStoreProduct, postStoreProduct} from '../Slices/storeProductSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../Slices/categoriesSlice';
import { getStore } from '../Slices/storeSlice';
import { getProduct } from '../Slices/productSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export default function ActionAreaCard() {
    const user = JSON.parse(localStorage.getItem('user')) ;
  
    const [catId, setCatId] = useState(0);
    const [productId, setProductId] = useState(0);
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [email, setSEmail] = useState();
    const [storeId, setStoreId] = useState();
    function handleChangeStoreId(e) {
        setStoreId(e.target.value);
    }
    function handleChangeCatId(e) {
        setCatId(e.target.value);
    }
    function handleChangeProductId(e) {
      setProductId(e.target.value);
    }
    function handleChangeStock(e) {
      setStock(e.target.value);
    }
    function handleChangePrice(e) {
      setPrice(e.target.value);
    }
    function handleChangeMail(e) {
      setSEmail(e.target.value);
    }
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCategories());
      dispatch(getStore());
      dispatch(getProduct());
      dispatch(getStoreProduct());
      dispatch(getUser());
    }, []);
  
    const categories = useSelector((state) => state.categories);
    const stores = useSelector((state)=>state.store);
    const products = useSelector((state)=>state.product);
    const storeProducts = useSelector((state)=>state.storeProduct);
    const users = useSelector((state)=>state.auth.users);
    const handleStorePost = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget)
        dispatch(postStoreProduct(data)).then(()=>{
          dispatch(getStoreProduct());
        })     
    };
  
    // const handleSendMail = (e) => {
    //   e.preventDefault();
    //   dispatch(getMail({email}));
    // }
  return (
    <>
    <Navbar/>
    <Container sx={{ py: 8 }} maxWidth="sm">
    <Card sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea>
      {stores?.map((store) =>(
        <CardMedia
          component="img"
          sx={{
            width:"100%", height:"100%"
          }}
          height="140"
          image={'http://127.0.0.1:8000/Image/' + store?.get_photos[0].path}
          alt="green iguana"
        />))}
      </CardActionArea><br/><br/><br/>
      <Form onSubmit={handleStorePost}>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categories.name}
          label="Age"
          name='store_id'
          onChange={handleChangeStoreId}
        >
          {users?.map((user)=>(
          <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}
          
        </Select>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categories.name}
          label="Age"
          onChange={handleChangeCatId}
        >
          {categories?.map((category)=>(
          <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
          ))}
          
        </Select>
        {catId > 0  &&(
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categories.name}
          label="Age"
          onChange={handleChangeProductId}
          name='product_id' 
        >
          {products?.map((product)=>(
          <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
          ))}
          
        </Select>
        )}

        {productId > 0  &&(
        <FormControl >
          <TextField name='price' id="outlined-basic" label="Outlined" variant="outlined" />
        </FormControl>)}
        {productId > 0  &&(
        <FormControl >
          <TextField name='stock' id="outlined-basic" label="Outlined" variant="outlined" />
        </FormControl>)}
        {productId > 0  &&(
        <IconButton color="primary" aria-label="upload picture" component="label">
            <input name='images[]' hidden accept="image/*" multiple type="file" />
            <PhotoCamera />
        </IconButton>)}
        {productId > 0  &&(
        <Button type='submit'> ÜRÜN EKLE</Button>)}
       </Form> 
    </Card>
    </Container>
    </>
  );
}