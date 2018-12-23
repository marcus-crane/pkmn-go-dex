import { TYPE_COLOUR_MAP } from "./constants"

export const generateBackground = (types) => {
  switch(types.length) {
  case 0:
    console.error("Impossible (right?), that's a bug probably")
    break
  case 1:
    const type = types[0].toUpperCase()
    return TYPE_COLOUR_MAP[type]
  case 2:
    const typeOne = TYPE_COLOUR_MAP[types[0].toUpperCase()]
    const typeTwo = TYPE_COLOUR_MAP[types[1].toUpperCase()]
    return `linear-gradient(45deg, ${typeOne} 50%, ${typeTwo} 50%)`
  default:
    return "transparent"
  }
}