//
//  DES3EncryptUtil.h
//  AA3DESDemo
//
//  Created by 孙泽山 on 16/8/16.
//  Copyright © 2016年 Arlexovincy. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

@interface DES3EncryptUtil : NSObject
// 加密方法
+ (NSString*)encrypt:(NSString*)plainText key:(NSString*) gkey;

// 解密方法
+ (NSString*)decrypt:(NSString*)encryptText key:(NSString*) gkey;
@end
