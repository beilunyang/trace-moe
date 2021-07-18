import { inject, observer } from 'mobx-react';
import { View, Text, Image } from '@tarojs/components';
import { PureComponent } from 'react';
import styles from './index.module.scss'


@inject('searchStore')
@observer
class Result extends PureComponent {
  componentDidMount() {

  }

  renderResults = () => {
    const { results } = this.props.searchStore;
    return results.map((result, idx) => (
      <View key={idx} className={styles.result}>
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
    const { formatedFrameCount, searchedImage } = this.props.searchStore;
    return (
      <View className={styles.container}>
        <View className={styles.summary}>
          <Image className={styles.previewImg} src={searchedImage} />
          <Text className={styles.frameCount}>共检索{formatedFrameCount}帧动画</Text>
        </View>
        <View className={styles.results}>
          {this.renderResults()}
        </View>
      </View>
    );
  }
}


export default Result;
