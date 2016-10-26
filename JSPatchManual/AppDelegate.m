//
//  AppDelegate.m
//  JSPatchManual
//
//  Created by apple on 16/10/24.
//  Copyright © 2016年 Xcode. All rights reserved.
//

#import "AppDelegate.h"
#import <JSPatchPlatform/JSPatch.h>
#import "DynamicChangeCode.h"
#import "MainViewController.h"

//#define JSPatch_Test

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    MainViewController *rootVC = [[MainViewController alloc] init];
    UINavigationController *naviVC = [[UINavigationController alloc] initWithRootViewController:rootVC];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.rootViewController = naviVC;
    [self.window makeKeyAndVisible];
    
    //APP启动时下载热更新脚本
#ifdef JSPatch_Test
    [JPEngine startEngine];
    NSString *sourcePath = [[[NSBundle mainBundle] bundlePath] stringByAppendingPathComponent:@"patchfile/1.0.js"];
    [JPEngine evaluateScriptWithPath:sourcePath];
#else
    [DynamicChangeCode loadURLConnectionCompletion];
#endif
    
    [self initRootViewController];
    
    return YES;
}

- (void)initRootViewController {
    
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    
#ifdef JSPatch_Test
    [JPEngine startEngine];
    NSString *sourcePath = [[[NSBundle mainBundle] bundlePath] stringByAppendingPathComponent:@"patchfile/1.0.js"];
    [JPEngine evaluateScriptWithPath:sourcePath];
#else
    //app从后台返回前台时，重新下载热更新脚本
    [DynamicChangeCode loadURLConnectionCompletion];
#endif
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


@end
