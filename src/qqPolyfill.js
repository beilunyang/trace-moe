let enterInfo = {};

export const getEnterOptionsSync = () => enterInfo;

getEnterOptionsSync.onAppShow = res => {
  enterInfo = res;
};
