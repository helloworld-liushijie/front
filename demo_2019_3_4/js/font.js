{
    var a = 1;//js区块不构成单独作用域
}

//"\251"-->©版权号
//页面写入:eval("x=10;y=20;document.write(x*y);");
//eval最常见的场合是解析 JSON 数据的字符串，不过正确的做法应该是使用原生的JSON.parse方法。

$(function() {
    template_use();
})

function template_use() {
    const user = 'mary';
    const topic = 'markdown write it';
    const temp = highlight`${user} was sasy ${topic}`;
    document.body.innerHTML = temp;
}

/**
 * 标签模板使用
 */
function add_nodes() {
    const jelly = {
        name:'jelly',
        age:20,
        todos:[
            {name:'jelly',todo:'遛狗',complete:false},
            {name:'bool',todo:'哈哈哈',complete:true},
            {name:'sj',todo:'sd',complete:true}
        ]
    }

    let template = `<ul>
        ${jelly.todos.map(todo => `<li>${todo.name} ${todo.complete ? '✔' : '❌'}</li>`).join('')}
        </ul>
        `;
    document.body.innerHTML = template;
}

/**
 * 标签模板
 */
function highlight(strings,...values) {
    //debugger;
    const highlighted = values.map(value => `<span class="highlight">${value}</span>`);
    let str = '';
    strings.forEach((string,i) => str += `${string}${highlighted[i] || ''}`);
    return strings.reduce((prev,curr,i) => `${prev}${curr}${highlighted[i] || ''}`,'');
    //return str;
    //return 'laravist';
}

/**
 * 查找字符串第一个出现次数超过一次的字符
 */
function appear() {
    var str = "abcda";
    var num = 0;
    for(var i = 0;i < str.length;i++) {1
        var count = 0;
        for(var j = 0;j < str.length;j++) {
            if(str[j] == str[i]) {
                count++;
            }
        }
        if(count == 1) {
            num++;
        }
        if(count == 1 && num == 1) {
            console.log(str[i]);
        } 
    }
}

function let_var() {
    //此处使用let声明,使用var会重复打印10
    for(let i = 0;i < 10;i++) {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    }
}

/**
 * 文件上传--只允许图片上传
 */
function upload_file() {
    //文件获取--多文件
    var file = $("input[type='file']")[0].files;
    if(file.length) { //文件已选择
        /** 判断文件类型 */
        var file_type = file[0].type.slice(0,file[0].type.indexOf('/'));
        if(file_type === "image") { //属于图片
            $.ajax({
                url:document.location.href+'/upload_file.json',
                data:{file:file[0]},
                type:'post',
                processData:false,
                success:function(data) {
                    console.log(data);
                }
            })
        } else {
            alert('只允许上传图片类型');
        }
    }
}

/**
 * 控制台输出
 * %s 字符串
 * %d 整数
 * %i 整数
 * %f 浮点数
 * %o 对象的链接
 * %c CSS 格式字符串
 * console系列语句
 * debugger语句
 */
function print_console() {
    console.log('%s+%s=%s',1,1,2);
    console.log('%c输出信息','color:red;background:yellow;font-size:24px');
    console.info('信息输出');
    console.warn('信息提示');
    console.error('报错信息');
    var languages = [
        { name: "JavaScript", fileExtension: ".js" },
        { name: "TypeScript", fileExtension: ".ts" },
        { name: "CoffeeScript", fileExtension: ".coffee" }
    ];
    console.table(languages);//转为表格显示
    console.dirxml(document.body);

    console.time("init");
    var arr = new Array(10000000);
    for(var i = arr.length-1;i >= 0;i--) {
        arr[i] = new Object();
    }
    console.timeEnd('init');
    console.group('一级分组');
    console.log('一级分组内容');
    console.group('二级分组');
    console.log('二级分组内容');
    console.groupEnd();
    console.groupEnd();
    console.groupCollapsed('一级分组');//默认不展开
    console.groupCollapsed('二级分组');
    console.groupEnd();
    console.groupEnd();
    console.trace();//显示当前代码堆栈调用
    //console.clear();
    for(var i = 0;i < 100;i++) {
        console.log(i);
        if(i == 10) {
            debugger;
        }
    }
}

/**
 * 数组逆向输出
 */
function arr_reverse_console() {
    var arr = ['a','b','c','d','e','f','g','h','i','j'];
    var i = arr.length;
    while(i--) {
         console.log(arr[arr.length-1-i]);
    }
}

/**
 * 逻辑与&&另类写法
 * @param {*} num1 
 * @param {*} num2 
 */
