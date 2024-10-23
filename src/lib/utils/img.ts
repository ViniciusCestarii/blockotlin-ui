export const trasformImgToBlobURL = (files: FileList) => {
  if (files.length === 0) {
    return null
  }

  const file = files[0]

  const urlImage = URL.createObjectURL(file)

  return urlImage
}

export const transformImgToBase64URL = (
  files: FileList,
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (files.length === 0) {
      resolve(null)
      return
    }

    const file = files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      resolve(reader.result as string)
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file as Base64.'))
    }

    reader.readAsDataURL(file)
  })
}
