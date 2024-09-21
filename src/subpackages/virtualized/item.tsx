import { View, Text } from "@tarojs/components";
import style from "./style.module.scss";

export default (props) => {
  const { data } = props;
  return (
    <View className={style.item}>
      <View className={style.info}>
        <View
          className={style.left}
          style={{ backgroundColor: data.image }}
        ></View>
        <View className={style.right}>
          <Text style={{ color: data.color }}>
            {data.id}, {data.title}
          </Text>
          <Text style={{ color: data.color2 }}>{data.subTitle}</Text>
        </View>
      </View>
      <View className={style.description}>{data.description}</View>
    </View>
  );
};
