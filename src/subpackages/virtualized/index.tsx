import Taro from "@tarojs/taro";
import { throttle } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import Loading from "../../components/loading";
import { fetchData } from "./mock";
import Item from "./item";
import style from "./style.module.scss";

const buffers = {
  top: 0.5,
  screen: 1.5,
  bottom: 0.5,
};

const Virtualized = (props) => {
  const { items } = props;
  const [offset, setOffset] = useState({ start: 0, end: 0 });
  const [itemHeight, setItemHeight] = useState(0);
  const [screenCount, setScreenCount] = useState(0);
  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select("#hidden").boundingClientRect();
    query.select("#viewport").boundingClientRect();
    query.exec((res) => {
      if (res[0] && res[1]) {
        const _height = res[0].height;
        setItemHeight(_height);
        const screenHeight = res[1].height;
        const _count = Math.ceil(screenHeight / _height);
        setScreenCount(_count);
        setOffset({ start: 0, end: _count * buffers.screen });
      }
    });
  }, []);
  const bufferOffset = useMemo(() => {
    return {
      top: Math.min(offset.start, Math.max(buffers.top * screenCount)) || 0,
      bottom:
        Math.min(
          items.length - offset.end,
          Math.max(buffers.bottom * screenCount)
        ) || 0,
    };
  }, [offset, screenCount]);
  const [oldTime, setOldTime] = useState(0);
  const onScroll = (e) => {
    const time = Date.now();
    if (time - oldTime > 15) {
      setOldTime(time);
      const start = Math.floor(e.detail.scrollTop / itemHeight);
      setOffset({ start, end: start + screenCount });
    }
  };

  const renderList = useMemo(() => {
    return items.slice(
      offset.start - bufferOffset.top,
      offset.end + bufferOffset.bottom
    );
  }, [offset, bufferOffset, items]);

  const translateY = useMemo(() => {
    const offsetTop = (offset.start - bufferOffset.top) * itemHeight;
    return offsetTop || 0;
  }, [offset, bufferOffset]);

  return (
    <View className={style.container}>
      <View className={style.header}>
        <Text>
          virtualized! {translateY} {JSON.stringify(bufferOffset)}
        </Text>
      </View>
      <ScrollView
        scrollY
        id="viewport"
        scrollWithAnimation
        onScroll={onScroll}
        className={style.viewport}
      >
        <View
          className={style.faker}
          style={{ height: itemHeight * items.length + "px" }}
        />
        <View
          className={style.items}
          style={{ transform: `translate3d(0, ${translateY}px ,0)` }}
        >
          {renderList.map((i, index) => (
            <Item key={i.id} data={i} />
          ))}
        </View>
      </ScrollView>
      <View className={style.none} id="hidden">
        <Item data={items[0]} />
      </View>
    </View>
  );
};

const num = 10000 * 0.2;
const App = () => {
  const [items, setItems] = useState([]);
  const init = async () => {
    const res = await fetchData(num);
    setItems(res);
  };
  useEffect(() => {
    init();
  }, []);
  return items.length ? (
    <Virtualized items={items} />
  ) : (
    <Loading>正在加载{num}条数据</Loading>
  );
};

export default App;
