const scheme = 'wadouri'
const base = 'http://localhost:9000/studies'
const seriesNumber = 1

export default function (imageId) {
  return `${scheme}:${base}/${seriesNumber}/${imageId}`
}
