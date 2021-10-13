# -*- coding: UTF-8 -*-
import time
import frida

def my_message_handler(message, payload):
    print(message)
    print(payload)

device = frida.get_usb_device()
pid = device.spawn(["com.example.mytestapplication"])
device.resume(pid)
time.sleep(1)
session = device.attach(pid)
with open("rpc.js", encoding="utf-8") as f:
    script = session.create_script(f.read())
script.on("message", my_message_handler)
script.load()

command = ""
while 1 == 1:
    command = input("Enter command:\n1: Exit\n2: Call secret function\nchoice:")
    if command == "1":
        break
    elif command == "2": #在这里调用
        a = script.exports.callsecretfunction(5, 12)
        print(a)

# rpc js

# console.log("Script loaded successfully ");
#
# function callSecretFun(a, b) { //定义导出函数
#     var result = 0;
#     Java.perform(function () { //找到隐藏函数并且调用
#         Java.choose("com.example.mytestapplication.MainActivity", {
#             onMatch: function (instance) {
#                 console.log("Found instance: " + instance);
#                 console.log("Result of secret func: " + instance.add(a, b));
#                 result = instance.add(a, b);
#             },
#             onComplete: function () { }
#         });
#     });
#     return result;
# }
# rpc.exports = {
#     callsecretfunction: callSecretFun //把callSecretFun函数导出为callsecretfunction符号，导出名不可以有大写字母或者下划线
# };