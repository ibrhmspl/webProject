import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postTmpStore } from "../Slices/tmpStoreSlice"; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Navbar from './Navbar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  p: 4,
};

export default function StoreApplication() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [adress, setAdress] = useState();
    const [tel, setTel] = useState();
    
    let navigate = useNavigate();
    const dispatch = useDispatch();
  
    const onChangeName = (e) => {
      const name = e.target.value;
      setName(name);
    };
    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };
    const onChangeAdress = (e) => {
      const adress = e.target.value;  
      setAdress(adress);
    };
    const onChangeTel = (e) => {
        const tel = e.target.value;  
        setTel(tel);
      };

    const handleStorePost = (e) => {
        e.preventDefault();
        console.log({ name, email, adress, tel });
          dispatch(postTmpStore({name, email, adress, tel}))
            .then(() => {
                navigate('/Main');
                alert("Store başvurunuz alınmıştır. Onay bekleniyor");  
            })
            .catch();
         
      };
  
    return (
      <div>
        <Navbar/>
          <Box sx={style} >
            <h1>MAĞAZA BAŞVURU EKRANI</h1>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              MAĞAZA ADI
            </Typography><br/>
            <FormControl fullWidth>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={onChangeName} />
            </FormControl><br/><br/>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              EMAİL
            </Typography><br/>
            <FormControl fullWidth>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={onChangeEmail} />
            </FormControl><br/><br/>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              TEL NO
            </Typography><br/>
            <FormControl fullWidth>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={onChangeTel}/>
            </FormControl><br/><br/>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ADRES 
            </Typography><br/>
            <FormControl fullWidth>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={onChangeAdress}/>
            </FormControl><br/><br/><br/>
            <Button onClick={handleStorePost}> KATEGORİ EKLE</Button>
          </Box>
      </div>
    );
  }