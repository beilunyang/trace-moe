import { formatSeconds } from "../utils";

class Result {
  constructor(data) {
    this.episode = this.formatEpisode(data.episode);
    this.similarity = this.formatSimilarity(data.similarity);
    this.duration = this.formatDuration(data.from, data.to);
    this.title = this.formatTitle(data.anilist, data.filename);
    this.anilistId = data.anilist.id;
    this.image = data.image;
    this.video = data.video;
  }

  formatTitle = (anilist, filename) => {
    return (
      anilist?.title?.native ||
      anilist?.title?.romaji ||
      anilist?.title?.english ||
      anilist?.synonyms?.[0] ||
      filename
    );
  };

  formatEpisode = episode => {
    return typeof episode === "number" && `第${episode}集`;
  };

  formatSimilarity = similarity => {
    return `~${(similarity * 100).toFixed(2)}%相似度`;
  };

  formatDuration = (from, to) => {
    return `${formatSeconds(from)} ~ ${formatSeconds(to)}`;
  };
}

export default Result;
