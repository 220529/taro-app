import { throttle } from "lodash-es";
import { createRef, useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import Loading from "../../components/loading";
import { fetchData } from "./mock";
import Item from "./item";
import style from "./style.module.scss";

let itemHeight = 0;
let screenCount = 0;
const buffers = {
  top: 0.5,
  screen: 1.5,
  bottom: 0.5,
};

const Virtualized = (props) => {
  const { items } = props;
  const viewport = createRef();
  const content = createRef();
  const itemRef = createRef();

  const [offet, setOffset] = useState({ start: 0, end: 0 });
  useEffect(() => {
    // @ts-ignore
    itemHeight = itemRef.current?.clientHeight;
    // @ts-ignore
    const screenHeight = viewport.current?.clientHeight;
    screenCount = Math.ceil(screenHeight / itemHeight);
    setOffset({ start: 0, end: screenCount * buffers.screen });
  }, []);
  const bufferOffset = useMemo(() => {
    return {
      top: Math.min(offet.start, Math.max(buffers.top * screenCount)),
      bottom: Math.min(
        items.length - offet.end,
        Math.max(buffers.bottom * screenCount)
      ),
    };
  }, [offet, screenCount]);
  const onScroll = throttle((e) => {
    const start = Math.floor(e.detail.scrollTop / itemHeight);
    setOffset({ start, end: start + screenCount });
  }, 1000);

  const renderList = useMemo(() => {
    return items.slice(
      offet.start - bufferOffset.top,
      offet.end + bufferOffset.bottom
    );
  }, [offet, bufferOffset, items]);

  const translateY = useMemo(() => {
    return (offet.start - bufferOffset.top) * itemHeight;
  }, [offet, bufferOffset]);

  return (
    <View className={style.container}>
      <View className={style.header}>
        <Text>
          virtualized! {translateY} {JSON.stringify(bufferOffset)}
        </Text>
      </View>
      <ScrollView
        ref={viewport}
        className={style.viewport}
        scrollY
        scrollWithAnimation
        onScroll={onScroll}
      >
        <View
          className={style.faker}
          style={{ height: itemHeight * items.length + "px" }}
        />
        <View
          className={style.items}
          ref={content}
          style={{ transform: `translate3d(0, ${translateY}px ,0)` }}
        >
          {renderList.map((i, index) => (
            <Item key={i.id} data={i} />
          ))}
        </View>
      </ScrollView>
      <View ref={itemRef} className={style.none}>
        <Item data={items[0]} />
      </View>
    </View>
  );
};

const num = 10000 * 0.1;
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
