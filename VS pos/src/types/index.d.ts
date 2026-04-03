/**
 * VS Pos 数据类型定义
 */

/**
 * 商品/服务
 * @typedef {Object} Service
 * @property {string} id - 商品ID
 * @property {string} sku - SKU编码
 * @property {string} barcode - 条码
 * @property {string} name - 商品名称
 * @property {string} category - 分类 (massage/spa/beauty/health/package/product)
 * @property {number} price - 售价
 * @property {number} cost - 成本
 * @property {number} duration - 服务时长(分钟)
 * @property {number} stock - 库存
 * @property {number} lowStockAlert - 库存预警值
 * @property {string} supplier - 供应商
 * @property {string[]} tags - 标签
 * @property {number} commission - 佣金比例(%)
 * @property {boolean} active - 是否在售
 * @property {string} image - 图片URL
 */

/**
 * 会员
 * @typedef {Object} Member
 * @property {string} id - 会员ID
 * @property {string} cardNo - 会员卡号
 * @property {string} name - 姓名
 * @property {string} phone - 手机号
 * @property {string} email - 邮箱
 * @property {string} address - 地址
 * @property {string} birthday - 生日
 * @property {string} level - 等级 (bronze/silver/gold/diamond)
 * @property {number} discount - 折扣比例(%)
 * @property {number} points - 积分
 * @property {number} balance - 余额
 * @property {number} totalSpent - 累计消费
 * @property {number} visitCount - 消费次数
 * @property {string} joinDate - 注册日期
 * @property {string} lastVisit - 最后消费日期
 * @property {string} status - 状态 (active/inactive)
 * @property {string} photo - 照片URL
 * @property {string} notes - 备注
 */

/**
 * 员工
 * @typedef {Object} Employee
 * @property {string} id - 员工ID
 * @property {string} empNo - 工号
 * @property {string} name - 姓名
 * @property {string} phone - 手机号
 * @property {string} role - 角色 (technician/beautician/manager/reception)
 * @property {string[]} skills - 技能
 * @property {string} hireDate - 入职日期
 * @property {number} salary - 基本工资
 * @property {string} status - 状态 (available/busy/off)
 * @property {Object} attendance - 考勤记录
 * @property {string|null} attendance.checkIn - 签到时间
 * @property {string|null} attendance.checkOut - 签退时间
 * @property {number} monthlyOrders - 本月订单数
 * @property {number} monthlyCommission - 本月佣金
 * @property {string} photo - 照片URL
 * @property {boolean} active - 是否在职
 */

/**
 * 订单
 * @typedef {Object} Order
 * @property {number} id - 订单ID
 * @property {string} orderNo - 订单号
 * @property {string} customerType - 客户类型 (walkin/vip/member)
 * @property {string} customerName - 客户名称
 * @property {string|null} memberId - 会员ID
 * @property {string|null} techName - 技师名称
 * @property {Array<{name: string, price: number, qty: number}>} items - 项目明细
 * @property {number} subtotal - 小计
 * @property {number} discount - 折扣
 * @property {number} tax - 税费
 * @property {number} tip - 小费
 * @property {number} total - 总计
 * @property {number} pointsEarned - 获得积分
 * @property {string} payment - 支付方式 (cash/card/wechat/alipay)
 * @property {string} status - 状态 (pending/completed/cancelled)
 * @property {string} createdAt - 创建时间
 */

/**
 * 账单/发票
 * @typedef {Object} Invoice
 * @property {number} id - 账单ID
 * @property {string} invoiceNo - 账单号
 * @property {string} orderNo - 关联订单号
 * @property {string} customerName - 客户名称
 * @property {string|null} memberId - 会员ID
 * @property {string|null} techName - 技师名称
 * @property {Array<{name: string, price: number, qty: number}>} items - 项目明细
 * @property {number} subtotal - 小计
 * @property {number} discount - 折扣
 * @property {number} tax - 税费
 * @property {number} tip - 小费
 * @property {number} total - 实收金额
 * @property {string} payment - 支付方式
 * @property {string} status - 状态 (paid/unpaid/refunded)
 * @property {string} createdAt - 创建时间
 * @property {boolean} refunded - 是否已退款
 * @property {number} refundAmount - 退款金额
 * @property {string} refundReason - 退款原因
 * @property {string} refundNotes - 退款备注
 * @property {string} refundDate - 退款时间
 */

