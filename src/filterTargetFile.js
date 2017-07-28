/**
 * 筛选出指定文件
 * 每次打包后的入库文件都把文件名hash一下，避免缓存问题，支持PWA的时候也需要这样
 * 例如：找到客户端入库文件  eg：[name].[hash].js  => client.dndavxcxq323ndfs.js
 * 
 * @memberof ReactIsomorphic
 */
module.exports = (files, name, ext) => {
    if (!ext && name.includes('.')) {
        name = name.split('.')
        ext = name.pop()
        name = name.join('.')
    }

    let regexp = new RegExp(`^${name}\.([^.]+).${ext}$`)

    for (let i = 0; i < files.length; i++) {
        let file = files[i]
        if (regexp.test(file)) return file
    }

    return false
}