function logic(num1,num2) {
    var boolean = null;
    if(num1 > num2) boolean = true;
    if(!(num1 > num2)) boolean = false;
    boolean && (function() {
        console.log("num1 > num2");
    })()
}

/**
 * 闭包封装对象的私有属性和私有方法
 * -->不能滥用闭包,会造成网页性能问题
 */
function obj_package() {
    function Person() {
        var person_age = null;
        function setAge(n) {
            person_age = n;
        }
        function getAge() {
            return person_age;
        }
        return {
            getAge:getAge,
            setAge:setAge
        };
    }
    var p1 = Person();
    p1.setAge(20);
    console.log(p1.getAge());
}

/**
 * 函数
 * citizen.toString();//返回函数源码--注释也会返回
 */
function citizen() {
    function add(x,y) {
        return x+y;
    }
    var res = add;
    function a(fun) {
        return fun;
    }
    console.log(a(add)(10,20));//30
}

/**
 * 斐波那契数列
 * 递归
 */
function recursion(num) {
    if(num == 0) return 0;
    if(num == 1) return 1;
    return recursion(num-1)+recursion(num-2);
}

/**
 * 属性查看
 */
function attr_look() {
    console.log(Object.keys(test));// ["t1", "t2", "t3", "t4"]
    delete test.t1;
    console.log(Object.keys(test));// ["t2", "t3", "t4"]
    console.log('t2' in test);
    console.log('toString' in test);//in不能判断是否是继承来的属性
    console.log(test.hasOwnProperty('toString'));//false 属性继承自Object
    var obj = {
        name:'张三',
        address:'北京',
        age:20
    }
    //不建议使用-->绑定对象不明确
    with(obj) { //等同于console.log(obj.xxx);
        console.log(name);//'张三'
        console.log(address);//'北京'
        console.log(age);//20
    }
}

/**
 * 链式引用
 */
function chain_obj() {
    var a1 = {};
    var a2 = {address:'重庆市'};
    a1.foo = a2;
    console.log(a1.foo.address);
}

/**
 * 正则匹配
 * 匹配规则:
 * 1--号码长度为13位
 * 2--以86国家码开头
 * 3--手机号每一位都是数字
 */
function reg_match() {
    var tel = "8634291232112";
    if(tel.length != 13) {
        console.log("号码长度不符合13位要求");
    } else {
        var reg = /86.{11}/;
        var res = reg.test(tel);
        if(!res) {
            console.log("不符合前两位86要求");
        } else {
            var reg = /86[0-9]{11}/;
            var type_is = reg.test(tel);
            if(!type_is) {
                console.log("不符合全是数字要求");
            } else {
                console.log("号码符合要求");
            }
        }
    }
}

/* 避坑 */
function demo1() {
    var i ;
    console.log(i);//underfined 数据未定义
    if(1) { 
        console.log(true);
    }
    var i = 0;
    var j = 1;
    if(i = j) {//赋值后变化未 if(1){}
        console.log(true);
    }
    var m = "3";
    if(m == 3) { //==不判断数据类型，===会判断数据类型
        console.log(m);
    }
    switch(1+1) { //switch使用 === 进行表达式
        case 1:
            console.log(1);
            break;
        case 2:
            console.log(2);
            break;
        default:
            console.log('default');
            break;
    } //console.log() --> 2 
}

//循环打印100次
function demo2(n) {
    while(n-- > 0 ){
        console.log(`第${n}次`);
    }
}

//奇偶数判断
function judge(num) {
    var res;
    (num%2==0)?res='偶数':res='奇数';
    return res;
}

//while测试
var test = {
    t1:function(i) {
        while(i > 0) {
            console.log(i);
            i--;
        }
    },
    t2:function(num) { //将偶数存入数组
        var arr = [];
        var i = 0;
        while(i <= num) {
            if(i % 2 == 0) {
                arr.push(i);
            }
            i++;
        }
        console.log(arr);
    },
    t3:function() {
        //输出a,b不相等的数据
        top:for(var i = 0;i < 10;i++) {
            for (var j = 0;j < 10;j++) {
                if(i === j) continue top;
                console.log(i+":::"+j);
            }    
        }
    },
    t4:function(pro) {
        if(typeof pro === 'number') { //* typeOf null -->Object
            console.log("number类型");
        } else if(pro instanceof Array) {
            console.log("数组类型");//数组也是特殊对象,所以typeof pro -->Object
        } else {
            console.log(`!number类型--!数组类型`);
        }
    }
}