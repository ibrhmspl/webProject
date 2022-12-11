import axios from "axios";

export const tmpBasket = () => {
    let token = localStorage.getItem('token');
    return axios
    .get('http://127.0.0.1:8000/api/tmp_basket',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}
export const postTmpBasket =  ({store_id,product_id,price,stock})=> {
  let token = localStorage.getItem('token');
  let user = JSON.parse(localStorage.getItem('user')); 
  return axios
    .post('http://127.0.0.1:8000/api/tmp_basket', {store_id,product_id,price,stock},{
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
export const putTmpBasket =  (item)=> {
  const id = item.get("id");
  //console.log(id);
  let token = localStorage.getItem('token')
  return axios
    .post('http://127.0.0.1:8000/api/tmp_basket/'+id, item,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}