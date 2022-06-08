function imageUri(url: string | null): string {
  if (url) return url
  return ''
}

function imageChangeUri(image: any): string | undefined {
  return image
    ? typeof image === 'string'
      ? image
      : image.uri
    : undefined
}

export {
  imageUri,
  imageChangeUri
}
