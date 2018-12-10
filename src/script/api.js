export default {
    LOGIN: 'api/v1/account/login', // 登陆
    RESET: 'api/v1/account/reset', // 编辑
    REGISTER: 'api/v1/account/register', //注册
    LOGOUT: 'api/v1/account/logout', // 退出登陆
    ACCOUNT_LIST: 'api/v1/account/list', // 账号列表
    PAYMENT_SUMMARY_GROUP: 'api/v1/payment/summary/group', // 最近7天汇总
    PAYMENT_SUMMARY: 'api/v1/payment/summary',

    // 系统配置
    ADMIN_CONFIG_SAVE: 'api/pay-admin/config/save', // 保存配置
    ADMIN_CONFIG_LIST: 'api/pay-admin/config/list', // 配置列表
    ADMIN_CONFIG_RELOAD: 'api/pay-admin/config/reload', // 重载配置

    // 交易流水
    CONFIG_CONSTANT_LIST: 'api/v1/config/constant/list', // 下拉选项
    PAYMENT_LIST: 'api/v1/payment/list',    // 交易流水
    PAYMENT_REFRESH: 'api/v1/payment/refresh', // 刷新交易流水

    // 银联流水
    UNION_LIST: 'api/v1/union/list',    // 银联流水

    MCH_INFO_LIST:'api/v1/mch/info/list', // 商户列表
    MCH_INFO_NEW:'api/v1/mch/info/new', // 新增商户
    SCENE_NEW:'api/v1/scene/new', // 新增场景
    PAY_CONFIG_NEW:'api/v1/pay/config/new', // 新增支付配置
    PAY_CONFIG_DELETE:'api/v1/pay/config/delete', // 删除支付配置
    MCH_INFO_RELATION_SAVE:'api/v1/mch/info/relation/save', // 保存商户详情
    PAY_CONFIG_LIST:'api/v1/pay/config/list', // 支付配置列表
    SCENE_LIST:'api/v1/scene/list', // 获取全部支付场景
    MCH_INFO_GET:'api/v1/mch/info/get' // 获取商户详情
}
