const handleResponse = (xhr, parseResponse) => {
    const content = document.querySelector('#content');
    switch(xhr.status){
        case 200:
            content.innerHTML = '<b>Success!</b>';
            break;
        case 201:
            content.innerHTML = '<b>Created!</b>';
        break;
      case 204:
        content.innerHTML = '<b>Updated (No Content)!</b>';
            break;
        case 400:
            content.innerHTML = '<b>Bad Request :-(</b>';
            break;
        case 404:
        content.innerHTML = '<b>Resource Not Found</b>';
            break;
        default:
        content.innerHTML = '<b>Error code not implemented by client :-()</b>';
            break;
    }
    if(parseResponse){
        const obj = JSON.parse(xhr.response);
        console.dir(obj);
        content.innerHTML = `<p>${xhr.response}</p>`;
    }else{
        content.innerHTML = `<p>metadata received</p>`;
    }
  };

  const requestUpdate = (e, userForm) => {
    const url = userForm.querySelector('#dataCenter').value;
    const method = 'get';
    const xhr = new XMLHttpRequest();
    xhr.open(method,url);
    xhr.setRequestHeader("Accept","application/json");
    if(method === 'get'){
        xhr.onload = () => handleResponse(xhr,true);
    }else{
        xhr.onload = () => handleResponse(xhr,false);
    }
    xhr.send();
    e.preventDefault();
    return false;
  };

  const sendPost = (e, nameForm) => {
    e.preventDefault();
    const nameAction = nameForm.getAttribute("action");
    const nameMethod = nameForm.getAttribute("method");
    const nameField = nameForm.querySelector("#nameField");
    const dataCenterField = nameForm.querySelector("#dataCenter");
    const highEndContentField = nameForm.querySelector("#highEndContent");
    const minItemLevelField = nameForm.querySelector("#itemLevelField");
    const xhr = new XMLHttpRequest();
    xhr.open(nameMethod,nameAction);
    xhr.setRequestHeader('Accept','application/json');
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.onload = () => handleResponse(xhr,true);
    const formData = `name=${nameField.value}&server=${dataCenterField.value}&content=${highEndContentField.value}&minItemLevel=${minItemLevelField.value}`;
    xhr.send(formData);
    return false;
  };


  const init = () => {
    //GET and HEAD button requests
    const getPartyForm = document.querySelector('#getParties');
    const getUsers = (e) => requestUpdate(e, getPartyForm);
    getPartyForm.addEventListener('submit', getUsers);
    //POST button request
    const partyForm = document.querySelector('#postParty');
    const addParty = (e) => sendPost(e, partyForm);
    partyForm.addEventListener('submit', addParty);
  };

  window.onload = init;