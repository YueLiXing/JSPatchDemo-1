# JSPatchDemo
## 配套后台代码(含服务端源码和Apache Tomcat 7.0.72 Mac版)
https://github.com/macosunity/JSPatchDemoServer

# JSPatch 使用说明

### iOS线上APP 紧急bug热修复第三方框架      


# 目录
1. <span id="#link1">什么是JSPatch</span>
1. <span id="#link2">仓库设置方法（后台文件管理）</span>
1. <span id="#link3">JSPatch iOS端＋服务端完整Demo</span>
1. <span id="#link4">更新策略</span>
1. <span id="#link5">开发步骤</span>
1. <span id="#link6">JSPatch语法</span>
1. <span id="#link7">JSPatch部署安全策略</span>
1. <span id="#link8">更多思考</span>

<span id='link1'>
## 1. 什么是JSPatch
</span>

> #### 热修复
一种即时修复bug的技术，也叫hotfix。

在iOS开发中，存在bug修复周期长的问题。若程序出了bug，往往需要走一下步骤：
修改代码--打包--提交审核(--审核被拒--修改代码--再次提交审核)--用户更新。
需要很长一个周期才能解决问题。而JSPatch的出现，有效的解决了这一尴尬的局面。

JSPatch是一个动态更新的开源的框架，可以实时的修复bug(热修复)、添加新功能。从服务器下发补丁js补丁代码，客户端接收到补丁后，进行安全校验，然后用JS调用或替换原来crash的OC方法，从而达到实时修复bug的目的。

#### 基础原理
通过 Objective-C Runtime 在运行时，可以通过类名/方法名反射得到相应的类和方法。

* 也可以替换某个类的方法为新的实现.
* 还可以新注册一个类，为类添加方法.

简单来说就是：JS 传递字符串给 OC，OC 通过 Runtime 接口调用和替换 OC 方法

#### 深入理解
* [JSPatch 源码分析(一)](http://www.jianshu.com/p/6cc18cfc9354)
* [JSPatch 源码分析(二)](http://www.jianshu.com/p/3d9a1c53016a)

<span id='link2'>
## 2. 仓库设置方法（后台文件管理）
</span>

js文件肯定不能随便往后台某个文件夹一放就让前端去下载了，虽然使用方便但是在App或者版本较多时容易混乱。伴随时间的推移，项目也会不断的维护升级，所以后台对js热更新脚本的管理也是相当重要。为了规范起见，建议在后台直接搭建一个远程仓库，专门用来管理App端热修复的问题。
客户端在发送请求的时候需要带上自己的APPName,Version等参数，然后根据服务器端的返回进行后续操作。

<span id='link3'>
## 3. JSPatch iOS端＋服务端完整Demo
</span>

参考demo：[JSPatchDemo](https://github.com/macosunity/JSPatchDemo)

<span id='link4'>
## 4. 更新策略
</span>

#### 流程简要说明
当客户端出现bug时，iOS开发人员编写js脚本，脚本编写完成后，服务端人员根据iOS开发人员提供的js脚本通过某种安全策略部署服务端脚本，iOS客户端通过调用服务端的脚本版本检测接口，判断是否需要下载js脚本，下载脚本成功后，进行加载，运行，进而修复App的bug。

* 从本地沙盒获取js补丁
* 如果本地存在js补丁，直接执行本地的js补丁，如果不存在则继续下面的步骤
* 向服务器请求js补丁
* 执行补丁js代码


<span id='link5'>
## 5. 开发步骤
</span>

#### 部署JSPatch环境

1. 从[https://github.com/bang590/JSPatch](https://github.com/bang590/JSPatch)下载JSPatch源码导入自己的项目中，或通过CocoaPods引入JSpatch插件。

		pod 'JSPatch', '~> 1.1'
		安装命令：
		pod install
        
1. 工程中引入系统框架JavaScriptCore.framework
1. 工程中引入服务端生成的RSA校验所需的公钥

#### 判断是否需要从服务端加载js脚本

客户端通过服务端提供的js脚本版本接口，把app的版本号和js脚本的版本号传给服务器，服务器根据这两个信息判断是否需要下载js脚本，并返回给客户端需要下的的版本号及js下载地址。
> 下载版本号和js代码失败不会影响程序的正常运行

#### 下载、校验、保存js脚本

客户端从服务端下载js脚本和RSA校验码。下载完成后对js脚本进行md5加密，得到的md5值对RSA校验码进行校验。校验成功，保存js脚本，js脚本的版本号。

#### 运行JS脚本，修复app bug

在AppDelegate中引入JPEngine.h文件 ，在didFinishLaunchingWithOptions函中执行
[JPEngine startEngine]启动JSPatch，接着把从服务器中下载的js文件内容读到字符串script中，通[JPEngine evaluateScript:script];运行脚本文件，修复appbug。

	[JPEngine startEngine];
	NSString *sourcePath = [[NSBundle mainBundle] pathForResource:@"demo" ofType:@"js"];
	NSString *script = [NSString stringWithContentsOfFile:sourcePath encoding:NSUTF8StringEncoding error:nil];
	[JPEngine evaluateScript:script];

<span id='link6'>
## 6. JSPatch语法
</span>

这个JSPatch语法 并不是一个正式的语种，大家不会投入太大的精力来仔细学习，所以JSPatch作者本人也提供了一个简单粗暴的OC到JS直接转换工具：[JSPatchConvertor](http://bang590.github.io/JSPatchConvertor/)

这个工具一些简单的写法是正确转换的，但是比较复杂的语法还是不能让机器直接搞定，还是需要人工修改的。

具体语法细节，参考JSPatch官方wiki：[https://github.com/bang590/JSPatch/wiki](https://github.com/bang590/JSPatch/wiki)

<span id='link7'>
## 7. JSPatch 部署安全策略
</span>

使用 JSPatch 有两个安全问题：

* 传输安全：JS 脚本可以调用任意 OC 方法，权限非常大，若被中间人攻击替换代码，会造成较大的危害。
* 执行安全：下发的 JS 脚本灵活度大，相当于一次小型更新，若未进行充分测试，可能会出现 crash 等情况对 APP 稳定性造成影响。

详细参考博客：[https://segmentfault.com/a/1190000003689114](https://segmentfault.com/a/1190000003689114)

<span id='link8'>
## 8. 更多思考
</span>

* 接入了JSPatch之后，iOS的线上bug看上去就不向以前那样"猛如虎"了，但是这仅仅是一个紧急预案措施，以前规范的流程还是需要遵守。
* 每一次本版本用JSPatch解决的线上bug，下个版本必须用OC代码写入项目中，不能允许补丁代码的存留超过一个版本。
* 倡导使用敏捷开发的思想，类似于主逻辑或者是功能模块入口的方法可以抽的更细，这样即使需要修改，成本也不会太大，作者本人也提到，如果有一行代码必须要在一个大方法的中间进行修改，那我也没办法了，你只能把这整个方法都用js写一遍了。
* 每次用JSPatch解决掉的线上bug，应当有一个专门的文档记录。

