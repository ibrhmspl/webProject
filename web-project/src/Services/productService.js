import axios from "axios";

export const product = () => {
    let token = localStorage.getItem('token');
    return axios
    .get('http://127.0.0.1:8000/api/product',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}
export const postProduct =  (item)=> {
  let token = localStorage.getItem('token')
  return axios
    .post('http://127.0.0.1:8000/api/product', item,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response)=>{return response.data})
  .catch(function (error) {
    console.log(error);
  });
}
export const putProduct =  (item)=> {
  const id = item.get("id");
  //console.log(id);
  let token = localStorage.getItem('token')
  return axios
    .post('http://127.0.0.1:8000/api/product_update/'+id, item,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const deleteProduct =  (productId)=> {
  let token = localStorage.getItem('token')
  return axios
    .delete('http://127.0.0.1:8000/api/product/'+productId,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}