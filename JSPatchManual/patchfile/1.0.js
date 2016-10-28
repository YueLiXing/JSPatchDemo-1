

//这句话要谨慎使用，会自动把OC类型转成js类型，如果用它的话，很多类如NSString、NSDictionary等的调用会出问题
//autoConvertOCType(1)

require('UIScreen')

// global对象： 所有在全局作用域内定义的属性和方法，都是global对象的属性
global.SCREEN_WIDTH = UIScreen.mainScreen().bounds().width;
global.SCREEN_HEIGHT = UIScreen.mainScreen().bounds().height;

global.NSTextAlignmentLeft = 0;
global.NSTextAlignmentCenter = 1;
global.NSTextAlignmentRight = 2;

global.UIHelper = {
    bottomY:function(view) {
        var f = view.frame();

        return f.height + f.y;
    },
    rightX:function(view)  {
        var f = view.frame();

        return f.width + f.x;
    },
    setWidth:function(view, width){
        var f = view.frame();

        f.width = width;
        view.setFrame(f);
    },
    setHeight:function(view, height){
        var f = view.frame();

        f.height = height;
        view.setFrame(f);
    },
    setX:function(view, x) {
        var f = view.frame();

        f.x = x;
        view.setFrame(f);
    },
    setY:function(view, y) {
        var f = view.frame();

        f.y = y;
        view.setFrame(f);
    }
}

// JS中的单引号和双引号通用

// 在使用Objective-C类之前需要调用 require('className’), 可以用逗号分隔，一次性导入多个类
require('UIViewController,UIScrollView,NSMutableArray,UILabel,NSString,UIColor,UIButton,NSObject,UITableViewController,UITableViewCell,UIAlertView,UIAlertViewDelegate')

defineClass('UIScrollViewHelper: NSObject', {
    // 实例方法
    init: function() {
        self = self.super().init();
        console.log("UIScrollViewHelper init");
        return self;
    }
}, {
    // 类方法
    layoutScrollView: function(scrollView, subviewsArray, isVertical) {
        // 控制台输出信息
        console.log("layoutScrollView function");

        var firstViewInfoDict = subviewsArray[0];
        var firstView = firstViewInfoDict["view"];
        var firstTopLeft = {
            x:firstView.frame().x,
            y:firstView.frame().y
        };

        var currentLeft = firstTopLeft.x;
        var currentTop = firstTopLeft.y;

        for (var i = 0; i < subviewsArray.length; i++) {
            var viewInfoDict = subviewsArray[i];
            var view = viewInfoDict["view"];
            var padding = viewInfoDict["padding"];

            if (isVertical) {
                view.setFrame({x: (scrollView.frame().width - view.frame().width) / 2.0,
                               y: currentTop + padding,
                               width: view.frame().width,
                               height: view.frame().height});

                currentTop += view.frame().height;
                currentTop += padding;

                currentLeft = view.frame().x;
            } else {
                view.setFrame({x: currentLeft + padding,
                               y: currentTop,
                               width: view.frame().width,
                               height: view.frame().height});

                currentLeft += view.frame().width;
                currentLeft += padding;

                currentTop = view.frame().y;
            }

            scrollView.addSubview(view);
        }

        if (isVertical) {
            scrollView.setContentSize({width: scrollView.frame().width, height: currentTop});
        } else {
            scrollView.setContentSize({width: currentLeft, height: scrollView.frame().height});
        }

        subviewsArray = null;
    }
})

// Objective-C 里的常量/枚举不能直接在 JS 上使用，可以直接在 JS 上用具体值代替，
// 或者在 JS 上重新定义同名的全局变量：
var NSTextAlignmentCenter = 1;
var UIButtonTypeRoundedRect = 1;
var UIControlStateNormal = 0;
var UIControlEventTouchUpInside = 1 << 6;
var YES = 1;
var NO = 0;

