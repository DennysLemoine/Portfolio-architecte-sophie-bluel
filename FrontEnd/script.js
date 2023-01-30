fetch ('http://localhost:5678/api/categories', {
    method: 'GET',
    headers: {
        'Content-Type' : 'application/json'
    },
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

fetch ('http://localhost:5678/api/works', {
    method: 'GET',
    headers: {
        'Content-Type' : 'application/json'
    },
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));