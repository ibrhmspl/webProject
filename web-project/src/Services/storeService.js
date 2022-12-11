import axios from "axios";

export const store = () => {
    let token = localStorage.getItem('token');
    return axios
    .get('http://127.0.0.1:8000/api/store',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}
export const postStore =  ({name, email, adress, tel})=> {
  let token = localStorage.getItem('token')
  return axios
    .post('http://127.0.0.1:8000/api/store', {name, email, adress, tel},{
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
export const putStore =  (item)=> {
  const id = item.get("id");
  //console.log(id);
  let token = localStorage.getItem('token')
  return axios
    .post('http://127.0.0.1:8000/api/store/'+id, item,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const deleteStore =  (productId)=> {
  let token = localStorage.getItem('token')
  return axios
    .delete('http://127.0.0.1:8000/api/store/'+productId,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}