# 数字滚动组件 Animate.Number.UI 使用说明

 ## 引用方式
 
### js引用
```
<body>
   <div id="box"></div>
   <script src="import/jquery.js"></script>
   <script src="animate.number.UI.js"></script>
   <script>
        var animateNumberUI = new AnimateNumberUI();
        var callback = function(obj, value) { 
           setTimeout(function() {
           	  obj.render({reRenderBool:true});
           },3000);     	
        };
        animateNumberUI.init({minLength: 7,ajaxUrl:'http://127.0.0.1:18081/number'}).after(callback);
   </script>
</body>
```

### css引用
```
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="stylesheet" href="css.css">
	<title>数字滚动组件</title>
</head>
```
**使用说明**    
首先需要实例化对象，再调用 init方法初始化；设置了 ajaxUrl,就会启动ajax请求；初始化化后调用 after 方法，传入回调方法    
回调方法返回两个参数：1. obj,即实例化对象 animateNumberUI；2. value，即展示的数据 

------

## API

**init 方法**   

   实例化后调用的初始化方法，配置参数说明：        
   1）. config.ajaxUrl  ---- ajax请求地址    
   2）. config.$parent  ---- 外部html容器，必须为$Dom，如果未配置，默认是 $('body')    
   3）. config.value    ---- 要显示的内容-数字，必须 为正整数    
   4）. config.alert    ---- 异常提示的弹出框组件，默认为系统自带 window.alert    
   5）. config.animate  ---- 动画效果，默认为  'animate-EaseInOut'    
   6）. config.minLength --- 设置显示数字的最小位数，例如：value = '123' minLength=5 ,则 value = '00123';    
   
   例子：
   ```
      var animateNumberUI = new AnimateNumberUI();
      animateNumberUI.init({minLength: 7,ajaxUrl:'http://127.0.0.1:18081/number'});
   ```
------   
**render方法**       
   配置参数说明：    
   
   1）. config.reRenderBool ，bool值。当该值为 true时，重新设置内部的 dom；
   
   一般在改变了 value 后，必须调用该方法。    
   例子：    
   ```
     animateNumberUI.render();
   ```       
------   
**after 方法**
   
   配置参数说明：    
   
   1）. callback, 回调函数；var callback = function(obj,value) {}    
        obj 为实例化的 animateNumberUI；value 为显示的值（转换后的）
   
        一般在 配置了 ajaxUrl 时，使用该方法。
        ```
            var callback = function(obj, value) { 
                obj.render();     	
            };
            animateNumberUI.init({minLength: 7,ajaxUrl:'http://127.0.0.1:18081/number'}).after(callback);
        ```  
------        
**getValue 方法**
   获取显示的值（转换后）                
------

## 更新

【2016-04-05】    
    1. 修复文字显示错位；
    2. 修改内部ajax请求赋值；