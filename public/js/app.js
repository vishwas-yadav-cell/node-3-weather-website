console.log('hi there! on client side javascript...');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (err) => {
    err.preventDefault();

    const location = search.value

    fetch(`http://localhost:3000/weather/?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Loading...';
                setTimeout(() => {
                    messageOne.textContent = data.error;
                }, 1000);
            } else {
                messageOne.textContent = 'Loading...'
                setTimeout(() => {
                    messageOne.textContent = `${data.forecast}  ${data.address}(${data.location}).`
                }, 1000);
            }
        })
    })

})