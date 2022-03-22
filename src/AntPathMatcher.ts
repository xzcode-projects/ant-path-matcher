function tokenizePath (pattern: string, path: string, ignoreEmptyTokens: boolean = true): string[] {
  if (path === null || path === undefined) {
    return []
  } else {
    return path.split(pattern).filter(it => ignoreEmptyTokens && it !== '')
  }
}

export default class AntPathMatcher {

  pathSeparator = '/'

  match (pattern: string, path: string): boolean {
    if (path === null || path === undefined || path.startsWith(this.pathSeparator) !== pattern.startsWith(this.pathSeparator)) {
      return false
    }

    const pattDirs: string[] = tokenizePath(this.pathSeparator, pattern)
    const pathDirs: string[] = tokenizePath(this.pathSeparator, path)
    let pattIdxStart = 0
    const pattIdxEnd = pattDirs.length - 1
    let pathIdxStart = 0
    const pathIdxEnd = pathDirs.length - 1
    // if (fullMatch && this.caseSensitive && !isPotentialMatch(path, pattDirs)) {
    //   return false;
    // }

    while (pattIdxStart <= pattIdxEnd && pathIdxStart <= pathIdxEnd) {
      const pattDir = pattDirs[pattIdxStart]
      if ('**' === pattDir) {
        break
      }
      if (!matchStrings(pattDir, pathDirs[pathIdxStart], uriTemplateVariables)) {
        return false
      }
      pattIdxStart++
      pathIdxStart++
    }

    console.log(pattDirs)
    return true
  }

}

const matcher = new AntPathMatcher()
console.log(matcher.match('/a/b/**/c.js', '/a/b/c.js'))
