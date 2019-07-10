HashMap 的遍历方式及其性能对比
> NO.1：for-each map.keySet() -- 只需要K值的时候，推荐使用
```
for (String key : map.keySet()) {
    map.get(key);
}
```
> NO.2：for-each map.entrySet() -- 当需要V值的时候，推荐使用
```
for (Map.Entry<String, String> entry : map.entrySet()) {
    entry.getKey();
    entry.getValue();
}
```
> NO.3：for-each map.entrySet() + 临时变量
```
Set<Map.Entry<String, String>> entrySet = map.entrySet();
    for (Map.Entry<String, String> entry : entrySet) {
        entry.getKey();
        entry.getValue();
}
```
> NO.4：for-each map.entrySet().iterator()
```
Iterator<Map.Entry<String, String>> iterator = map.entrySet().iterator();
    while (iterator.hasNext()) {
        Map.Entry<String, String> entry = iterator.next();
        entry.getKey();
        entry.getValue();
}
```