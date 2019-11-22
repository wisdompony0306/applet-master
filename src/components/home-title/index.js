import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import arrowRight from './aseets/arrow-right.png'
import './index.scss'

export default class HomeTitle extends Component {
  static defaultProps = {
    title: '',
    link: ''
  }

  handleClick = () => {
    Taro.navigateTo({
      url: this.props.link
    })
  }

  render () {
    const { title, link } = this.props
    return (
      <View className='comp-home-title'>
        <Text className='comp-home-title__txt'>{title}</Text>
        <View className='comp-home-title__content'>
          {this.props.children}
        </View>
        {!!link &&
          <View className='comp-home-title__link' onClick={this.handleClick.bind(this)}>
            <Text className='comp-home-title__link-txt'>更多</Text>
            <Image lazyLoad className='comp-home-title__link-img' src={arrowRight} />
          </View>
        }
      </View>
    )
  }
}

