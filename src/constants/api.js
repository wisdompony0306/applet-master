/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST
export const hostM = HOST_M
/* eslint-enable */

//                             用户模块
export const API_USER_LOGIN = `${host}/account/services/login`
export const API_UPDATE_USER_INFO = `${host}/account/services/saveUserInfo`


/**记录搜索记录 */
export const API_GOODS_ADD_SEARCH_RECORD = `${host}/goods/services/addSearchRecord`
/**记录浏览记录 */
export const API_GOODS_ADD_CLICK_RECORD = `${host}/goods/services/addClickRecord`
/**获取用户分享二维码 */
export const API_GOODS_WX_QRCODE_POSTER = `${host}/wxQrcode/services/getQrcodePoster`




// 暂是未使用的api
export const API_USER = `${host}/xhr/user/getDetail.json`
export const API_CHECK_LOGIN = `${host}/xhr/u/checkLogin.json`
