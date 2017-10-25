const fs = require('fs-extra')
const path = require('path')

const getPublicPath = (appName, webpackDevServerPort = process.env.WEBPACK_DEV_SERVER_PORT || 3001) =>
    __DEV__
        ? `http://localhost:${webpackDevServerPort}/dist/`
        : `/${appName ? `${appName}/` : ''}`

/**
 * 找到指定文件，返回路径
 * 
 * @param {string} filename 要查找的文件的文件名
 * @param {string} [appName]
 * @param {string} [distPathname="dist"] 打包结果根目录
 * @memberof ReactIsomorphic
 */
const getFile = (filename, appName, distPathname = 'dist') => {
    if (fs.existsSync(path.resolve(process.cwd(), appName, 'public')) || fs.existsSync(path.resolve(process.cwd(), appName, 'server')))
        return getFile(filename, '', appName)

    if (__DEV__)
        return `${getPublicPath(appName)}${appName}.${filename}`

    const pathChunckmap = path.resolve(process.cwd(), distPathname, 'public', appName, '.chunckmap.json')

    if (fs.existsSync(pathChunckmap)) {
        const chunckmap = fs.readJsonSync(pathChunckmap)
        const extname = path.extname(filename)
        const key = path.basename(filename, extname)
        let result
        if (Array.isArray(chunckmap[key])) {
            chunckmap[key].some(value => {
                if (path.extname(value) === extname) {
                    result = value
                    return true
                }
                return false
            })
        }
        if (result) return `${getPublicPath(appName)}${result}`
    }

    // 如果没有找到chunckmap或是chunckmap中未找到目标项目，转为过滤文件形式
    const pathname = `${appName ? `${appName}/` : ''}${filename}`
    const segs = pathname.split('/').filter(seg => seg !== '/')
    const file = segs.pop()
    const dir = segs.length ? `${segs.join('/')}/` : ''
    return `/${dir}${
        require('./filterTargetFile')(
            require('./readFilesInPath')(`./${distPathname}/public/${appName ? `${appName}/` : ''}${dir}`),
            file
        )}`
}

module.exports = getFile
// module.exports = (pathname, pathDist = 'dist') => {
//     if (__DEV__) {
//         return `http://localhost:${process.env.WEBPACK_DEV_SERVER_PORT || '3001'}/dist/${pathname}`
//     } else {
//         const segs = pathname.split('/').filter(seg => seg !== '/')
//         const file = segs.pop()
//         const dir = segs.length ? `${segs.join('/')}/` : ''
//         return `/${dir}${
//             require('./filterTargetFile')(
//                 require('./readFilesInPath')(`./${pathDist}/public/${dir}`),
//                 file
//             )}`
//     }
// }