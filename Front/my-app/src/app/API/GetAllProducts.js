import axios from "axios";

const URL = "http://127.0.0.1:8000/products/";

const URL1 = "http://127.0.0.1:8000/PersonalProducts/";

export function getallproducts() {
  return new Promise((resolve) =>
    axios.get(URL).then((res) => resolve({ data : res.data}))
  );
}

export function GetAllPersonalProducts(){
  return new Promise((resolve) =>
    axios.get(URL1).then((res) => resolve({ data : res.data}))
  );
}