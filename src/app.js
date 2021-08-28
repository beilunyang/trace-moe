import { PureComponent } from "react";
import { Provider } from "mobx-react";
import { getEnterOptionsSync } from "./qqPolyfill";
import searchStore from "./stores/search";
import "./app.scss";

class App extends PureComponent {
  componentDidMount() {}

  componentDidShow(res) {
    // QQ小程序目前不支持getEnterOptionsSync, 暂时使用polyfill
    console.log("App componentDidShow");
    getEnterOptionsSync.onAppShow(res);
  }

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider searchStore={searchStore}>{this.props.children}</Provider>;
  }
}

export default App;
