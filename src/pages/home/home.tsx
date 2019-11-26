import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { AtButton, AtIcon, AtActivityIndicator } from 'taro-ui'
import { Loading } from '@/components'
import { connect } from '@tarojs/redux'
import * as actions from '@/actions/home'
import { getWindowHeight } from '@/utils/style'
import Banner from './banner'
import Material from './material'
import Search from './search'
import Pin from './pin'
import HeadlineNews from './headlineNews'
import TabBar from './tabBar'
import './home.scss'

import withLogin from '@/decorator/withLogin'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  home: object,
  pinList: Goods[][],
  yearLists: yearLists[]
}

type PageDispatchProps = {
  dispatchPin: () => any,
  dispatchGclList: (obj: goodsListReq) => any
}

type PageOwnProps = {}

type PageState = {
  pageNo: number,
  pageSize: number,
  materialId: number,
  iViewId: string,
  isShowGoBack: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Home {
  props: IProps;
  state: PageState
}


@withLogin()
@connect(state => { return Object.assign({}, { ...state.home }) }, { ...actions })
class Home extends Component {
  config: Config = {
    navigationBarTitleText: '考试指南'
  }
  state = {
    pageNo: 1,
    pageSize: 12,
    materialId: 3756,
    iViewId: '',
    isShowGoBack: false
  }

  componentWillMount() {
    this.props.dispatchPin()
    this.props.dispatchGclList({ materialId: 3756 })
  }
  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 上拉加载
  loadRecommend() {
    this.setState({ pageNo: this.state.pageNo + 1 }, () => {
      const { pageNo, pageSize, materialId } = this.state
      this.props.dispatchGclList({ pageNo, pageSize, materialId: materialId })
    })
  }
  // 首页tab和列表
  tabChangeHandle(data) {
    Taro.showLoading({ title: '加载中...' })
    this.setState({ materialId: data.materialId, pageNo: 1 }, () => {
      const { pageNo, pageSize, materialId } = this.state
      this.props.dispatchGclList({ pageNo, pageSize, materialId: materialId }).then(() => {
        Taro.hideLoading()
      })
    })
  }

  // scrollerView 滚动监听
  scrollHandle(e) {
    const { isShowGoBack } = this.state
    const { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } = e.detail
    const windowHeight = Taro.getSystemInfoSync().windowHeight
    if (scrollTop > windowHeight) !isShowGoBack && this.setState({ isShowGoBack: true })
    else isShowGoBack && this.setState({ isShowGoBack: false })
  }
  // 返回顶部
  goBackHandle() {
    this.setState({ iViewId: 'goods-course-live' }, () => { this.setState({ iViewId: null }) })
  }
  // 分享
  onShareAppMessage() {
    return {
      title: '报考助手，助你出国的小程序',
      path: '/pages/home/home'
    }
  }

  render() {
    const { isShowGoBack } = this.state
    return (
      <View className='home'>
        {/* 搜索框 */}
        {/* <Search /> */}
        <ScrollView
          scrollY
          scrollWithAnimation
          enableBackToTop
          className='home__wrap'
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight(true) }}
          scrollIntoView={this.state.iViewId}
          scroll-animation-duration={200}
          onScroll={this.scrollHandle}
        >
          <TabBar
            onChange={this.tabChangeHandle}
            list={this.props.yearLists}
          />
          {/* banner图 */}
          {/* <Banner list={[
            { rank: 1, title: '学校推荐', img: 'http://kcpcdn.demongao.com/course/banner1.jpg', materialId: 13371 },
            { rank: 2, title: '资料推荐', img: 'http://kcpcdn.demongao.com/course/banner2.jpg', materialId: 3786 }
          ]} /> */}

          {/* 物料推荐 */}
          {/* <Material /> */}

          {/* 频道 */}
          {/* <Pin
            banner={{
              targetJump: '/pages/webview/index?url=https%3A%2F%2Fact.you.163.com%2Fact%2Fstatic%2FCbxof0jA78.html&activity_channel_id=yx_default_fwtz_30',
              picUrls: [{
                title: '猜你喜欢',
                materialId: 6708,
                url: 'https://yanxuan.nosdn.127.net/3dd17d374a2283e8b42a0ef2cfd7d1cf.png'
              }],
              title: '全集锦'
            }}
            list={this.props.pinList}
          /> */}

          {/* 头条新闻 */}
          {/* <HeadlineNews headline-news-class='home__headline-news'></HeadlineNews> */}

          {/* 直播 */}
          {/* <View className='goods-course-live--alink' id='goods-course-live'></View> */}

          {/* <Loading /> */}
        </ScrollView>
        {isShowGoBack && <AtButton className='go-back' onClick={this.goBackHandle}><AtIcon prefixClass='iconfont' value='huojian' size='24px' color='#999999' /></AtButton>}
      </View>
    )
  }
}

export default Home as ComponentClass
