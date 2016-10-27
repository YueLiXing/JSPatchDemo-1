//
//  UpdateAlertView.m
//  JSPatchManual
//
//  Created by apple on 16/10/26.
//  Copyright © 2016年 Xcode. All rights reserved.
//

#import "UpdateAlertView.h"

@implementation UpdateAlertView

- (instancetype)initWithMessage:(NSString *)message action:(void (^)())action
{
    UIWindow *keyWindow = [UIApplication sharedApplication].keyWindow;
    self = [super initWithFrame:CGRectMake(0, 0, keyWindow.frame.size.width, keyWindow.frame.size.height)];

    if (self) {
        self.btn = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 200, 100)];
        [self.btn setTitle:@"Update Action" forState:UIControlStateNormal];
        self.btn.backgroundColor = [UIColor brownColor];
        [self.btn addTarget:self action:@selector(btnClick) forControlEvents:UIControlEventTouchUpInside];
        self.btn.center = self.center;
        
        [self addSubview:self.btn];
        
        self.updateAction = action;
    }

    return self;
}
    
- (void)btnClick {
    NSLog(@"btnClick");
    NSLog(@"%@", self);
    self.updateAction();
}

+ (void)showUpdateAlertViewWithMessage:(NSString *)message updateAction:(void (^)())action
{
    UIWindow *keyWindow = [UIApplication sharedApplication].keyWindow;
    UpdateAlertView *alertView = [[UpdateAlertView alloc] initWithMessage:message action:action];

    alertView.backgroundColor = [UIColor magentaColor];
    alertView.frame = CGRectMake(0, 0, 200, 100);
    alertView.center = keyWindow.center;
    [keyWindow addSubview:alertView];
}

@end
