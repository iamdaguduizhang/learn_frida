console.log("Script loaded successfully ");

function callSecretFun(a, b) { //定义导出函数
    var result = 0;
    Java.perform(function () { //找到隐藏函数并且调用
        Java.choose("com.example.mytestapplication.MainActivity", {
            onMatch: function (instance) {
                console.log("Found instance: " + instance);
                console.log("Result of secret func: " + instance.add(a, b));
                result = instance.add(a, b);
            },
            onComplete: function () { }
        });
    });
    return result;
}
rpc.exports = {
    callsecretfunction: callSecretFun //把callSecretFun函数导出为callsecretfunction符号，导出名不可以有大写字母或者下划线
};