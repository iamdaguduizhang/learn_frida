Java.perform(function(){
    // 一个hook文件内，可以编写函数，或直接调用某些方法，就类似于一个python脚本，不过这是一个js脚本而已
    Java.enumerateLoadedClasses({  // 枚举出某个进程中所有的类
            onMatch: function(instance){
                if (instance.indexOf("MainActivity") != -1){
                    console.log("[->]\t"+instance);
                }
            },
            onComplete: function() {
                console.log("[*] class enuemration complete");
            }

        });

    Java.choose("com.example.mytestapplication.MainActivity",{  // java.choose需要再java.perform中使用，
        // 查看进程中是否有该类的实例
      onMatch: function (instance){
        console.log("[*] "+"com.example.mytestapplication.MainActivity instance found"+" :=> '"+instance+"'");
        console.log(instance.add(5, 6));  // 调用类的某个方法
      },
      onComplete: function() { console.log("[*] -----");}
    });

    function enumMethods(targetClass)  // 通过类名获得该类所有的方法的函数
    {
        var hook = Java.use(targetClass);
        var ownMethods = hook.class.getDeclaredMethods();
        hook.$dispose;
        return ownMethods;
    }
    var a = enumMethods("com.example.mytestapplication.MainActivity"); // 调用函数，获取某个类的所有方法
		a.forEach(function(s) {
			console.log(s);
		});


    var Activity = Java.use("com.example.mytestapplication.MainActivity");//获得类
    Activity.add.implementation = function () { //implementation 重新定义函数，无法获得原参数
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        return this.add(9, 10);
    };

    Activity.add.overload("int" , "int").implementation = function (x, y) { //implementation 重新定义函数
                                                                            // 这样可以接收到原函数的参数
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh", x, y);              // 此处x y 是原来的参数
            x = 10;
            y = 11;
            return this.add(x, y);
        };



});