defineClass('SuccessViewController: UIViewController', {
    init: function() {
        // 使用 self.super() 接口代表 super 关键字，调用 super 方法:
        self = self.super().init();
        console.log("SuccessViewController init ");
        return self;
    },
    viewDidLoad: function() {
        console.log("SuccessViewController viewDidLoad");

        self.super().viewDidLoad();
        self.setTitle("SuccessViewController");
        self.view().setBackgroundColor(UIColor.whiteColor());

        require('UIBarButtonItem');
        var backBarButtonItem = UIBarButtonItem.alloc().initWithTitle_style_target_action("返回", 0, self, "doClickBackAction");
        backBarButtonItem.setTitle("返回");
        self.navigationItem().setLeftBarButtonItem(backBarButtonItem);

        var verticalScrollView = UIScrollView.alloc().initWithFrame(self.view().frame());
        self.view().addSubview(verticalScrollView);

        // 这里的数组使用javascript的数组
        var vSubviewsArray = [];

        console.log("vSubviewsArray");

        for (var i = 0; i < 15; i++) {
            // JSPatch原生支持 CGRect / CGPoint / CGSize / NSRange 这四个 struct 类型，用 JS 对象表示:
            // CGRectMake(20, 20, 100, 100) 转换成JS语法为：{x:20, y:20, width:100, height:100}
            var lbl = UILabel.alloc().initWithFrame({x: 0,
                                                     y: 0,
                                                     width: global.SCREEN_WIDTH,
                                                     height: 100});
            lbl.setText("我是第" + (i + 1) + "个");

            // Objective-C 里的常量/枚举不能直接在 JS 上使用，可以直接在 JS 上用具体值代替，
            // 或者在 JS 上重新定义同名的全局变量：
            lbl.setTextAlignment(NSTextAlignmentCenter);
            // 多参数方法名使用 _ 分隔，如下面的 colorWithRed_green_blue_alpha
            lbl.setBackgroundColor(UIColor.colorWithRed_green_blue_alpha((10 * i) / 255.0, 100 / 255.0, (25 * i) / 255.0, 1.0));

            // 这里的字典使用javascript的字典
            vSubviewsArray.push({"view" : lbl,
                                 "padding" : (i == 0 ? (0) : (i * 2 + 5))});
        }

        var horizontalScrollView = UIScrollView.alloc().initWithFrame({x: 0,
                                                                       y: 0,
                                                                       width: global.SCREEN_WIDTH,
                                                                       height: 100});
        vSubviewsArray.push({"view" : horizontalScrollView,
                             "padding" : 5});

        var hSubviewsArray = [];

        console.log("hSubviewsArray");

        for (var i = 0; i < 15; i++) {
            var lbl = UILabel.alloc().initWithFrame({x: 0, y: 0, width: 200, height: 80});
            lbl.setText("我是第" + (i + 1) + "个");
            lbl.setTextAlignment(global.NSTextAlignmentCenter);
            // lbl.setTextAlignment(global.NSTextAlignmentRight);
            lbl.setBackgroundColor(UIColor.colorWithRed_green_blue_alpha((10 * i) / 255.0, 100 / 255.0, (25 * i) / 255.0, 1.0));
            hSubviewsArray.push({"view" : lbl,
                                 "padding" : (i == 0 ? (0) : (5))});
        }

        console.log("layout horizontalScrollView");
        UIScrollViewHelper.layoutScrollView(horizontalScrollView, hSubviewsArray, NO);

        console.log("layout verticalScrollView");
        UIScrollViewHelper.layoutScrollView(verticalScrollView, vSubviewsArray, YES);
    },
    doClickBackAction: function() {
        self.navigationController().popViewControllerAnimated(YES);
    }
})

// 目测JSPatch不能通过这种方式改变当前类的继承哦～～
// FailureViewController本来继承UIViewController，现在改成继承UITableViewController，但是然并卵
defineClass('FailureViewController: UITableViewController <UIAlertViewDelegate>', ['data'], {
    viewDidLoad: function() {
        self.super().viewDidLoad();

        console.log("FailureViewController viewDidLoad", self.class());

        self.setTitle("FailureViewController");
        self.view().setBackgroundColor(UIColor.whiteColor());

        require('UIBarButtonItem');
        var backBarButtonItem = UIBarButtonItem.alloc().initWithTitle_style_target_action("返回", 0, self, "doClickBackAction");
        backBarButtonItem.setTitle("返回");
        self.navigationItem().setLeftBarButtonItem(backBarButtonItem);

        //crash
//        self.tableView().setDataSource(self);
//        self.tableView().setDelegate(self);
    },
    doClickBackAction: function() {
        self.navigationController().popViewControllerAnimated(YES);
    },
    dataSource: function() {
        var data = self.data();

        if (data) {
            return data;
        }

        var data = [];

        for (var i = 0; i < 20; i++) {
            data.push("cell from js " + i);
        }

        self.setData(data);
        return data;
    },
    numberOfSectionsInTableView: function(tableView) {
        return 1;
    },
    tableView_numberOfRowsInSection: function(tableView, section) {
        return self.dataSource().length;
    },
    tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
        var cell = tableView.dequeueReusableCellWithIdentifier("cell")

        if (!cell) {
            cell = UITableViewCell.alloc().initWithStyle_reuseIdentifier(0, "cell")
        }

        cell.textLabel().setText(self.dataSource()[indexPath.row()])
        return cell
    },
    tableView_heightForRowAtIndexPath: function(tableView, indexPath) {
        return 60;
    },
    tableView_didSelectRowAtIndexPath: function(tableView, indexPath) {
        var alertView = UIAlertView.alloc().initWithTitle_message_delegate_cancelButtonTitle_otherButtonTitles("Alert", self.dataSource()[indexPath.row()], self, "OK", null);
        alertView.show();
    },
    alertView_willDismissWithButtonIndex: function(alertView, idx) {
        console.log('click btn ' + alertView.buttonTitleAtIndex(idx));
    }
})

