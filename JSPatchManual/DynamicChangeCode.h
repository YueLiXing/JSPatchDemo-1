//
//  DynamicChangeCode.h
//  jht
//
//  Created by apple on 16/8/17.
//  Copyright © 2016年 Xcode. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DynamicChangeCode : NSObject

//从服务器下载热更新脚本
+ (void)loadURLConnectionCompletion;

//执行本地保存的js脚本
+ (void)invokeLocalScript;

@end
