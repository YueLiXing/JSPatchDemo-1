//
//  UpdateAlertView.h
//  JSPatchManual
//
//  Created by apple on 16/10/26.
//  Copyright © 2016年 Xcode. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void (^UpdateAction)();

@interface UpdateAlertView : UIView
    
@property (nonatomic, strong) UIButton *btn;

@property (nonatomic, copy) UpdateAction updateAction;

+ (void)showUpdateAlertViewWithMessage:(NSString *)message updateAction:(void (^)())action;

@end
