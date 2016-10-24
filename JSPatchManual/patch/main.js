autoConvertOCType(1)
include('CommonDefine.js')
include('MainViewController.js')

defineClass('AppDelegate', {
    initRootViewController: function() {
        console.log("main");
        console.log("window", self.window());
        var rootVC = MainViewController.alloc().init();
        console.log("rootVC", rootVC);
        var navRootVC = require('UINavigationController').alloc().initWithRootViewController(rootVC);
        self.window().setRootViewController(navRootVC);
    }
})
