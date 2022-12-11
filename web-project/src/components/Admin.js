import * as React from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Navbar from './Navbar';
import { useState } from 'react';
import AddStore from './AddStore';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';


export default function ColorTabs() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  
  return (
    <>
    <Navbar/>
    <Container sx={{ py: 20, mr:43 }} maxWidth="md">
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabIndex} 
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab  label="KATEGORİ EKLE"/> 
        <Tab  label="ÜRÜN EKLE" />
        <Tab  label="MAĞAZA EKLE" />
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {tabIndex == 0 && (
          <AddCategory/>
        )}
        {tabIndex == 1 && (
          <AddProduct/>
        )}
        {tabIndex == 2 && (
          <AddStore/>
        )}
      </Box>
    </Box>
    </Container>
    </>
  );
}