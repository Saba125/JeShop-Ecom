const getInitials = (username: string) => {
  if (!username) return '?'
  
  const cleanName = username.replace(/[0-9_\-\.]/g, ' ').trim()
  if (cleanName.includes(' ')) {
    return cleanName
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  return username.slice(0, 2).toUpperCase()
}
export default getInitials