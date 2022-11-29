// https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=e0ed2c851fc4314dee46653cefbac5a6&units=metric
// https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg


const input = document.querySelector("#input-search") ;
const btnResult = document.querySelector(".result");
const error = document.querySelector(".error");
const list = document.querySelector(".list-ct");



input.focus();

const key = "e0ed2c851fc4314dee46653cefbac5a6" ;

btnResult.addEventListener("click" , e => {

    e.preventDefault();


    if (!navigator.onLine){

        alert("اینترنت شما قطع است لطفا آن را بررسی کنید.");
        return ;
    }

    if (input.value === "") {

        alert("لطفا نام شهر مورد نظر را وارد کنید");
        return ;
    }
    
    const val = input.value ;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${key}&units=metric` ;

    fetch(url)
        .then(Response => Response.json())
        .then(json => {

            const {name , sys , main , weather} = json ;

            const temp = Math.floor(main.temp);
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg` ;
            console.log(url);

            const li = document.createElement("li");
            
            li.innerHTML = `
            <h2 class='city-name'>
                <div class='left'>
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </div>

                <i class="fa-solid fa-circle-xmark close"></i>
            </h2>

            <div class='city-temp'>${temp}<sub>C</sub></div>

            <figure>

                <img src='${icon}' class='weather-icon' alt='city'>
                <figurecaption>${weather[0]["description"]}</figurecaption>
            ` ;

            list.appendChild(li);
            li.style.animation = "zoomIn 0.4s";
            error.style.display = "none" ;

            
        })
        .catch(() => {
            error.style.display = "flex" ;
            error.style.animation = "blns 1s" ;
        })

        input.value = "" ;
        error.style.animation = "none" ;
        input.focus();


    
})

input.focus();


list.addEventListener("click" , function(e){

    const hadaf = e.target ;

    if (hadaf.classList.contains("close")) {

        hadaf.parentElement.parentElement.style.animation = "zoomOut 0.3s" ;

        function remo(){

            hadaf.parentElement.parentElement.remove();
        
        }

        setTimeout(remo , 200);
        
       
        
    }


})