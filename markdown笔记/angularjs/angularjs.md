###### jar
```
<script src="https://cdn.staticfile.org/angular.js/1.4.6/angular.min.js"></script>
```
---
angularjs 扩展了html
- ng-app 指令定义一个 AngularJS 应用程序
- ng-model 指令把元素值（比如输入域的值）绑定到应用程序
- ng-bind 指令把应用程序数据绑定到 HTML 视图
```
<div ng-app="">
    <input type="text" ng-model="name"/>
    <h4>姓名:{{name}}</h4>
</div>
```
---
###### 什么是angularjs?(<font color="#747d8c">angularjs指令以ng为前缀</font>)
- AngularJS 把应用程序数据绑定到 HTML 元素
- AngularJS 可以克隆和重复 HTML 元素
- AngularJS 可以隐藏和显示 HTML 元素
- AngularJS 可以在 HTML 元素"背后"添加代码
- AngularJS 支持输入验证
---
###### code
- AngularJs模块
```
var app = angular.module('myApp', []);
```
- AngularJs控制器控制应用
```
app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
});
```

