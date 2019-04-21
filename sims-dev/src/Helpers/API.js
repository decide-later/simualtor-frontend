const host = "http://localhost:8080"

const apiEndpoints = {
    "main" : host + "/view/?view=main",
}
function queryfyBody(body){
  let str = "/view/?";
  for(var key in body){
    str += key + "=" + body[key]+ "&";
  }
  return str;
}

const API = (form, url) => {
  if(!url){ 
    url = apiEndpoints[form.endpoint] || host + queryfyBody(form.body); //prioritised known endpoints
  }
  let opts = {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
    },
    method: form.method,
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  }
  if(form.method !== 'get'.toUpperCase())
    opts["body"] = form.body;

  return fetch (url, opts)
  .then(res => res.json())
  .catch((e) => {
      console.log(e)
  })
};


export default API;