/**
 * 读取某个目录下的文件
 * 例如：读取打包目录下的所以文件列表
 * 
 * @memberof ReactIsomorphic
 */
module.exports = (dir) => {

    const fs = require('fs')
    const path = require('path')

    return fs.readdirSync(path.resolve(process.cwd(), dir))
}