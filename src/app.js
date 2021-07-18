import { PureComponent } from "react";
import { Provider } from "mobx-react";
import searchStore from "./stores/search";
import "./app.scss";

class App extends PureComponent {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider searchStore={searchStore}>{this.props.children}</Provider>;
  }
}

export default App;
