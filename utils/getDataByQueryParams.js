export const getDataByQueryParams = (data, querys) => {
  const {from, to} = querys
  return data.filter(flight => {
    return flight.fromCountry.toLowerCase() === from.toLowerCase() &&
    flight.toCountry.toLowerCase() === to.toLowerCase()
  })
}