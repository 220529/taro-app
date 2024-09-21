import { View, Text } from "@tarojs/components";
import style from "./style.module.scss";

export default () => {
  return (
    <View className={style.container}>
      <Text className={style.title}>Hello virtualized!</Text>
    </View>
  );
};
