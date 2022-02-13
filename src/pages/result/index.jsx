import { inject, observer } from 'mobx-react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro'
import { PureComponent } from 'react';
import { AtActivityIndicator } from 'taro-ui'
import { Row, Block, Column } from '../../components/skeleton'
import service from '../../services'
import styles from './index.module.scss'
import { getEnterOptionsSync } from '../../qqPolyfill';


@inject('searchStore')
@observer
class Result extends PureComponent {
  state = {
    loaded: false,
    previewImgError: false,
  };

  componentDidMount() {
    service.init();
    let searchedUrl;
    let searchedFilePath;
    const { forwardMaterials } = Taro?.getEnterOptionsSync?.() || getEnterOptionsSync();
    console.log('componentDidMount forwardMaterials:', forwardMaterials);
    if (forwardMaterials) {
      // 从聊天素材打开小程序
      const latestIdx = forwardMaterials.length - 1;
      searchedFilePath = forwardMaterials[latestIdx].path;
    } else {
      // 从Home页或者分享打开小程序
      let { url, filePath } = this.$instance.router.params;
      searchedUrl = url && decodeURIComponent(url);
      searchedFilePath = filePath && decodeURIComponent(filePath);
    }
    console.log('searchedImage:', searchedUrl || searchedFilePath);
    this.props.searchStore.setSearchedImage(searchedUrl || searchedFilePath);
    this.onSearch(searchedUrl, searchedFilePath);
  }

  onShareAppMessage() {
    return {
      title: 'TraceMoe以图搜番|智能识别图片截图所属动漫番剧名称',
      path: this.$instance.page.$taroPath,
    };
  }

  // 分享到微信朋友圈的小程序处于单页模式
  // 用户处于未登录状态, 云函数需要开启未登录模式, 否则打开朋友圈分享的页面接口会报错
  onShareTimeline() {
    const { url, filePath } = this.$instance.router.params;

    let query = '';

    if (url) {
      query = `url=${url}`;
    }

    if (filePath) {
      query = `filePath=${filePath}`;
    }

    return {
      title: 'TraceMoe以图搜番|智能识别图片截图所属动漫番剧名称',
      query,
    };
  };

  $instance = Taro.getCurrentInstance();

  onSearch = async (url, filePath) => {
    const data = await service.search({
      url,
      filePath,
    });

    this.setState({
      loaded: true,
    });

    if (data) {
      this.props.searchStore.setSearchResult(data);
    }
  }

  onToDetail = (idx, id) => {
    Taro.navigateTo({
      url: `/pages/detail/index?idx=${idx}&id=${id}`,
    });
  };

  // 从聊天素材打开QQ小程序时，返回的本地path路径不能被Image正常显示
  onPreviewImgError = () => {
    this.setState({
      previewImgError: true,
    });
  };

  renderSkeleton = () => {
    return new Array(5).fill().map((_, idx) => (
      <Row key={idx} mt={idx === 0 ? 0 : 46}>
        <Block w='286' h='196' r='8' />
        <Column>
          <Block w='336' h='34' ml='18' mt='4' />
          <Block w='142' h='34' ml='18' mt='18' />
          <Block w='270' h='34' ml='18' mt='18' />
          <Block w='252' h='34' ml='18' mt='18' />
        </Column>
      </Row>
    ))
  };


  renderResults = () => {
    const { results } = this.props.searchStore;
    return results.map((result, idx) => (
      <View key={idx} className={styles.result} onClick={() => this.onToDetail(idx, result.anilistId)}>
        <Image src={result.image} className={styles.resultImg} />
        <View className={styles.resultInfo}>
          <Text className={styles.resultTitle}>{result.title}</Text>
          <Text className={styles.episode}>{result.episode}</Text>
          <Text className={styles.duration}>{result.duration}</Text>
          <Text className={styles.similarity}>{result.similarity}</Text>
        </View>
      </View>
    ));
  };

  render() {
    const { formatedFrameCount, searchedImage, time } = this.props.searchStore;
    const { loaded, previewImgError } = this.state;
    return (
      <View className={styles.container}>
        <View className={styles.summary}>
          {
            !previewImgError ? (
              <Image className={styles.previewImg} src={searchedImage} onError={this.onPreviewImgError} />
            ) : null
          }
          <View className={styles.searchMeta}>
            {
              loaded ? (
                <>
                  <Text className={styles.frameCount}>共检索{formatedFrameCount}帧动画</Text>
                  <Text className={styles.time}>耗时{time}s</Text>
                </>
              ) : (
                <View className={styles.activityIndicator}>
                  <AtActivityIndicator
                    content='正在检索中'
                    color='#e329ba'
                  />
                </View>
              )
            }
          </View>
        </View>
        <View className={styles.results}>
          {loaded ? this.renderResults() : this.renderSkeleton()}
        </View>
      </View>
    );
  }
}


export default Result;
