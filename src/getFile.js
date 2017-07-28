/**
 * 从指定目录中筛选出指定文件，建议为开发环境和正式环境分别配置
 * 
 * @param {string} [pathDist="dist"] 打包结果根目录
 * @memberof ReactIsomorphic
 */
module.exports = (pathname, pathDist = 'dist') => {
    if (__DEV__) {
        return `http://localhost:${process.env.WEBPACK_DEV_SERVER_PORT || '3001'}/dist/${pathname}`
    } else {
        const segs = pathname.split('/').filter(seg => seg !== '/')
        const file = segs.pop()
        const dir = segs.length ? `${segs.join('/')}/` : ''
        return `/${dir}${
            tool.filterTargetFile(
                tool.readFilesInPath(`./${pathDist}/public/${dir}`),
                file
            )}`
    }
}