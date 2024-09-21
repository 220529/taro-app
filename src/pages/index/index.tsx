import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
// import { AtButton } from "taro-ui";
// import "taro-ui/dist/style/index.scss";
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
      <Button onClick={toVirtualized} className="btn-max-w" type="primary">
        虚拟列表
      </Button>
    </View>
  );
};
