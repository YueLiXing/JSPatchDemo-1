//
//  MainViewController.m
//  JSPatchManual
//
//  Created by apple on 16/10/25.
//  Copyright © 2016年 Xcode. All rights reserved.
//

#import "MainViewController.h"
#import "FailureViewController.h"
#import "UpdateAlertView.h"

@interface MainViewController ()

@end

@implementation MainViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.title = @"MainViewController";
    
    self.view.backgroundColor = [UIColor blueColor];
    
    UIButton *btnGoToVC = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    btnGoToVC.frame = CGRectMake(0, 0, 200, 100);
    btnGoToVC.backgroundColor = [UIColor redColor];
    [btnGoToVC setTitle:@"去下个页面" forState:UIControlStateNormal];
    [self.view addSubview:btnGoToVC];
    btnGoToVC.center = self.view.center;
    
    [btnGoToVC addTarget:self action:@selector(goToVC) forControlEvents:UIControlEventTouchUpInside];
}

// 测试block使用

//- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
//    
//    [UpdateAlertView showUpdateAlertViewWithMessage:@"abc" updateAction:^{
//        NSLog(@"update action");
//    }];
//}

- (void)goToVC {
    FailureViewController *bugVC = [[FailureViewController alloc] init];
    [self.navigationController pushViewController:bugVC animated:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

@end
