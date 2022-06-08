function initials(name: string) {
  if (name) {
    return name.split(' ').map((part: string) => part.charAt(0).toUpperCase()).join('')
  }
  return 'phd'
}

export {
  initials
}
