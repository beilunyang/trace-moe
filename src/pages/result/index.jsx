import { inject, observer } from 'mobx-react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro'
import { PureComponent } from 'react';
import { AtActivityIndicator } from 'taro-ui'
import { Row, Block, Column } from '../../components/skeleton'
import service from '../../services'
import styles from './index.module.scss'


@inject('searchStore')
@observer
class Result extends PureComponent {
  state = {
    loaded: false,
  };

  async componentDidMount() {
    service.init();
    let { url, filePath } = this.$instance.router.params;
    url = url && decodeURIComponent(url);
    filePath = filePath && decodeURIComponent(filePath);
    await this.onSearch(url, filePath);
  }

  onShareAppMessage() {
    return {
      title: 'TraceMoe-动画场景搜索引擎/搜索动画图片所属番剧',
      path: this.$instance.page.$taroPath,
    };
  }

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
      title: 'TraceMoe-动画场景搜索引擎/搜索动画图片所属番剧',
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
    const { loaded } = this.state;
    return (
      <View className={styles.container}>
        <View className={styles.summary}>
          <Image className={styles.previewImg} src={searchedImage} />
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
