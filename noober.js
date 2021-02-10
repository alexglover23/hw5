function levelOfService(ride) {
  let levelOfService
  if (ride.length > 1) {
    levelOfService = 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    levelOfService = 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    levelOfService = 'Noober XL'
  } else {
    levelOfService = 'Noober X'
  }
  return levelOfService
}

function renderRides(ridesArray) {
  for (let i = 0; i < ridesArray.length; i++) {
    let ride = ridesArray[i]

    document.querySelector('.rides').insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService(ride)}</span>
      </h1>
    `)

    let borderClass
    let backgroundClass
    if (levelOfService(ride) == 'Noober Purple') {
      borderClass = 'border-purple-500'
      backgroundClass = 'bg-purple-600'
    } else {
      borderClass = 'border-gray-900'
      backgroundClass = 'bg-gray-600'
    }

    for (let i = 0; i < ride.length; i++) {
      let leg = ride[i]

      document.querySelector('.rides').insertAdjacentHTML('beforeend', `
        <div class="border-4 ${borderClass} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl ${backgroundClass} text-white p-2">
                ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div>
      `)
    }
  }
}

window.addEventListener('DOMContentLoaded', function() {
  // YOUR CODE

  // 1. identify the all rides button and print console log
  let allRides = document.querySelector('#all-filter')
  allRides.addEventListener('click', async function(event) {
    event.preventDefault()
    document.querySelector('.rides').innerHTML = '' // clear results from other buttons
    console.log('i clicked the all rides button')

    // 2a. request the ride data from the API
    let response = await fetch('https://kiei451.com/api/rides.json')
    console.log(response)
    let json = await response.json()
    console.log(json)

    // 2b. pass the ride array to renderRides() function to display all the rides
    renderRides(json)
  })

  // 3. identify the noober purple button
  let purpleRides = document.querySelector('#noober-purple-filter')
  purpleRides.addEventListener('click', async function(event) {
    event.preventDefault()
    document.querySelector('.rides').innerHTML = '' // clear results from other buttons
    console.log('i clicked the noober purple rides button')

    // 4a. request the ride data from the API
    let response = await fetch('https://kiei451.com/api/rides.json')
    console.log(response)
    let json = await response.json() // json is the entire array that contains each ride array
    
    // 4b. declare new empty array
    let purpleArray = []

    // 4c. loop through the rides and determine level of service + push relevant arrays for given button
    for (let i = 0; i < json.length; i++) {
      let rideRequests = json[i] // new array created to store all rides
      let service = levelOfService(rideRequests)
      
      if (service == 'Noober Purple') {
        purpleArray.push(rideRequests) // push ride information to the array
      }
    }

    // 4d. pass the new array to render function
    renderRides(purpleArray)
  })

  // 5. identify the noober pool button
  let poolRides = document.querySelector('#noober-pool-filter')
  poolRides.addEventListener('click', async function(event) {
    event.preventDefault()
    document.querySelector('.rides').innerHTML = '' // clear results from other buttons
    console.log('i clicked the noober pool rides button')
    
    let response = await fetch('https://kiei451.com/api/rides.json')
    console.log(response)
    let json = await response.json() // json is the entire array that contains each ride array
    
    let poolArray = [] // declare new empty array
    for (let i = 0; i < json.length; i++) {
      let rideRequests = json[i] // new array created to store all rides
      let service = levelOfService(rideRequests)
      
      if (service == 'Noober Pool') {
        poolArray.push(rideRequests) // push ride information to the array
      }
    }
    renderRides(poolArray)
  })

  // 5. identify the noober xl button
  let xlRides = document.querySelector('#noober-xl-filter')
  xlRides.addEventListener('click', async function(event) {
    event.preventDefault()
    document.querySelector('.rides').innerHTML = '' // clear results from other buttons
    console.log('i clicked the noober xl rides button')
    
    let response = await fetch('https://kiei451.com/api/rides.json')
    console.log(response)
    let json = await response.json() // json is the entire array that contains each ride array
    
    let xlArray = [] // declare new empty array
    for (let i = 0; i < json.length; i++) {
      let rideRequests = json[i] // new array created to store all rides
      let service = levelOfService(rideRequests)
      
      if (service == 'Noober XL') {
        xlArray.push(rideRequests) // push ride information to the array
      }
    }
    renderRides(xlArray)
  })

  // 5. identify the noober x button
  let xRides = document.querySelector('#noober-x-filter')
  xRides.addEventListener('click', async function(event) {
    event.preventDefault()
    document.querySelector('.rides').innerHTML = '' // clear results from other buttons
    console.log('i clicked the noober x rides button')

    let response = await fetch('https://kiei451.com/api/rides.json')
    console.log(response)
    let json = await response.json() // json is the entire array that contains each ride array

    let xArray = [] // declare new empty array
    for (let i = 0; i < json.length; i++) {
      let rideRequests = json[i] // new array created to store all rides
      let service = levelOfService(rideRequests)
      
      if (service == 'Noober X') {
        xArray.push(rideRequests) // push ride information to the array
      }
    }
    renderRides(xArray)
  })
})

