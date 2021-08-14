import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import cls from "classnames";
import styles from "./index.module.scss";

export function Row(props) {
  const { w, h, ml = 0, mr = 0, mt = 0, mb = 0, children, className } = props;
  return (
    <View
      className={cls(styles.row, className)}
      style={{
        width: Taro.pxTransform(w),
        height: Taro.pxTransform(h),
        marginLeft: Taro.pxTransform(ml),
        marginRight: Taro.pxTransform(mr),
        marginTop: Taro.pxTransform(mt),
        marginBottom: Taro.pxTransform(mb)
      }}
    >
      {children}
    </View>
  );
}

export function Column(props) {
  return (
    <Row {...props} className={cls(styles.column, props.className)} />
  );
}

export function Block(props) {
  const { w, h, ml = 0, mr = 0, mt = 0, mb = 0, color = "#f4f4f4", r = 0, elastic } = props;
  return (
    <View
      className={elastic ? styles.blockElastic : styles.block}
      style={{
        width: Taro.pxTransform(w),
        height: Taro.pxTransform(h),
        marginLeft: Taro.pxTransform(ml),
        marginRight: Taro.pxTransform(mr),
        marginTop: Taro.pxTransform(mt),
        marginBottom: Taro.pxTransform(mb),
        borderRadius: Taro.pxTransform(r),
        backgroundColor: color
      }}
    />
  );
}

export function ElasticBlock(props) {
  return (
    <Block elastic {...props} />
  );
}
