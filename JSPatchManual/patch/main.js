autoConvertOCType(1)
include('MainViewController.js')

defineClass('AppDelegate', {
    
    initRootViewController: function() {
        var rootVC = MainViewController.alloc().init();
        //直接在使用时调用require(className)
        var navRootVC = require('UINavigationController').alloc().initWithRootViewController(rootVC);
        self.window().setRootViewController(navRootVC);
    }
})
