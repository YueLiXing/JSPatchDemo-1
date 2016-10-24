require('NSObject')

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
        console.log("layoutScrollView function");
        
        var firstViewInfoDict = subviewsArray[0];
        var firstView = firstViewInfoDict["view"];
        var firstTopLeft = {
                            x:firstView.frame().x,
                            y:firstView.frame().y
                           };
            
        var currentLeft = firstTopLeft.x;
        var currentTop = firstTopLeft.y;

        for (var i=0; i<subviewsArray.length; i++) {
            
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
            }
            else {
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
        }
        else {
            scrollView.setContentSize({width: currentLeft, height: scrollView.frame().height});
        }

        subviewsArray = null;
    }
})
