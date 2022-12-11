import axios from "axios";

export const storeProduct = () => {
    let token = localStorage.getItem('token');
    return axios
    .get('http://127.0.0.1:8000/api/store_product',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}
export const postStoreProduct =  (item)=> {
  let token = localStorage.getItem('token');
  let user = JSON.parse(localStorage.getItem('user')); 
  return axios
    .post('http://127.0.0.1:8000/api/store_product', item,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response)=>{
        console.log(response.data);
        return response.data
    })
  .catch(function (error) {
    console.log(error);
  });
}
export const putStoreProduct =  (item)=> {
  const id = item.get("id");
  //console.log(id);
  let token = localStorage.getItem('token')
  return axios
    .post('http://127.0.0.1:8000/api/store_product/'+id, item,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const deleteStoreProduct =  (productId)=> {
  let token = localStorage.getItem('token')
  return axios
    .delete('http://127.0.0.1:8000/api/store_product/'+productId,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}