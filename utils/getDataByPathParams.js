export const getDataByPathParams = (data, airlineName) => {

  return data.filter((flight) => {
    return flight.airline.toLowerCase() === airlineName.toLowerCase()
  })

}

export const getDataByPathParamsAr = (data, ailrlineName) => {

  return data.filter((flight) => {
    return flight["airline"] === ailrlineName
  })

}
