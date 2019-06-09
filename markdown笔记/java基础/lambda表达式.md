# lambda表达式

--jdk version:1.8以上

## 1.无参函数简写

```java
//例子：线程
//以前的写法
new Thread(new Runnable() {//接口
    @Override
    public void run() {//方法
        System.out.println("Thread Run!");
    }
}).start();//启动线程

//lambda写法
//省略接口名和方法名
new Thread(() -> System.out.println("Thread run way two!")).start();

//多行使用{}
new Thread(() -> {
    System.out.println("hello");
    System.out.println("world");
}).start();
```

## 2.带参函数简写

```java
排序写法
//JDK7写法
List<String> list = Arrays.asList("I","LOVE","YOU","TOO");
Collections.sort(list, new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        if(s1 == null) return -1;
        if(s2 == null) return 1;
        return s1.length() - s2.length();
    }
});
System.out.println(list);//[I, YOU, TOO, LOVE]

//lambda写法
List<String> listOther = Arrays.asList("I","LOVE","YOU","TOO");
Collections.sort(listOther , (s1,s2) -> {
    if(s1 == null) return -1;
    if(s2 == null) return 1;
    return s1.length()-s2.length();
});
System.out.println(listOther);//[I, YOU, TOO, LOVE]
```

tips:

[Arrays类相关方法](<https://blog.csdn.net/goodbye_youth/article/details/81003817>)

[Collections用法](<https://blog.csdn.net/zhzh402/article/details/79672092>)

## 3.自定义函数接口

```java
/**
 * 自定义函数接口
 */
@FunctionalInterface //检查函数是否符合函数接口规范,使用该注解只能存在一个抽象方法
public interface ConsumerInterface {

    //add
    void add(String message);
}

public static void main(String[] args) {
    ConsumerInterface consumer = message -> System.out.println("hello"+message);
    consumer.add(" world"); //hello world
}
```

## 4.了解collections的相关方法

#### forEach:

```java
//获取字符串长度超过3的字符串
static void getLengthOverThree() {
	List<String> list = Arrays.asList("hello","love","ki","ov","string");
    for (String s : list) {
        if(s.length() > 3) {
            System.out.println(s);
        }
    }

    System.out.println("-----------------");

    //使用forEach结合匿名内部类迭代
    list.forEach(new Consumer<String>() {
        @Override
        public void accept(String s) {
            if(s.length() > 3) {
                System.out.println(s);
            }
        }
    });

    System.out.println("-----------------");

    //使用lambda
    list.forEach(str -> {
        if(str.length() > 3)
            System.out.println(str);
    });
}
```

#### removeIf:(删除容器中满足filter指定条件的元素)

```java
//删除元素
static void deleteLengthOverThree() {
    //必须这样写,否则会报java.lang.UnsupportedOperationException,因为内部类没有重写
    List<String> list = new ArrayList<>(Arrays.asList("I","LOVE","YOU","TOO"));
    List<String> list2 = new ArrayList<>();
    List<String> list3 = new ArrayList<>();
    list2.addAll(list);
    list3.addAll(list);
    //使用迭代器删除列表元素
    Iterator<String> it = list.iterator();
    while (it.hasNext()) {
        if(it.next().length() > 3) {
            it.remove();
        }
    }
    System.out.println(list);

    System.out.println("---------------------");

    //使用removeif结合匿名内部类
    list2.removeIf(new Predicate<String>() {
        @Override
        public boolean test(String s) {
            return s.length() > 3;
        }
    });
    System.out.println(list2);

    System.out.println("----------------------");

    //使用lambed
    list3.removeIf(s -> {
        return s.length() > 3;
    });
    System.out.println(list3);
}
```

#### replaceAll:(对每个元素执行指定操作,并用操作结果替换原来的元素)

```java
//元素替换
static void replaceAll() {
    List<String> list = new ArrayList<>(Arrays.asList("I","LOVE","YOU","TOO"));
    //使用下标实现元素替换
    for (int i = 0,size = list.size();i < size;i++) {
        String str = list.get(i);
        list.set(i , str.toLowerCase());
    }
    System.out.println(list);

    list.replaceAll(new UnaryOperator<String>() {
        @Override
        public String apply(String s) {
            return s.toUpperCase();
        }
    });
    System.out.println(list);

    list.replaceAll(s -> {
        return s.toLowerCase();
    });
    System.out.println(list);
}
```

#### sort:根据指定比较规则对元素进行排序

```java
//元素排序
static void sort() {
    List<String> list = new ArrayList<>(Arrays.asList("I","LOVE","YOU","TOO"));
    Collections.sort(list, new Comparator<String>() {
        @Override
        public int compare(String s, String t1) {
            return s.length() - t1.length();
        }
    });

    Collections.sort(list,(s, t1) ->  s.length() - t1.length());

    list.sort((s, t1) -> s.length() - t1.length());

    list.sort(Comparator.naturalOrder()); //升序
    list.sort(Comparator.reverseOrder());//降序
    System.out.println(list);
}
```

tips:

[Java8 Comparator 排序方法](<https://www.jianshu.com/p/3f621e51f306>)

## 5.了解Map中的新方法

#### forEach:

```java
//forEach
static void mapForEach() {
    HashMap<Integer,String> map = new HashMap<>();
    map.put(1,"one");
    map.put(2,"two");
    map.put(3,"three");
    for(Map.Entry<Integer,String> entry : map.entrySet()) {
        System.out.println(entry.getKey() + ":" + entry.getValue());
    }

    //使用Map.forEach配合匿名内部类
    map.forEach(new BiConsumer<Integer, String>() {
        @Override
        public void accept(Integer integer, String s) {
            System.out.println(integer + ":" + s);
        }
    });

    //lambda
    map.forEach((integer, s) -> System.out.println(integer + ":" + s));
}
```

#### getOrDefault:（按照指定key查询对应value,如果没有返回默认值）

```java
/**
	* 按照key进行查询,如不存在返回默认值
	*/
static void getAllDefault() {
    Map<Integer,Object> map = new HashMap<>();
    map.put(1,"hello");
    map.put(2,"world");
    map.put(3,"say");
    //jdk7以及之前
    if(map.containsKey(4)) {
        System.out.println(map.get(4));
    } else {
        System.out.println("no value");
    }

    //jdk8
    map.getOrDefault(4,"no value");
}
```

#### pulfAbsent:（只有在不存在key值的映射或映射值为null时，才将value指定的值放入Map中,否则部队Map做更改）

```java
map.putIfAbsent(4,"hello"); //不存在或为null时才生效
System.out.println(map);
```

#### replace:

> JDK7及以前,可通过put(k,v)方法实现
>
> JDK8加入了replace方法(2个)
>
> ​	.- replace(k,v),只有在当前map中存在key的映射才会替换
>
> ​	- replace(key,oldValue,newValue),只有存在key的映射且值等于oldValue时才会替换

```java
map.replace(4,"vvv");
System.out.println(map);

map.replace(4,"vvv","sss");
System.out.println(map);
```

#### replaceAll:全部替换

```java
//全部替换
static void mapReplaceAll() {
    //jdk1.7
    HashMap<Integer,String> map = new HashMap<>();
    map.put(1,"one");
    map.put(2,"two");
    map.put(3,"three");
    for(Map.Entry<Integer,String> entry : map.entrySet()) {
        entry.setValue(entry.getValue().toUpperCase());
    }
    System.out.println(map);

    //replaceAll结合匿名内部类
    map.replaceAll(new BiFunction<Integer, String, String>() {
        @Override
        public String apply(Integer integer, String s) {
            return s.toLowerCase();
        }
    });
    System.out.println(map);

    //lambda
    map.replaceAll((integer, s) -> s.toUpperCase());
    System.out.println(map);
}
```

#### merge:

> 1.如果Map中key对应的映射不存在或者为null,则将value(不能为null)关联到key上
>
> 2.否则执行remappingFunction,如果执行结果为非null则用该结果跟key关联,否则在map中删除key的映射

```java
static void merge() {
    Map<Integer,Integer> map = new HashMap<>();
    map.put(1,100);
    map.put(2,200);
    map.put(3,300);
    map.merge(1,10,(v1,v2) -> v1+v2);
    System.out.println(map);//{1=110, 2=200, 3=300}
}
```

#### compute():把计算结果关联到key上,如果计算结果为null，则在map中删除key的映射

> 例:实现错误信息拼接
>
> map.compute(key,(k,v) -> v == null ? newMsg : v.concat(newMsg)); 

```java
//实现错误信息拼接
static void compute() {
    HashMap<Integer,String> map = new HashMap<>();
    map.put(1,"one");
    map.put(2,"two");
    map.put(3,"three");
    map.compute(1,(k, v) -> v == null ? "wrong" : v.concat("wrong"));
    System.out.println(map);//{1=onewrong, 2=two, 3=three}
}
```

#### computeIfAbsent

> 只有在当前map中不存在key值的映射或映射值为null时,才调用mappingFunction，并在mappingFunction执行结果中为非null,将结果跟key关联

```java
//多值映射并添加新值
static void computeIfAbsent() {
    Map<Integer,Set<String>> map = new HashMap<>();
    if(map.containsKey(1)) {
        map.get(1).add("one");
    } else {
        Set<String> set = new HashSet<>();
        set.add("yi");
        map.put(1,set);
    }

    //jdk1.8
    map.computeIfAbsent(2,integer -> new HashSet<String>()).add("一");
    System.out.println(map);//{1=[yi], 2=[一]}
}
```

## 6.Streams API

> java8之所以费大工夫引入函数式编程原因:
>
> 1.代码简洁函数式编程写出的代码简洁且意图明显,使用stream接口告别for循环
>
> 2.多核友好,java函数式编程使得编写并行程序更加简单,需要的全部就是调用parallel()方法