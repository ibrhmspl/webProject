import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { getCategories } from '../Slices/categoriesSlice';
import { getProduct } from '../Slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function FileSystemNavigator() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategories());
}, []);

  const products = useSelector((state) => state.product);
  const categories = useSelector((state) => state.categories);

  return (
    
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <h3>Kategoriler</h3>
      {categories?.map((category) =>(    
      <TreeItem nodeId={category.id} label={category.name}>
        {products?.map((product) =>(
              category.id === product.main_category_id ?
         <TreeItem onClick={()=>console.log(product.name)} nodeId={product.id+10} label={product.name} />:null))}
      </TreeItem>))}
    </TreeView>
    
  );
}