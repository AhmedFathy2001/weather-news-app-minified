"use strict";const dayOne=document.getElementById("firstDay"),dayTwo=document.getElementById("secondDay"),dayThree=document.getElementById("thirdDay"),search=document.getElementById("searchBar"),animationSelector=document.querySelector("label.span-animation-selector"),weatherPage=document.getElementById("weatherPage"),newsPage=document.getElementById("newsPage"),active=document.querySelector("li.nav-item.active-nav a"),news=document.getElementById("news"),home=document.getElementById("weather"),contact=document.getElementById("contact"),searchLabel=document.getElementById("searchLabel"),header=document.getElementById("header"),inputs=document.querySelectorAll("input.input-selector"),textareaDesc=document.getElementById("desc"),navBtn=document.getElementById("btnToggler"),directions={N:"North",E:"East",W:"West",S:"South"},session=sessionStorage.getItem("page")?sessionStorage.getItem("page"):"weather",classes=["weather-page","news-page","contact-page"];function debounce(e,t=300){let a;return(...n)=>{clearTimeout(a),a=setTimeout(()=>{e.apply(this,n)},t)}}"weather"==session?(document.body.classList.remove(...classes),document.body.classList.add("weather-page")):"news"==session?(document.body.classList.remove(...classes),document.body.classList.add("news-page"),header.innerText="news"):(document.body.classList.remove(...classes),document.body.classList.add("contact-page"),header.innerText="contact"),navBtn.addEventListener("click",()=>{navBtn.classList.contains("collapsed")?navBtn.classList.remove("change"):navBtn.classList.add("change")});let currentLocation=async function(){let e=await fetch("https://ipapi.co/json/"),t=await e.json();return t.city?t.city:"alexandria"}();function placeholderFix(){""==searchBar.value||null==searchBar.value?animationSelector.classList.remove("span-animation"):animationSelector.classList.add("span-animation")}async function getWeather(e){let t=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=78d46ef554d74befba3122059210510&q=${e||await currentLocation}&days=3&aqi=no&alerts=no`),a=await t.json();dayOne.innerHTML=`\n<div class="header-first d-flex justify-content-between p-2">\n    <span>${(new Date).toLocaleString("default",{weekday:"long"})}</span>\n    <span>${(new Date).toLocaleString("en-GB",{day:"numeric",month:"long"})}</span>\n</div>\n<div class="body-first py-4 px-3">\n    <p class="location">${a.location.name}, ${a.location.country}</p>\n    <div class="currentweather d-flex justify-content-between">\n        <span class="degree">${a.current.temp_c}°C</span>\n        <span class="status-img"><img class="w-100" src="${a.current.condition.icon}" alt="weather condition"></span>\n    </div>\n    <div class="footer">\n        <p class="status">${a.current.condition.text}</p>\n        <span><i class="fas fa-umbrella"></i> <span>${a.current.humidity}%</span></span>\n        <span><i class="fas fa-wind"></i> <span>${a.current.wind_kph} km/h</span></span>\n        <span><i class="far fa-compass"></i> <span>${a.current.wind_dir.split("").map(e=>directions[e]).join(" ")}</span></span>\n    </div>\n</div>\n        `,dayTwo.innerHTML=`\n<div class="header-mid text-center rounded-0 py-2">\n    <p class="mb-0">${new Date(a.forecast.forecastday[1].date).toLocaleString("default",{weekday:"long"})}</p>\n</div>\n<div class="body-mid pb-2 px-3 rounded-0">\n        <span class="status-img-other mb-4 d-flex justify-content-center"><img src="${a.forecast.forecastday[1].day.condition.icon}" alt="weather condition day one"></span>\n    <div class="currentweather d-flex align-items-center flex-column mb-3">\n        <div class ="maxtemp text-white">${a.forecast.forecastday[1].day.maxtemp_c}°C</div>\n        <div class ="mintemp">${a.forecast.forecastday[1].day.mintemp_c}°</div>\n    </div>\n    <div class="footer d-flex justify-content-center my-4">\n        <p class="status">${a.forecast.forecastday[1].day.condition.text}</p>\n    </div>\n</div>`,dayThree.innerHTML=`\n<div class="header-last text-center py-2">\n    <p class="mb-0">${new Date(a.forecast.forecastday[2].date).toLocaleString("default",{weekday:"long"})}</p>\n</div>\n<div class="body-last pb-2 px-3 adjustments">\n        <span class="status-img-other mb-4 d-flex justify-content-center"><img src="${a.forecast.forecastday[2].day.condition.icon}" alt="weather condition day two"></span>\n    <div class="currentweather d-flex align-items-center flex-column mb-3">\n        <div class ="maxtemp text-white">${a.forecast.forecastday[2].day.maxtemp_c}°C</div>\n        <div class ="mintemp">${a.forecast.forecastday[2].day.mintemp_c}°</div>\n    </div>\n    <div class="footer d-flex justify-content-center my-4">\n        <p class="status">${a.forecast.forecastday[2].day.condition.text}</p>\n    </div>\n</div>`}async function getNews(e){let t,a=await fetch(`https://api.newscatcherapi.com/v2/latest_headlines?countries=${e||"us"}&topic=news&lang=en&page_size=18`,{method:"GET",headers:{"x-api-key":"DBkfmuLb8i0lMy0BBETwAq2GHVPPYIMJhvxwEB9j6oA"}}),n=await a.json(),s="",c=n.articles.length-n.articles.length%3;for(let e=0;e<c;e++)t=n.articles[e].summary?n.articles[e].summary.split(" ").length>15?n.articles[e].summary.split(" ").splice(0,15).join(" ")+"...":n.articles[e].summary:n.articles[e].excerpt?n.articles[e].excerpt.split(" ").length>15?n.articles[e].excerpt.split(" ").splice(0,15).join(" ")+"...":n.articles[e].excerpt:"",s+=`\n        <div class="col-md-6 col-lg-4" dir="auto">\n        <a target="_blank" href="${n.articles[e].link}" class="position-relative d-inline-block w-100">\n        <i class="fas fa-external-link-alt position-absolute"></i>\n        <img src="${n.articles[e].media?n.articles[e].media:"../images/news-default.webp"}" alt="news thumbnail" onerror="this.src='../images/news-default.webp';" class="w-100 newsimg">\n        </a>\n        <h4 class="title text-white">\n        ${n.articles[e].title.split(" ").length>5?n.articles[e].title.split(" ").splice(0,5).join(" ")+"...":n.articles[e].title}\n        </h4>\n        <p class="description">${t}</p>\n    </div>`;document.getElementById("newsPageRow").innerHTML=s}function goHome(){sessionStorage.clear(),document.body.classList.remove(...classes),document.body.classList.add("weather-page"),header.innerText="weather",document.title="Weather"}function contactPlaceholder(e){""==e.value||null==e.value?e.nextElementSibling.classList.remove("span-animation1"):e.nextElementSibling.classList.add("span-animation1")}function textareaPlaceholder(){""==textareaDesc.value||null==textareaDesc.value?textareaDesc.nextElementSibling.classList.remove("textarea-animation"):textareaDesc.nextElementSibling.classList.add("textarea-animation")}searchBar.addEventListener("keyup",debounce(()=>{placeholderFix(),document.body.classList.contains("weather-page")?getWeather(searchBar.value):getNews(searchBar.value)})),news.addEventListener("click",()=>{searchBar.value="",placeholderFix(),searchLabel.innerHTML="Search by Country code (us-gb-eg)"}),home.addEventListener("click",()=>{searchBar.value="",placeholderFix(),searchLabel.innerHTML="Search City or Zip Code"}),contact.addEventListener("click",()=>{inputs.forEach(e=>{e.value="",contactPlaceholder(e)}),textareaDesc.value="",textareaPlaceholder()}),document.querySelectorAll("li.nav-item").forEach(e=>{e.addEventListener("click",()=>{document.body.classList.remove(...classes),document.body.classList.add(`${e.id}-page`),header.innerText=`${e.id}`;const t=e.id,a=t.charAt(0).toUpperCase()+t.slice(1);document.title=a,sessionStorage.setItem("page",`${e.id}`)})}),getWeather(),getNews(),textareaDesc.addEventListener("keyup",()=>{textareaPlaceholder()}),inputs.forEach(e=>{e.addEventListener("keyup",()=>{contactPlaceholder(e)})});