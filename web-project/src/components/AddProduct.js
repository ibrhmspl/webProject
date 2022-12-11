import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { getCategories } from '../Slices/categoriesSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct } from '../Slices/productSlice';
import Form from 'react-bootstrap/Form';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 350,
  bgcolor: 'background.paper',
  p: 4,
};

export default function BasicModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCategories());
    }, []);

    const categories = useSelector((state) => state.categories);

    const [catId, setCatId] = useState(0);
    function handleChange(e) {
        setCatId(e.target.value);
    }

    const handleProductPost = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget)
        dispatch(postProduct(data)).then(()=>{
          handleClose();
        });
    };


  return (
    <div>
      <Form onSubmit={handleProductPost}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            KATEGORİ SEÇ
          </Typography><br/>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categories.name}
          label="Age"
          onChange={handleChange}
          name='main_category_id' 
        >
          {categories?.map((category)=>(
          <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
          ))}
          
        </Select>
      </FormControl><br/><br/><br/>
      <Typography id="modal-modal-title" variant="h6" component="h2">
            ÜRÜN EKLE
          </Typography><br/>
          <FormControl fullWidth>
          <TextField name='name' id="outlined-basic" label="Outlined" variant="outlined" /><br/>
          <TextField name='description' id="outlined-basic" label="Outlined" variant="outlined" />
      </FormControl><br/><br/><br/>
          <Button type='submit'> ÜRÜN EKLE</Button>
        </Box>
        </Form>
    </div>
  );
}