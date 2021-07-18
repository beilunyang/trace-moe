import { formatSeconds } from "../utils";

class Result {
  constructor(data) {
    this.episode = this.formatEpisode(data.episode);
    this.similarity = this.formatSimilarity(data.similarity);
    this.duration = this.formatDuration(data.from, data.to);
    this.title = data.filename;
    this.image = data.image;
    this.video = data.video;
  }

  formatEpisode = episode => {
    return `第${episode}集`;
  };

  formatSimilarity = similarity => {
    return `~${(similarity * 100).toFixed(2)}%相似度`;
  };

  formatDuration = (from, to) => {
    return `${formatSeconds(from)} ~ ${formatSeconds(to)}`;
  };
}

export default Result;
