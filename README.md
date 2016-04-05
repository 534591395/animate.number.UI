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

1. init 方法    

   实例化后调用的初始化方法