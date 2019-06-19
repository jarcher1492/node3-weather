const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#mess-1")
const messageTwo = document.querySelector('#mess-2')



weatherForm.addEventListener("submit", (e) => {
     e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch("weather?address=" + location).then((response) => {
        response.json().then((weatherData) => {
            if (weatherData.error) {
            messageOne.textContent = weatherData.error
            
            } else{
                messageOne.textContent = weatherData.location
                messageTwo.textContent = weatherData.forecast
                //console.log(weatherData.forecast) 
                
            }
    
            
        })
    })
})