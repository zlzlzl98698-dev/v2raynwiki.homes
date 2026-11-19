export interface AffiliateLinkRecord {
  slug: string
  name: string
  registerUrl: string
  couponCode?: string
  couponNote?: string
  linkFormatNote?: string
  historicalAltUrl?: string
  verifiedDate: string
  rel: 'nofollow sponsored noopener'
}

export const AFFILIATE_REL = 'nofollow sponsored noopener' as const

export const brandLinks: Record<string, AffiliateLinkRecord> = {
  guangsuyun: {
    slug: 'guangsuyun',
    name: '光速云',
    registerUrl: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y',
    couponCode: 'AMM',
    couponNote: '新人优惠券（永久套餐与轻量版不参与折扣，具体以结算页为准）',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  muguang: {
    slug: 'muguang',
    name: '暮光加速',
    registerUrl: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3',
    couponCode: 'muguang5555',
    couponNote: '基础资料提供优惠码 muguang5555，正文曾标注未查到公开活动，以官网结算为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  feimao: {
    slug: 'feimao',
    name: '飞猫云',
    registerUrl: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y',
    couponCode: 'flycat888',
    couponNote: '资料标注 8 折（具体适用套餐以结算页为准）',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  weifeng: {
    slug: 'weifeng',
    name: '微风网络',
    registerUrl: 'https://edp01.breezenetaff.com/#/?code=t3huofyI',
    couponCode: 'flat888',
    couponNote: '资料标注 9 折（具体适用套餐以结算页为准）',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  dalaoyun: {
    slug: 'dalaoyun',
    name: '大佬云',
    registerUrl: 'https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN',
    couponCode: 'dly888',
    couponNote: '品牌资料标注季付及以上 7 折',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  xingdaomeng: {
    slug: 'xingdaomeng',
    name: '星岛梦',
    registerUrl: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR',
    couponCode: 'nmw888',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  ermao: {
    slug: 'ermao',
    name: '二猫云',
    registerUrl: 'https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW',
    couponCode: 'ermao5555',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  wuyou: {
    slug: 'wuyou',
    name: '无忧链接',
    registerUrl: 'https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL',
    couponCode: 'wuyou666',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  weitu: {
    slug: 'weitu',
    name: '唯兔云',
    registerUrl: 'https://guangs.v2yunvipaff.com/#/?code=xIutqOBA',
    couponCode: 'weitu666',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  firefly: {
    slug: 'firefly',
    name: 'Firefly',
    registerUrl: 'https://vip02.fireflyaff.com/#/?code=2n7VURre',
    historicalAltUrl: 'https://vip02.fireflyaff.com/#/?code=jTp9wSgZ',
    couponCode: 'firefly',
    couponNote: '新用户 8 折（年付版不适用）',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  yuzhou: {
    slug: 'yuzhou',
    name: '宇宙云',
    registerUrl: 'https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1',
    couponCode: 'YUZHOU553',
    couponNote: '历史资料称新用户 8 折，待核实当前有效性',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  u1s1: {
    slug: 'u1s1',
    name: 'U1S1',
    registerUrl: 'https://guangs.vipaff.cc/#/?code=xhX5X22f',
    couponCode: 'akaka',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  lingmao: {
    slug: 'lingmao',
    name: '灵猫网络',
    registerUrl: 'https://vip01.civetnet.com/#/?code=8MIAyxak',
    couponCode: 'lingmao',
    couponNote: '资料同时出现 lmao888 与 lingmao（8 折，年付小包不适用），以结算页为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  jilian: {
    slug: 'jilian',
    name: '极连云',
    registerUrl: 'https://guangs.jlyvipaff.com/#/?code=VM1rKGUu',
    couponCode: 'ji8888',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  guangnian: {
    slug: 'guangnian',
    name: '光年梯',
    registerUrl: 'https://guangs.gntaff.com/#/?code=X1FoxjGE',
    couponCode: 'gnt6666',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  yifan: {
    slug: 'yifan',
    name: '一翻云',
    registerUrl: 'https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r',
    couponCode: '1FLYYUN',
    couponNote: '资料同时记录 yfy6666 与 1FLYYUN（9 折），以官网结算为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  sogo: {
    slug: 'sogo',
    name: 'SOGO 云',
    registerUrl: 'https://guangs.sogoyunaff.cc/#/?code=327Vs0w7',
    couponCode: 'SOGO10000',
    couponNote: '正文标注 SOGO10000（9 折），汇总表另见 sss777，以结算页为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  kexin: {
    slug: 'kexin',
    name: '可信云',
    registerUrl: 'https://guangs.kosingaff.com/#/register?code=UYDtNlCY',
    couponCode: 'kkk333',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  sujie: {
    slug: 'sujie',
    name: '速界',
    registerUrl: 'https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB',
    couponCode: 'sss1111',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  shanyue: {
    slug: 'shanyue',
    name: '闪跃',
    registerUrl: 'https://vip02.flashleapaff.com/#/?code=3lgzm9mm',
    couponCode: 'shanyue',
    couponNote: '8 折（仅限闪动/飞跃/瞬移/跃迁，年付版不适用）',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  quanqiu: {
    slug: 'quanqiu',
    name: '全球云',
    registerUrl: 'https://guangs.gcvipaff.com/#/?code=Ov2nvU9C',
    couponCode: 'qq88',
    couponNote: '正文标注 qq88（8 折），汇总表另见 qqy7777，以结算页为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  shandianshu: {
    slug: 'shandianshu',
    name: '闪电鼠',
    registerUrl: 'https://qwerty.shandianshuaff.com/#/?code=rUE75iYh',
    couponCode: 'sd88',
    couponNote: '品牌资料标注季付及以上 7 折',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  yunjiexian: {
    slug: 'yunjiexian',
    name: '云界线',
    registerUrl: 'https://qwerty.yunjiexianaff.com/?code=aycnwNUi',
    historicalAltUrl: 'https://qwerty.yunjiexianaff.com/?code=HBaZ91c6',
    couponCode: 'yjx888',
    couponNote: '季付及以上 7 折；正文与汇总表邀请码存在差异',
    linkFormatNote: '该链接缺少 #/ 路由段，注册前建议确认页面跳转正常',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  liulianyun: {
    slug: 'liulianyun',
    name: '榴莲云',
    registerUrl: 'https://qwerty.liulianyunaff.com#/?code=hS5pvbfE',
    couponCode: 'll88',
    couponNote: '品牌资料标注季付及以上 7 折',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  shenxing: {
    slug: 'shenxing',
    name: '神行加速',
    registerUrl: 'https://qwerty.shenxingaff.com/#/?code=gawDQqVE',
    couponCode: 'xs0077',
    couponNote: '品牌资料标注新用户 7 折',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  huanqiuti: {
    slug: 'huanqiuti',
    name: '环球梯',
    registerUrl: 'https://qwerty.huanqiutiaff.com/?code=9I4KRNPH',
    couponCode: 'HQ66',
    couponNote: '品牌资料标注季付及以上 7 折',
    linkFormatNote: '该链接缺少 #/ 路由段，注册前建议确认页面跳转正常',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  yinxingren: {
    slug: 'yinxingren',
    name: '隐形人',
    registerUrl: 'https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT',
    couponCode: 'moon80',
    couponNote: '资料同时记录 yxr888 与 moon80（8 折），以官网结算为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  tiziyun: {
    slug: 'tiziyun',
    name: '梯子云',
    registerUrl: 'https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0',
    couponCode: 'tiziyun',
    couponNote: '优惠码以官网结算页实测为准',
    verifiedDate: '2026-10-19',
    rel: AFFILIATE_REL
  },
  lingdong: {
    slug: 'lingdong',
    name: '灵动云',
    registerUrl: 'https://varnexa.lingdongaff.com/#/?code=wZvEhEoI',
    couponNote: '优惠码尚未核实（历史资料 2026-08-09）',
    verifiedDate: '2026-08-09',
    rel: AFFILIATE_REL
  },
  langwang: {
    slug: 'langwang',
    name: '浪网',
    registerUrl: 'https://varnexa.wavenetaff.com/#/?code=xwAM4tTd',
    couponNote: '优惠码尚未核实（历史资料 2026-08-09）',
    verifiedDate: '2026-08-09',
    rel: AFFILIATE_REL
  },
  edgenova: {
    slug: 'edgenova',
    name: '边缘节点 EdgeNova',
    registerUrl: 'https://work.edgenovaaff.cc/#/register?code=cl3iB5YG',
    couponCode: 'TH888',
    couponNote: '历史资料称 8 折（2026-08-09），待核实当前有效性',
    verifiedDate: '2026-08-09',
    rel: AFFILIATE_REL
  }
}

export function getBrandLink(slug: string): AffiliateLinkRecord | undefined {
  return brandLinks[slug]
}
