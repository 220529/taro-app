import { View, Text } from "@tarojs/components";
import style from "./style.module.scss";

export default () => {
  return (
    <View className={style.mine}>
      <Text className={style.title}>Hello mine!</Text>
    </View>
  );
};
