import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";

export default () => {
  const toVirtualized = () => {
    Taro.navigateTo({
      url: "/subpackages/virtualized/index",
    });
  };
  return (
    <View>
      home
      <AtButton onClick={toVirtualized} type="primary" circle={true}>
        虚拟列表
      </AtButton>
    </View>
  );
};
