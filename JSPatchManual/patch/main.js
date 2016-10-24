autoConvertOCType(1)
include('CommonDefine.js')
include('MainViewController.js')

defineClass('AppDelegate', {
    initRootViewController: function() {
        var rootVC = MainViewController.alloc().init();
        var navRootVC = require('UINavigationController').alloc().initWithRootViewController(rootVC);
        self.window().setRootViewController(navRootVC);
    }
})
