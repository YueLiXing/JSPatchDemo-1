//
//  CouponEfficientTableVIewCell.m
//  JSPatchManual
//
//  Created by apple on 16/10/27.
//  Copyright © 2016年 Xcode. All rights reserved.
//

#import "CouponEfficientTableVIewCell.h"

@implementation JPTestObject

+ (NSString *)name
{
    return @"I'm NSString";
}

+ (NSDictionary *)info
{
    return @{@"k": @"v"};
}

+ (NSArray *)users
{
    return @[@"alex", @"bang", @"cat"];
}

+ (NSUInteger)rangeOfString:(NSString *)srcString str:(NSString *)str
{
    return [srcString rangeOfString:str].location;
}

+ (void)drawString:(NSString *)str inRect:(CGRect)rect withAttributes:(nullable NSDictionary <NSString *, id> *)attrs
{
    NSLog(@"drawString %@", str);
    NSLog(@"inRect %@", [NSValue valueWithCGRect:rect]);
    NSLog(@"withAttributes %@", attrs);
    return [str drawInRect:rect withAttributes:attrs];
}

@end

@implementation CouponEfficientTableVIewCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];

    if (self) {
        
    }

    return self;
}

- (void)drawRect:(CGRect)rect {
    
    CGContextRef context = UIGraphicsGetCurrentContext();
    [self drawTitle:context];
}

- (void)drawTitle:(CGContextRef)context
{
    UIFont                      *font = nil;
    NSString                    *temp = nil;

    font = [UIFont systemFontOfSize:0.5 * 30];
    temp = [NSString stringWithFormat:@"20元免息券"];
    self.temp = temp;

    float titleX = 0.5 * 69;

    float titleY = 0.5 * (21 + 4);

    float   titleHeight = 0;
    float   titleWidth = 0;

    titleHeight = 0.5 * 15;
    titleWidth = 200;
    CGRect rect = CGRectMake(titleX, titleY, titleWidth, titleHeight + 0.5 * 2 + 10);

    if (font) {
        [temp drawInRect:rect withAttributes:@{NSFontAttributeName:font, NSForegroundColorAttributeName:[UIColor greenColor]}];
    }
}

@end
