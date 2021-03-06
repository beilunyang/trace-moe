import { observable, action, computed } from "mobx";
// import searchMock from "../mocks/search";
import { toThousands } from "../utils";
import Result from "./result";

class SearchStore {
  @observable searchedImage = "";

  @observable frameCount = 0;

  @observable time = 0;

  @observable results = [];

  @computed get formatedFrameCount() {
    return toThousands(this.frameCount);
  }

  @action setSearchResult = ({ result, frameCount, time }) => {
    this.results = result.map(item => new Result(item));
    this.frameCount = frameCount;
    this.time = time;
  };

  @action setSearchedImage = image => {
    this.searchedImage = image;
  };
}

// class SearchStore {
//   @observable searchedImage = searchMock.searchedImage;

//   @observable frameCount = searchMock.frameCount;

//   @observable time = searchMock.time;

//   @computed get formatedFrameCount() {
//     return toThousands(this.frameCount);
//   }

//   @observable results = searchMock.result.map(data => {
//     return new Result(data);
//   });

//   @action setSearchResult = (results, frameCount) => {
//     this.results = results.map(data => new Result(data));
//     this.frameCount = frameCount;
//   };

//   @action setSearchedImage = image => {
//     this.searchedImage = image;
//   };
// }

export default new SearchStore();
