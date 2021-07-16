import * as cornerstone from 'cornerstone-core'
import getUrlForImageId from './getUrlForImageId.js'

export default async function (metadataModule, imageId) {
  const imageUrl = getUrlForImageId(imageId)
  let imageMetadata = cornerstone.metaData.get(metadataModule, imageUrl) // 除了像素pixel之外的数据

  if (!imageMetadata) {
    await cornerstone.loadAndCacheImage(imageUrl)
    imageMetadata = cornerstone.metaData.get(metadataModule, imageUrl)
  }

  return imageMetadata
}
