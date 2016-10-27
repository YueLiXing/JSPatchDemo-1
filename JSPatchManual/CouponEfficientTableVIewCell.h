//
//  CouponEfficientTableVIewCell.h
//  JSPatchManual
//
//  Created by apple on 16/10/27.
//  Copyright © 2016年 Xcode. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface JPTestObject : NSObject

+ (NSUInteger)rangeOfString:(NSString * _Nonnull)srcString str:(NSString * _Nonnull)str;

+ (void)drawString:(NSString * _Nonnull)str inRect:(CGRect)rect withAttributes:(nullable NSDictionary<NSString *, id> *)attrs;
@end

@interface CouponEfficientTableVIewCell : UITableViewCell

@property (nonatomic, strong) NSString * __nullable temp;

- (instancetype _Nonnull)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(nullable NSString *)reuseIdentifier;

@end
