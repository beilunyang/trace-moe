import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Video, Image } from '@tarojs/components'
import { inject, observer } from 'mobx-react';
import styles from './index.module.scss';
import service from '../../services'


@inject('searchStore')
@observer
class Detail extends PureComponent {

  state = {
    bgm: {
      title: {
        native: '',
        romaji: '',
        english: '',
        chinese: '',
      },
      coverImage: {
        medium: '',
      },
      startDate: '',
      endDate: '',
      genres: [],
      averageScore: '',
      episodes: '',
    },
  };

  async componentDidMount() {
    service.init();
    const { id } = this.$instance.router.params;
    const data = await service.searchAnilist(id);
    this.setState({
      bgm: data,
    });
  }

  onCopyText = (text) => {
    Taro.setClipboardData({
      data: text,
    });
  };

  $instance = Taro.getCurrentInstance();

  render() {
    const { idx } = this.$instance.router.params;
    const {
      video,
      duration,
      episode,
    } = this.props.searchStore.results[idx];
    const {
      title,
      coverImage,
      startDate,
      endDate,
      genres,
      averageScore,
      episodes
    } = this.state.bgm;
    const mainTitle = title.native || title.chinese;
    const subTitle = title.romaji || title.english;
    return (
      <View className={styles.container}>
        <Video src={video} className={styles.video} />
        <View className={styles.videoInfo}>
          <Text className={styles.episode}>{episode}</Text>
          <Text className={styles.duration}>{duration}</Text>
        </View>
        <View className={styles.info}>
          <Text className={styles.h3}>番剧简介</Text>
          <Text className={styles.title} onClick={() => this.onCopyText(mainTitle)}>{mainTitle}</Text>
          <Text className={styles.subTitle} onClick={() => this.onCopyText(subTitle)}>{subTitle}</Text>
          <View className={styles.bgm}>
            <View className={styles.left}>
              <Image src={coverImage.large} className={styles.cover} />
              {
                coverImage.large ? (
                  <Text className={styles.note}>数据来自anilist.co</Text>
                ) : null
              }
            </View>
            <View className={styles.right}>
              {
                title.chinese ? (
                  <View className={styles.item}>
                    <Text>中文名：</Text>
                    <Text className={styles.underline} onClick={() => this.onCopyText(title.chinese)}>{title.chinese}</Text>
                  </View>
                ) : null
              }
              {
                genres?.length > 0 ? (
                  <Text className={styles.item}>类型：{genres.join(',')}</Text>
                ) : null
              }
              {
                averageScore ? (
                  <Text className={styles.item}>评分：{averageScore}分</Text>
                ) : null
              }
              {
                episodes? (
                  <Text className={styles.item}>集数：共{episodes}集</Text>
                ) : null
              }
              {
                startDate ? (
                  <Text className={styles.item}>开播日期: {startDate.year}/{startDate.month}/{startDate.day}</Text>
                ) : null
              }
              {
                endDate ? (
                  <Text className={styles.item}>完结日期: {endDate.year}/{endDate.month}/{endDate.day}</Text>
                ) : null
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Detail;