require('NSString,UIFont,UIScreen,UILabel,UIColor,UITableViewCell,JPTestObject')

defineClass('CouponEfficientTableVIewCell : UITableViewCell', {
    drawTitle: function(context) {
        var font = null;
        var temp = null;

        font = UIFont.systemFontOfSize(18);
        temp = NSString.stringWithFormat("20元免息券");
        self.temp = temp;
        console.log("temp is " + temp);
        console.log("self.temp is " + self.temp);
        console.log("typeof temp is " + typeof temp);
        console.log("typeof self.temp is " + typeof self.temp);
        console.log("typeof \"\" is " + typeof "");
        console.log("typeof self is " + typeof self);

        var ocStr = JPTestObject.name();
        var ocInfo = JPTestObject.info();
        var ocUsers = JPTestObject.users();
        console.log("typeof ocStr is " + typeof ocStr);
        console.log("typeof ocInfo is " + typeof ocInfo);
        console.log("typeof ocUsers is " + typeof ocUsers);
            
        console.log("range is" + ocStr.rangeOfString("I'm"));   //OK
            
        ocInfo['a'] = "b";
        console.log("ocInfo['a'] is " + ocInfo['a']);
            
        console.log("ocUsers[0] is " + ocUsers.objectAtIndex(0).toJS());

        if (font) {
            
            //这样不行哦
//            var NSFontAttributeName = "NSFont";
//            var NSForegroundColorAttributeName = "NSColor";
//            temp.drawInRect_withAttributes({x: 20, y: 20, width: 100, height: 100}, {
//                NSFontAttributeName: font,
//                NSForegroundColorAttributeName: UIColor.purpleColor()
//            });
            
            //非得这样😂
            temp.drawInRect_withAttributes({x: 20, y: 20, width: 100, height: 100}, {
               "NSFont": font,
               "NSColor": UIColor.purpleColor()
            });
        }
    },
})

require('CouponEfficientTableVIewCell')

defineClass('DemoViewController: UITableViewController <UIAlertViewDelegate>', ['data'], {
    viewDidLoad: function() {
        self.super().viewDidLoad();

        console.log("DemoViewController viewDidLoad", self.class());

        self.setTitle("DemoViewController");
        self.view().setBackgroundColor(UIColor.whiteColor());

        require('UIBarButtonItem');
        var backBarButtonItem = UIBarButtonItem.alloc().initWithTitle_style_target_action("返回", 0, self, "doClickBackAction");
        backBarButtonItem.setTitle("返回");
        self.navigationItem().setLeftBarButtonItem(backBarButtonItem);

        self.tableView().setDataSource(self);
        self.tableView().setDelegate(self);
    },
    doClickBackAction: function() {
        self.navigationController().popViewControllerAnimated(YES);
    },
    dataSource: function() {
        var data = self.data();

        if (data) {
            return data;
        }

        var data = [];

        for (var i = 0; i < 20; i++) {
            data.push("cell from js " + i);
        }

        self.setData(data);
        return data;
    },
    numberOfSectionsInTableView: function(tableView) {
        return 1;
    },
    tableView_numberOfRowsInSection: function(tableView, section) {
        return self.dataSource().length;
    },
    tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
        var cell = tableView.dequeueReusableCellWithIdentifier("cell");

        if (!cell) {
            cell = CouponEfficientTableVIewCell.alloc().initWithStyle_reuseIdentifier(0, "cell");
        }

//        cell.textLabel().setText(self.dataSource()[indexPath.row()]);
        return cell;
    },
    tableView_heightForRowAtIndexPath: function(tableView, indexPath) {
        return 60;
    },
    tableView_didSelectRowAtIndexPath: function(tableView, indexPath) {
        
        var alertView = UIAlertView.alloc().initWithTitle_message_delegate_cancelButtonTitle_otherButtonTitles("Alert", self.dataSource()[indexPath.row()], self, "OK", null);
        alertView.show();
        
        //这样做不行！单纯把 block 传给 OC 调用或 OC 传给 JS 调用都是没问题的，
        //但目前不支持 JS 封装的 block 传到 OC 再传回 JS 去调用。
        //https://github.com/bang590/JSPatch/issues/155#issuecomment-160302018
//        require('UpdateAlertView');
//        var blk = function(){console.log("update")};
//        UpdateAlertView.showUpdateAlertViewWithMessage_updateAction("hello",block(blk));
    },
    alertView_willDismissWithButtonIndex: function(alertView, idx) {
        console.log('click btn ' + alertView.buttonTitleAtIndex(idx));
    }
})

