function temptoC(temp) {
  return Math.round(temp - 273.15)
}

function temptoF(temp) {
  return Math.round((temp - 273.15) * (9/5) + 32)
}

function windDirection(degrees) {
  switch (true) {
    case (degrees < 45) : { return 'N 🡑' }
    case (degrees < 90) : { return 'NE 🡕' }
    case (degrees < 135) : { return 'E 🡒' }
    case (degrees < 180) : { return 'SE 🡖' }
    case (degrees < 225) : { return 'S 🡓' }
    case (degrees < 270) : { return 'SW 🡗' }
    case (degrees < 315) : { return 'W 🡐' }
    case (degrees < 360) : { return 'NW 🡔' }
  }
  
}

function metersToMPH(speed) {
  return Math.round(speed * 2.23694)
}

function getWindP(speed, deg) {
  let para = ''
  para = para.concat('Wind: ')

  if (localStorage.getItem('wind-setting') == 'ms') {
    para = para.concat(speed + ' M/s ')
  } else {
    para = para.concat(metersToMPH(speed) + 'MPH ')
  }

  para = para.concat(windDirection(deg))

  return para
}

function gettemp(temp) {
  let string = ''
  if (localStorage.getItem('temp-setting') == 'f') {
    string = string.concat(temptoF(temp) , '°', ' F')
  } else if (localStorage.getItem('temp-setting') == 'c') {
    string = string.concat(temptoC(temp) , '°', ' C')
  } 

  return string
}

export { temptoC, temptoF, getWindP, gettemp}