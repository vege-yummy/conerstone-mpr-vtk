import * as cornerstone from 'cornerstone-core'
import * as cornerstoneMath from 'cornerstone-math'
import * as cornerstoneNIFTIImageLoader from 'cornerstone-nifti-image-loader'
export default function () {
  // setDependency
  cornerstoneNIFTIImageLoader.external.cornerstone = cornerstone

  cornerstoneNIFTIImageLoader.nifti.streamingMode = true

  const nifti_z = document.getElementById('nifti-image-z')
  const nifti_x = document.getElementById('nifti-image-x')
  const nifti_y = document.getElementById('nifti-image-y')
  cornerstone.enable(nifti_z, {
    renderer: 'webgl'
  })
  cornerstone.enable(nifti_x, {
    renderer: 'webgl'
  })
  cornerstone.enable(nifti_y, {
    renderer: 'webgl'
  })
  let url = 'studies/5.25_HM-RA-ILD.nii.gz'
  loadAndViewImage(nifti_z, `nifti:${url}`, 'z')
  loadAndViewImage(nifti_x, `nifti:${url}`, 'x')
  loadAndViewImage(nifti_y, `nifti:${url}`, 'y')

  // 鼠标滚轮事件  用于切换slice
  nifti_z.addEventListener('wheel', (evt) => {
    var currentImageId = cornerstone.getImage(nifti_z).imageId // nifti:studies/5.25_HM-RA-ILD.nii.gz#z-0,t-0
    var currentSlice = parseInt(currentImageId.substr(currentImageId.indexOf('#') + 3))
    var wheelNum = parseInt(evt.deltaY / 4)
    var nextSlice = currentSlice + wheelNum // 下一张slice的索引
    if (currentSlice + wheelNum < 0) {
      nextSlice = 0
    } else if (currentSlice + wheelNum > 234) {
      nextSlice = 234
    }
    cornerstone.loadAndCacheImage('nifti:studies/5.25_HM-RA-ILD.nii.gz#z-' + nextSlice.toString() + ',t-0').then(
      image => {
        cornerstone.displayImage(nifti_z, image)
      }
    )
  })
  nifti_x.addEventListener('wheel', (evt) => {
    var currentImageId = cornerstone.getImage(nifti_x).imageId // nifti:studies/5.25_HM-RA-ILD.nii.gz#z-0,t-0
    var currentSlice = parseInt(currentImageId.substr(currentImageId.indexOf('#') + 3))
    var wheelNum = parseInt(evt.deltaY / 4)
    var nextSlice = currentSlice + wheelNum
    if (currentSlice + wheelNum < 0) {
      nextSlice = 0
    } else if (currentSlice + wheelNum > 234) {
      nextSlice = 234
    }
    cornerstone.loadAndCacheImage('nifti:studies/5.25_HM-RA-ILD.nii.gz#x-' + nextSlice.toString() + ',t-0').then(
      image => {
        cornerstone.displayImage(nifti_x, image)
      }
    )
  })
  nifti_y.addEventListener('wheel', (evt) => {
    var currentImageId = cornerstone.getImage(nifti_y).imageId // nifti:studies/5.25_HM-RA-ILD.nii.gz#z-0,t-0
    var currentSlice = parseInt(currentImageId.substr(currentImageId.indexOf('#') + 3))
    var wheelNum = parseInt(evt.deltaY / 4)
    var nextSlice = currentSlice + wheelNum
    if (currentSlice + wheelNum < 0) {
      nextSlice = 0
    } else if (currentSlice + wheelNum > 234) {
      nextSlice = 234
    }
    cornerstone.loadAndCacheImage('nifti:studies/5.25_HM-RA-ILD.nii.gz#y-' + nextSlice.toString() + ',t-0').then(
      image => {
        cornerstone.displayImage(nifti_y, image)
      }
    )
  })
}



function loadAndViewImage (element, imageId, dir) {
  const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId
  const imageIdObject = ImageId.fromURL(imageId)
  console.log('imageIdObject', imageIdObject)
  if (dir == 'z') imageIdObject.slice.dimension = 'z'
  if (dir == 'x') imageIdObject.slice.dimension = 'x'
  if (dir == 'y') imageIdObject.slice.dimension = 'y'
  element.dataset.imageId = imageIdObject.url

  try {
    cornerstone.loadAndCacheImage(imageIdObject.url).then(function (image) {
      const numberOfSlices = cornerstone.metaData.get('multiFrameModule', imageIdObject.url).numberOfFrames
      const stack = {
        currentImageIdIndex: imageIdObject.slice.index,
        imageIds: Array.from(Array(numberOfSlices), (_, i) => `nifti:${imageIdObject.filePath}#${imageIdObject.slice.dimension}-${i},t-0`)
      }
      const viewport = cornerstone.getDefaultViewportForImage(element, image)
      cornerstone.displayImage(element, image, viewport)
      cornerstone.resize(element, true)


    }, function (err) {
      throw err
      alert(err)
    })
  } catch (err) {
    throw err
    alert(err)
  }
}
