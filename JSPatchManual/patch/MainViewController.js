include('UIScrollViewHelper.js')

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
        self.view().setBackgroundColor(UIColor.purpleColor());

        var verticalScrollView = UIScrollView.alloc().initWithFrame(self.view().frame());
        self.view().addSubview(verticalScrollView);

        var vSubviewsArray = [];
            
        console.log("vSubviewsArray");
        for (var i = 0; i < 15; i++) {
            var lbl = UILabel.alloc().initWithFrame({x:0,
                                                     y:0,
                                                 width:self.view().frame().width,
                                                height:100});
            lbl.setText("我是第"+(i+1)+"个");
            
            lbl.setBackgroundColor(UIColor.colorWithRed_green_blue_alpha(10 * i / 255.0, 100 / 255.0, 25 * i / 255.0, 1.0));
            
            vSubviewsArray.push({"view": lbl,
                             "padding" : ""+(i==0?(0):(i*2+5))
                                });

        }
            
        var horizontalScrollView = UIScrollView.alloc().initWithFrame({x:0,
                                                                       y:0,
                                                                   width:self.view().frame().width,
                                                                  height:100});
        vSubviewsArray.push({"view": horizontalScrollView,
                         "padding" : "5"
                            });

        var hSubviewsArray = [];
            
        console.log("hSubviewsArray");
        for (var i = 0; i < 20; i++) {
            var lbl = UILabel.alloc().initWithFrame({x:0, y:0, width:200, height:80});
            lbl.setText("我是第"+(i+1)+"个");
            lbl.setBackgroundColor(UIColor.colorWithRed_green_blue_alpha(10 * i / 255.0, 100 / 255.0, 25 * i / 255.0, 1.0));
            hSubviewsArray.push({"view": lbl,
                             "padding" : ""+(i==0?(0):(5))
                                });
        }
            
        var obj = UIScrollViewHelper.alloc().init();
        console.log("layout horizontalScrollView");
        UIScrollViewHelper.layoutScrollView(horizontalScrollView, hSubviewsArray, NO);
            
        console.log("layout verticalScrollView");
        UIScrollViewHelper.layoutScrollView(verticalScrollView, vSubviewsArray, YES);
    }
})