/**
 * 开台/服务单
 * @typedef {Object} Ticket
 * @property {number} id - 开台ID
 * @property {string} ticketNo - 开台单号
 * @property {string} tableNo - 桌号/房间号
 * @property {string} customerName - 客户名称
 * @property {string|null} memberId - 会员ID
 * @property {string|null} techId - 技师ID
 * @property {string|null} techName - 技师名称
 * @property {Array<{serviceId: string, serviceName: string, price: number}>} services - 服务项目
 * @property {number} total - 总价
 * @property {string} status - 状态 (open/closed/cancelled)
 * @property {string} note - 备注
 * @property {string} createdAt - 开台时间
 * @property {string|null} closedAt - 结束时间
 */

/**
 * 佣金记录
 * @typedef {Object} Commission
 * @property {number} id - 佣金ID
 * @property {string} orderNo - 订单号
 * @property {string} employeeId - 员工ID
 * @property {string} employeeName - 员工名称
 * @property {string} serviceName - 服务名称
 * @property {number} amount - 服务金额
 * @property {number} rate - 佣金比例(%)
 * @property {number} commission - 佣金金额
 * @property {string} status - 状态 (pending/paid)
 * @property {string} createdAt - 创建时间
 * @property {string|null} paidAt - 结算时间
 */

/**
 * 班次
 * @typedef {Object} Shift
 * @property {number} id - 班次ID
 * @property {string} shiftNo - 班次号
 * @property {string} employeeId - 员工ID
 * @property {string} employeeName - 员工名称
 * @property {number} startCash - 班次开始现金
 * @property {number|null} endCash - 班次结束现金
 * @property {string} status - 状态 (open/closed)
 * @property {string} startTime - 开始时间
 * @property {string|null} endTime - 结束时间
 */

/**
 * 系统设置
 * @typedef {Object} Settings
 * @property {number} earningRate - 积分获取比例
 * @property {number} redeemRate - 积分兑换比例
 * @property {number} commissionRate - 默认佣金比例
 * @property {Object} discounts - 会员折扣
 * @property {number} discounts.bronze - 铜卡折扣
 * @property {number} discounts.silver - 银卡折扣
 * @property {number} discounts.gold - 金卡折扣
 * @property {number} discounts.diamond - 钻卡折扣
 * @property {Object} payments - 支付方式
 * @property {boolean} payments.cash - 现金
 * @property {boolean} payments.card - 银行卡
 * @property {boolean} payments.wechat - 微信
 * @property {boolean} payments.alipay - 支付宝
 * @property {Object} tax - 税费设置
 * @property {boolean} tax.enabled - 是否启用
 * @property {number} tax.rate - 税率(%)
 * @property {string} tax.method - 计算方式 (add/included)
 * @property {Object} printer - 打印机设置
 * @property {string} printer.type - 打印机类型
 * @property {string} printer.name - 打印机名称
 * @property {number} printer.width - 字符宽度
 * @property {string} printer.header - 小票头部
 * @property {string} printer.footer - 小票底部
 * @property {Object} tips - 小费设置
 * @property {boolean} tips.enabled - 是否启用
 * @property {number} tips.percent1 - 预设比例1
 * @property {number} tips.percent2 - 预设比例2
 * @property {number} tips.percent3 - 预设比例3
 * @property {boolean} tips.custom - 允许自定义
 * @property {boolean} tips.separate - 单独显示
 * @property {Object} currency - 货币设置
 * @property {string} currency.symbol - 货币符号
 * @property {string} currency.code - 货币代码
 * @property {number} currency.decimals - 小数位数
 * @property {string} currency.rounding - 舍入规则
 */

/**
 * 功能开关
 * @typedef {Object} Features
 * @property {boolean} shifts - 班次管理
 * @property {boolean} timeClock - 考勤打卡
 * @property {boolean} openTickets - 开台管理
 * @property {boolean} kitchenPrinters - 后厨打印
 * @property {boolean} customerDisplays - 客显
 * @property {boolean} diningOptions - 餐桌选项
 * @property {boolean} lowStock - 库存预警
 * @property {boolean} negativeStock - 允许负库存
 * @property {boolean} weightBarcodes - 重量条码
 */

/**
 * 配置
 * @typedef {Object} Config
 * @property {Object} storage - localStorage 键名
 * @property {Object} categoryNames - 分类名称映射
 * @property {Object} levelNames - 会员等级名称映射
 * @property {Object} paymentNames - 支付方式名称映射
 */

export {};
