import mprMetaDataStore from './mprMetaDataStore.js'

function provider (moduleName, imageId) {
  const meta = mprMetaDataStore.get(imageId) // map

  if (!meta) {
    return
  }

  if (moduleName === 'imagePlaneModule') {
    const imagePlaneModule = meta.imagePlaneModule // 不是空的吗？
    return imagePlaneModule
  }
}

export default provider
