import { View, Text } from "@tarojs/components";
import style from "./style.module.scss";

export default (props) => {
  const { children } = props;
  return (
    <View className={style.loading}>
      <View className={style.content}>
        <View className={style.icon} />
        <Text className={style.message}>{children || "加载中..."}</Text>
      </View>
    </View>
  );
};
