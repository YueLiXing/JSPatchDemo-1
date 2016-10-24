include('UIScrollViewHelper.js')
include('CommonDefine.js')

require('UIViewController,UIScrollView,NSMutableArray,UILabel,NSString,UIColor')

defineClass('MainViewController: UIViewController', {
    init: function() {
        self = self.super().init();
        console.log("MainViewController init ");
        return self;
    },
    viewDidLoad: function() {
        console.log("MainViewController viewDidLoad");
        
        self.super().viewDidLoad();
        self.view().setBackgroundColor(UIColor.whiteColor());

        var verticalScrollView = UIScrollView.alloc().initWithFrame(self.view().frame());
        self.view().addSubview(verticalScrollView);
            
        //这里的数组使用javascript的数组
        var vSubviewsArray = [];
            
        console.log("vSubviewsArray");
        for (var i = 0; i < 15; i++) {
            //JSPatch原生支持 CGRect / CGPoint / CGSize / NSRange 这四个 struct 类型，用 JS 对象表示:
            //CGRectMake(20, 20, 100, 100) 转换成JS语法为：{x:20, y:20, width:100, height:100}
            var lbl = UILabel.alloc().initWithFrame({x:0,
                                                     y:0,
                                                 width:global.SCREEN_WIDTH,
                                                height:100});
            lbl.setText("我是第"+(i+1)+"个");
            var NSTextAlignmentCenter = 1;
            lbl.setTextAlignment(NSTextAlignmentCenter);
            //多参数方法名使用 _ 分隔，如下面的 colorWithRed_green_blue_alpha
            lbl.setBackgroundColor(UIColor.colorWithRed_green_blue_alpha((10*i)/255.0, 100/255.0, (25*i)/255.0, 1.0));
            
            //这里的字典使用javascript的字典
            vSubviewsArray.push({"view" : lbl,
                              "padding" : (i==0?(0):(i*2+5))
                                });

        }

        var horizontalScrollView = UIScrollView.alloc().initWithFrame({x:0,
                                                                       y:0,
                                                                   width:global.SCREEN_WIDTH,
                                                                  height:100});
        vSubviewsArray.push({"view" : horizontalScrollView,
                          "padding" : 5
                            });

        var hSubviewsArray = [];
            
        console.log("hSubviewsArray");
        for (var i = 0; i < 20; i++) {
            var lbl = UILabel.alloc().initWithFrame({x:0, y:0, width:200, height:80});
            lbl.setText("我是第"+(i+1)+"个");
            lbl.setTextAlignment(global.NSTextAlignmentRight);
            lbl.setBackgroundColor(UIColor.colorWithRed_green_blue_alpha((10*i)/255.0, 100/255.0, (25*i)/ 255.0, 1.0));
            hSubviewsArray.push({"view" : lbl,
                              "padding" : (i==0?(0):(5))
                                });
        }
        
        console.log("layout horizontalScrollView");
        UIScrollViewHelper.layoutScrollView(horizontalScrollView, hSubviewsArray, NO);
            
        console.log("layout verticalScrollView");
        UIScrollViewHelper.layoutScrollView(verticalScrollView, vSubviewsArray, YES);
    }
})
