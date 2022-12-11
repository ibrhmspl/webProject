import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import {createCategories} from '../Slices/categoriesSlice';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  p: 4,
};

export default function BasicModal() {
  const dispatch = useDispatch();
  const [catId, setCatId] = useState(0);
  function handleChange(e) {
      setCatId(e.target.value);
  }

  const categories = useSelector((state) => state.categories);
  
  const handleCategoryPost = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
      dispatch(createCategories(data));
  };

  return (
    <div>
      <Form onSubmit={handleCategoryPost}>
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            KATEGORİ ADI
          </Typography><br/>
          <FormControl fullWidth>
          <TextField name='name' id="outlined-basic" label="Outlined" variant="outlined" />
          </FormControl><br/><br/><br/>
          <Button type='submit'> KATEGORİ EKLE</Button>
        </Box>
        </Form>
    </div>
  );
}