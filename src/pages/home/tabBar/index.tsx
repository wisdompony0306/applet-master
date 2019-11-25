import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtIcon, AtAccordion, AtList, AtListItem } from 'taro-ui'
import { GoodsList } from '@/components'
import { ALEVELLIST, IGCSELIST } from '@/mock'
import './index.scss'

type PageOwnProps = { onChange: (any) => any, list: Goods[] }
const pageState = {
  tabDataSource: [
    {
      title: 'Alevel',
      materialId: 3756,
      subList: ALEVELLIST
    },
    {
      title: 'gcslll',
      materialId: 3767,
      subList: IGCSELIST
    }
  ],
  current: 0,
  open: false,
  subList: ALEVELLIST
}
type PageState = typeof pageState

class TabBar extends Component {
  readonly props: Readonly<PageOwnProps> = {
    onChange: () => { },
    list: []
  }
  readonly state: Readonly<PageState> = pageState
  // defaultProps 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。
  static defaultProps = {
    onChange: () => { },
    list: []
  }
  // 标签页切换点击事件
  tabClickHandle(tabIndex) {
    this.setState({ current: tabIndex })
    this.props.onChange(this.state.tabDataSource[tabIndex])
    console.log(this.state.tabDataSource[tabIndex], 'yy')
    // this.state.subList = this.state.tabDataSource[tabIndex]
  }
  // 列表展开闭合切换点击事件
  handleClick(item, index) {
    item.open = !item.open
    this.state.subList.splice(index, 1, item)
    this.setState({
      subList: this.state.subList
    })
  }
  render() {
    const { list } = this.props
    return (
      <View className='tab-change'>
        <View className='tab-change__hd'>
          <AtIcon prefixClass='iconfont' value='calender' size='20' />
          <Text>类别切换</Text>
          <AtTabs
            current={this.state.current}
            tabList={this.state.tabDataSource}
            onClick={this.tabClickHandle.bind(this)}
          />
        </View>
        <View className='tab-change__bd'>
          {this.state.subList.map((item, index) => (
            <View className='tab-change__bd__list'>
              <AtAccordion
                open={item.open}
                onClick={this.handleClick.bind(this, item, index)}
                title={item.title}
                arrow={item.arrow}
              >
                {item.subListChildren.map((item1, index1) => (
                  <View className='tab-change__bd__list__subitem'>
                    <AtList hasBorder={false}>
                      <AtListItem
                        title={item1.subTitle}
                        thumb={item1.thumb}
                      />
                    </AtList>
                  </View>
                ))}
              </AtAccordion>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
export default TabBar as ComponentClass<PageOwnProps, PageState>
