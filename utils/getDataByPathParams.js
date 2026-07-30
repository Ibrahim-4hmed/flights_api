export const getDataByPathParams = (data, locationType, locationName) => {

  return data.filter((flight) => {
    return flight[locationType].toLowerCase() === locationName.toLowerCase()
  })

}

export const getDataByPathParamsAr = (data, locationType, locationName) => {

  return data.filter((flight) => {
    return flight[locationType] === locationName
  })

}
