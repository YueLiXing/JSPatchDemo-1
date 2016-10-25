//
//  DynamicChangeCode.m
//  jht
//
//  Created by apple on 16/8/17.
//  Copyright © 2016年 Xcode. All rights reserved.
//

#import "DynamicChangeCode.h"
#import "DES3EncryptUtil.h"
#import "CommonParameters.h"
#import <JSPatchPlatform/JSPatch.h>

@implementation DynamicChangeCode

//从服务器下载热更新脚本
+ (void)loadURLConnectionCompletion {
    
    [JPEngine startEngine];
    
    NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
    
    //获取上次储存的version(请求头中获取)和js内容
    NSString *version = [user objectForKey:APPREQUESTVERSION];
    NSString *oldScript = [user objectForKey:LOADCONTENT];
    
    //上次储存的js内容不为空，直接加载
    if (oldScript && ![oldScript isEqualToString:@""]) {
        [JPEngine evaluateScript:oldScript];
    }
    
    //version为空设为0
    if (!version || [version isEqualToString:@""]) {
        version = @"0";
    }
    
    //构造请求地址，并传参数version
    NSString *patchURLString = [NSString stringWithFormat:@"%@/%@.js?v=%@",LOADURLS,AppVersion,version];

    NSMutableURLRequest *urlRequest = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:patchURLString]];
    [urlRequest setHTTPMethod:@"GET"];
    [urlRequest setTimeoutInterval:20];
    [urlRequest setCachePolicy:NSURLRequestReturnCacheDataElseLoad];
    
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *task = [session dataTaskWithRequest:urlRequest completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        
        NSLog(@"%@", response);
        
        //获取请求头中的version并储存
        NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse*)response;
        NSDictionary *allHeaderFields = httpResponse.allHeaderFields;
        NSString *newversion = [allHeaderFields objectForKey:@"version"];
        [user setObject:newversion forKey:APPREQUESTVERSION];
        
        //加密的js脚本
        NSString *script = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        
        //获取请求到的内容并解密，然后储存
        NSString *newscript = [DES3EncryptUtil decrypt:script key:LOADKEYS];
        
        if(newscript && ![newscript isEqualToString:@""]) {
            [user setObject:newscript forKey:LOADCONTENT];
            //加载js内容
            NSLog(@"执行热更新脚本");
            [JPEngine evaluateScript:newscript];
        }
    }];
    
    [task resume];
}

@end