defineClass('MainViewController: UIViewController',['isGoSuccessVC'], {
    viewDidLoad: function() {
            
        self.isGoSuccessVC = true;
        global.isGoSuccessVC = self.isGoSuccessVC;
            
        self.super().viewDidLoad();

        self.setTitle("MainViewController");

        console.log("MainViewController viewDidLoad");

        self.view().setBackgroundColor(UIColor.redColor());

        var btnGoToBugVC = UIButton.buttonWithType(UIButtonTypeRoundedRect);

        btnGoToBugVC.setBackgroundColor(UIColor.blueColor());
        btnGoToBugVC.setFrame({x: 0, y: 0, width: 200, height: 100});
        btnGoToBugVC.setTitle_forState("去成功或失败页面", UIControlStateNormal);
        self.view().addSubview(btnGoToBugVC);
        btnGoToBugVC.setCenter({x: self.view().center().x, y: self.view().center().y - 100});

        // 在JS使用字符串代表Selector，如@selector(goToSuccessVC) 在JS中使用"goToSuccessVC"
        btnGoToBugVC.addTarget_action_forControlEvents(self, "goToSuccessVC", UIControlEventTouchUpInside);

        var btnGoDemoVC = UIButton.buttonWithType(UIButtonTypeRoundedRect);

        btnGoDemoVC.setBackgroundColor(UIColor.blueColor());
        btnGoDemoVC.setFrame({x: 0, y: 0, width: 200, height: 100});
        btnGoDemoVC.setTitle_forState("去Demo页面", UIControlStateNormal);
        self.view().addSubview(btnGoDemoVC);
        btnGoDemoVC.setCenter({x: self.view().center().x, y: self.view().center().y + 100});

        btnGoDemoVC.addTarget_action_forControlEvents(self, "goToDemoVC", UIControlEventTouchUpInside);
    },
    goToSuccessVC: function() {
        
        self.isGoSuccessVC = global.isGoSuccessVC;
        if (self.isGoSuccessVC) {
            console.log('goToSuccessVC');
            var successVC = SuccessViewController.alloc().init();
            self.navigationController().pushViewController_animated(successVC, YES);
        }
        else {
            console.log('goToFailureVC');
            var failureVC = FailureViewController.alloc().init();
            self.navigationController().pushViewController_animated(failureVC, YES);
        }
        
        global.isGoSuccessVC = !global.isGoSuccessVC;
    },
    goToDemoVC: function() {
        console.log('goToDemoVC');
        var successVC = DemoViewController.alloc().init();
        self.navigationController().pushViewController_animated(successVC, YES);
    }
})

defineClass('UpdateAlertView: UIView', {
    initWithMessage_action: function(message, action) {
        self = self.super().init();

        if (self != false) {
            require('UIButton,UIColor');
            self.setBtn(UIButton.alloc().initWithFrame({x:0, y:0, width:200, height:100}));
            self.btn().setBackgroundColor(UIColor.brownColor());
            self.btn().setTitle_forState("Update", UIControlStateNormal);
            self.btn().addTarget_action_forControlEvents(self, "btnClick", UIControlEventTouchUpInside);
            
            self.addSubview(self.btn());
            
            //crash
//            self.setUpdateAction(action);
            
            self.setUpdateAction(block("void", action));
            console.log(action);
            console.log(block("void", action));
        }

        return self;
    }
})

// defineClass('AppDelegate', {

//     initRootViewController: function() {
//         var rootVC = MainViewController.alloc().init();
//         //直接在使用时调用require(className)
//         var navRootVC = require('UINavigationController').alloc().initWithRootViewController(rootVC);
//         self.window().setRootViewController(navRootVC);
//     }
// })
