import { temptoF, temptoC, getWindP, gettemp } from './dataHandling'

const apikey = 'fbbb97180ff8df65770a151ec3b87789'
const f = document.getElementById('f')
const c = document.getElementById('c')
const ms = document.getElementById('ms')
const mph = document.getElementById('mph')
const form = document.getElementById('form')
const notFound = document.getElementById('not-found')

form.addEventListener('submit', (e)=>{
  e.preventDefault()
  buildPage(e.target.children[1].value)
})

if (localStorage.getItem('temp-setting') == null)  {
  localStorage.setItem('temp-setting', 'f')
} else {
  if (localStorage.getItem('temp-setting') == 'f') {
    c.classList.remove('bold')
    f.classList.add('bold')
  } else {
    f.classList.remove('bold')
    c.classList.add('bold')
  }
}


if (localStorage.getItem('wind-setting') == null)  {
  localStorage.setItem('wind-setting', 'mph')
} else {
  if (localStorage.getItem('wind-setting') == 'ms') {
    mph.classList.remove('bold')
    ms.classList.add('bold')
  } else {
    ms.classList.remove('bold')
    mph.classList.add('bold')
  }
}

if (localStorage.getItem('city') == null)  {
  localStorage.setItem('city', 'portland')
}

document.getElementById('temp-setting').addEventListener('click', ()=>{
  if (localStorage.getItem('temp-setting') == 'f') {
    localStorage.setItem('temp-setting', 'c')
    f.classList.remove('bold')
    c.classList.add('bold')
  } else {
    localStorage.setItem('temp-setting', 'f')
    c.classList.remove('bold')
    f.classList.add('bold')
  }

  location.reload()
})

document.getElementById('wind-setting').addEventListener('click', ()=>{
  if (localStorage.getItem('wind-setting') == 'mph') {
    localStorage.setItem('wind-setting', 'ms')
    mph.classList.remove('bold')
    ms.classList.add('bold')
  } else {
    localStorage.setItem('wind-setting', 'mph')
    ms.classList.remove('bold')
    mph.classList.add('bold')
  }

  location.reload()
})

async function getWeatherData(city) {
  let data

  try {
    data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apikey, {mode: 'cors'})
    notFound.classList.add('hidden')
    return data.json()
  } catch (error) {
    console.log('error in getWeatherData')
  }
}

async function buildPage(city) {
  
  try {
    const data = await getWeatherData(city)
    const header = document.getElementById('header')
    const temperature = document.getElementById('temp')
    const high = document.getElementById('high')
    const low = document.getElementById('low')
    const wind = document.getElementById('wind')
    const humidity = document.getElementById('humidity')

    localStorage.setItem('city', city)

    header.innerHTML = '☁️ Weather in ' + data.name + ' ☁️'

    temperature.innerHTML = 'Temperature Now: ' + gettemp(data.main.temp)

    high.innerHTML = 'High for Today: ' + gettemp(data.main.temp_max)

    low.innerHTML = 'Low for Today: ' + gettemp(data.main.temp_min)
    
    wind.innerHTML = getWindP(data.wind.speed, data.wind.deg)

    humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%'

    notFound.classList.add('hidden')
  } catch (error) {
    console.log(error)
    notFound.classList.remove('hidden')
  }

}

buildPage(localStorage.getItem('city'))