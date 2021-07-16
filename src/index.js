import cornerstone from 'cornerstone-core'
//
import setupCornerstone from './setupCornerstone.js'
import appState from './appState.js'
import getUrlForImageId from './lib/getUrlForImageId.js'
import getMprUrl from './lib/getMprUrl.js'
import setupNiftiLoader from './setupNiftiLoader.js'
import { mat4 } from 'gl-matrix'

async function kickstartApp () {
  // Setup
  const seriesNumber = 0
  setupCornerstone(seriesNumber)
  setupNiftiLoader()

 // const originalSeriesElement = document.getElementById('cornerstone-target')
  const mprAxialSeriesElement = document.getElementById('axial-target')
  const mprCoronalSeriesElement = document.getElementById('coronal-target')
  const mprSagittalSeriesElement = document.getElementById('sagittal-target')
 // var ctx = canvas.getContext('2d')
 // let imageData = ctx.createImageData(canvas.width, canvas.height)
 // let data = imageData.data

  // Display original series
  const seriesImageIds = appState.series[seriesNumber]
  const imageUrl = getUrlForImageId(seriesImageIds[0])
  // console.log(imageUrl) // wadouri:http://localhost:9000/studies/1/1.dcm
 /* cornerstone.loadAndCacheImage(imageUrl).then(image => {
    console.log(image)
    cornerstone.displayImage(originalSeriesElement, image)
  })
*/
  // ~~ AXIAL
  // Image orientation patient (IOP)
  const axial = mat4.create()
  const axialIop = new Float32Array([
    axial[0], axial[1], axial[2],
    axial[4], axial[5], axial[6]
  ])
  const axialIopAsString = axialIop.join()
  // const axialMprUrl = getMprUrl(axialIopAsString, "0,0,97.5");
  const axialMprUrl = getMprUrl(axialIopAsString) // 生成一个url
  // console.log(axialMprUrl)// mpr:0:1,0,0,0,1,0:center
  cornerstone.loadAndCacheImage(axialMprUrl).then(image => {
    cornerstone.displayImage(mprAxialSeriesElement, image)
  })

  // ~~ CORONAL
  // Image orientation patient (IOP)
  const coronalIop = new Float32Array([
    1, 0, 0,
    0, 0, -1
  ])
  const coronalIopAsString = coronalIop.join()
  // const coronalMprUrl = getMprUrl(coronalIopAsString, "0,69.3642578125,0");
  const coronalMprUrl = getMprUrl(coronalIopAsString)
  // console.log(coronalMprUrl) // mpr:0:1,0,0,0,0,-1:center
  cornerstone.loadAndCacheImage(coronalMprUrl).then(image => {
    cornerstone.displayImage(mprCoronalSeriesElement, image)
  })

  // ~~ SAGITTAL
  // Image orientation patient (IOP)
  const sagittalIop = new Float32Array([
    0, 1, 0,
    0, 0, -1
  ])
  const sagittalIopAsString = sagittalIop.join()
  // const sagittalMprUrl = getMprUrl(sagittalIopAsString, "69.3642578125,0,0");
  const sagittalMprUrl = getMprUrl(sagittalIopAsString)
  // console.log(sagittalMprUrl) // mpr:0:0,1,0,0,0,-1:center
  cornerstone.loadAndCacheImage(sagittalMprUrl).then(image => {
    cornerstone.displayImage(mprSagittalSeriesElement, image)
  })
}

kickstartApp()

// const _planeAxes = [
//     // Axial
//     // 1, 0, 0, 0,
//     // 0, 1, 0, 0,
//     // 0, 0, 1, 0,
//     // 0, 0, 0, 1   // 0, 1, slice
//     mat4.create(),
//     // Coronal
//     mat4.fromValues(
//         1, 0, 0, 0,
//         0, 0, -1, 0,
//         0, 1, 0, 0,
//         0, 0, 0, 1), // 0, slice, 2
//     // Sagittal
//     mat4.fromValues(
//         0, 1, 0, 0,
//         0, 0, -1, 0,
//         -1, 0, 0, 0,
//         0, 0, 0, 1), // slice, 1, 2
//     // Oblique
//     mat4.fromValues(
//         1, 0, 0, 0,
//         0, 0.866025, 0.5, 0,
//         0, -0.5, 0.866025, 0,
//         0, 0, 0, 1) // 0, 1, 2
// ]
