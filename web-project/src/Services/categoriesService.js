import axios from "axios";

export const categories = () => {
    let token = localStorage.getItem('token');
    return axios
    .get('http://127.0.0.1:8000/api/main_category',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function (response) {
      return response.data
      
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const postCategories =  (item)=> {
  let token = localStorage.getItem('token')
  return axios
    .post('http://127.0.0.1:8000/api/main_category', item,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response)=>{return response.data})
  .catch(function (error) {
    console.log(error);
  });
}

export const putCategories =  ({categoryId,name})=> {
  let token = localStorage.getItem('token')
  return axios
    .put('http://127.0.0.1:8000/api/main_category/'+categoryId, {categoryId,name},{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const deleteCategories =  (categoryId)=> {
  console.log(categoryId);
  let token = localStorage.getItem('token')
  return axios
    .delete('http://127.0.0.1:8000/api/main_category/'+ categoryId,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}