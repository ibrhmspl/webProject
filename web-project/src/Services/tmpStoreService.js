import axios from "axios";
export const tmpstore = () => {
    let token = localStorage.getItem('token');
    return axios
    .get('http://127.0.0.1:8000/api/tmp_store',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}
export const postTmpStore =  (data)=> {
  let token = localStorage.getItem('token')
  let user = JSON.parse(localStorage.getItem('user')); 
  return axios
    .post('http://127.0.0.1:8000/api/tmp_store', {name:data.name, email:data.email, adress:data.adress, tel:data.tel, user_id:user.user.id},{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response)=>{
        console.log(response);
        return response.data
    })
  .catch(function (error) {
    console.log(error);
  });
}
export const putTmpStore =  (id)=> {
    console.log(id);
    let token = localStorage.getItem('token')
    return axios
      .put('http://127.0.0.1:8000/api/tmp_store/'+id,{
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(function (response) {
  
        console.log(response.data);
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
  }

export const deleteTmpStore =  (productId)=> {
  let token = localStorage.getItem('token')
  return axios
    .delete('http://127.0.0.1:8000/api/tmp_store/'+productId,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}