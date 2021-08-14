/* eslint-disable no-undef */
import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { inject, observer } from 'mobx-react';
import { AtIcon, AtInput } from 'taro-ui';
import styles from './index.module.scss';

@inject('searchStore')
@observer
class Home extends PureComponent {
  onSearch = async (url, filePath) => {
    let query = '';

    if (url) {
      query = `url=${encodeURIComponent(url)}`;
    }

    if (filePath) {
      query = `filePath=${encodeURIComponent(filePath)}`;
    }
    this.props.searchStore.setSearchedImage(url || filePath);
    Taro.navigateTo({
      url: `/pages/result/index?${query}`
    });
  }

  onChoose = async () => {
    const res = await Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    });
    const filePath = res.tempFilePaths[0];
    this.onSearch(null, filePath);
  }

  render() {
    return (
      <View className={styles.container}>
        <Image src={require('../../assets/logo.svg')} className={styles.logo} />
        <AtInput
          placeholder='输入图片地址或者点击右侧文件夹上传图片'
          name='image'
          type='text'
          border={false}
          className={styles.input}
          placeholderClass={styles.placeholder}
          onConfirm={(url) => this.onSearch(url)}
        >
          <AtIcon value='folder' color='#d99023' onClick={this.onChoose} />
        </AtInput>
      </View>
    )
  }
}

export default Home;
