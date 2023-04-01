/*
 Navicat Premium Data Transfer

 Source Server         : db
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : vue-ego

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 02/09/2022 21:06:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `id` int(1) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `price` int(10) NOT NULL COMMENT '商品价格',
  `num` int(10) NOT NULL COMMENT '商品数量',
  `category` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品类目',
  `sellPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品卖点',
  `paramsInfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品信息',
  `is_delete` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '0:表示存在 1：表示删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (1, '联想拯救者Y7000', 6499, 100, '电脑办公', '独显2k高刷', 'i7-12400h;3600ti显卡', 0);
INSERT INTO `project` VALUES (2, '联想小新Air15', 5019, 50, '电脑办公', '高色域办公设计师游戏本', 'R7-5700U IPS高清全面屏', 0);
INSERT INTO `project` VALUES (3, '华硕无双', 5499, 80, '电脑办公', 'OLED高刷', 'i5_12500H 高刷', 0);
INSERT INTO `project` VALUES (4, '华硕灵耀Pro16', 8499, 60, '电脑办公', '游戏轻薄设计', 'i7-12700H Rtx3050Ti 120H', 0);
INSERT INTO `project` VALUES (5, '华硕天选2', 5899, 99, '电脑办公', 'lPS电竞屏吃鸡手办', 'R7-4800H RTX3050 144HZ屏幕刷新', 0);
INSERT INTO `project` VALUES (6, '机械革命蛟龙5', 6588, 75, '电脑办公', '独显直连电竞游戏本', 'R5-5600H[满血RTX3060独显直连]', 0);
INSERT INTO `project` VALUES (7, 'APPLE iPhone 12', 4499, 1000, '手机', '超视网膜屏抗水防尘', '超视网膜屏抗水防尘 5G网络', 0);
INSERT INTO `project` VALUES (8, 'realme真我GT2大师探索版', 3999, 120, '手机', '晓龙8+旗舰芯片.100w秒充', '500MAh+100W光速秒充', 0);
INSERT INTO `project` VALUES (9, '惠普(HP)光影精灵8代', 6569, 99, '电脑办公', '高色域全面屏|发烧级电竞显卡', '12代酷睿，RTX30光追显卡', 0);
INSERT INTO `project` VALUES (10, '吃鸡神器', 123, 50, '游戏设备', NULL, NULL, 0);
INSERT INTO `project` VALUES (11, '吃鸡神器', 123, 50, '游戏设备', NULL, NULL, 0);
INSERT INTO `project` VALUES (12, '散热器', 123, 40, '游戏设备', NULL, NULL, 0);
INSERT INTO `project` VALUES (13, 'vivo', 2399, 123, '手机', '流畅吃鸡王者', '<p>流畅吃鸡王者</p>', 0);
INSERT INTO `project` VALUES (14, '席梦思沙发', 9999, 122, '家具', '面料柔软舒服', '<p>面料柔软舒服</p>', 0);
INSERT INTO `project` VALUES (15, '北极绒 水洗床罩', 4399, 12, '家具', '四季 简约 床笠式', '<p>四季 简约 床笠式</p>', 0);

SET FOREIGN_KEY_CHECKS = 1;
