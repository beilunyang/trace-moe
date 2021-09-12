import { PureComponent } from 'react';
import { WebView } from '@tarojs/components';

export default class TWebView extends PureComponent {
  render() {
    const { src } = this.props;
    return (
      <WebView src={src} />
    );
  }
}
