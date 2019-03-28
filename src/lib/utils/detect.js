/**********************************************************
 * Copyright (c) SESHENGHUO.COM All rights reserved       *
 **********************************************************/

/**
 * 环境检测
 * @charset utf-8
 * @author lijun
 * @git: https://github.com/zwlijun/se.vuessr
 * @date 2019.3
 */
'use strict';

const UAParser = (function(){
    // os
    // os -> windows
    // os -> osx
    // os -> android
    // os -> ios
    // os -> ipad
    // os -> iphone
    // os -> ipod
    // os -> windowsphone
    // os -> blackberry
    // os -> symbian
    // browser
    // browser -> ie
    // browser -> edge
    // browser -> iemobile
    // browser -> chrome
    // browser -> safari
    // browser -> firefox
    // browser -> opera
    // browser -> operamini
    // browser -> operamobile
    // browser -> ucbrowser
    // browser -> qqbrowser
    // browser -> mqqbrowser
    // browser -> blackberry
    // browser -> mqq
    // browser -> qq
    // browser -> wechat
    // browser -> tbs
    // browser -> aliapp
    // browser -> thisshop
    // browser -> konqueror
    // browser -> maxthon
    // browser -> chromeplus
    // browser -> safarimobile
    // browser -> ioswebview
    // browser -> androidwebview
    // engine
    // engine -> trident
    // engine -> webkit
    // engine -> gecko
    // engine -> presto
    

    const CheckMap = {
        "os": {
            "windows": [
                {
                    "pattern": "Windows NT (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Windows NT"
                },
                {
                    "pattern": "Windows (\\d+)",
                    "alias": "Windows"
                }
            ],
            "osx": [
                {
                    "pattern": "Mac OS X (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "OSX"
                },
                {
                    "pattern": "Mac OS X (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "OSX"
                },
                {
                    "pattern": "Mac OS X (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "OSX"
                },
                {
                    "pattern": "Mac OS X (\\d+)",
                    "alias": "OSX"
                }
            ],
            "android": [
                {
                    "pattern": "Android (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Android"
                },
                {
                    "pattern": "Android (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Android"
                },
                {
                    "pattern": "Android (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Android"
                },
                {
                    "pattern": "Android (\\d+)",
                    "alias": "Android"
                }
            ],
            "ios": [
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iOS"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)",
                    "alias": "iOS"
                }
            ],
            "iphone": [
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iPhone"
                },
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iPhone"
                },
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iPhone"
                },
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)",
                    "alias": "iPhone"
                }
            ],
            "ipad": [
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iPad"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iPad"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iPad"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)",
                    "alias": "iPad"
                }
            ],
            "ipod": [
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iPod"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iPod"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "iPod"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)",
                    "alias": "iPod"
                }
            ],
            "windowsphone": [
                {
                    "pattern": "Windows Phone OS (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Windows Phone"
                },
                {
                    "pattern": "Windows Phone (\\d+)",
                    "alias": "Windows Phone"
                }
            ],
            "blackberry": [
                {
                    "pattern": "BlackBerry (\\d+)",
                    "alias": "BlackBerry"
                }
            ],
            "symbian": [
                {
                    "pattern": "SymbianOS/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "SymbianOS"
                }
            ]
        },
        "browser": {
            "ie": [
                {
                    "pattern": "MSIE (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MSIE"
                },
                {
                    "pattern": "MSIE (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MSIE"
                },
                {
                    "pattern": "MSIE (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MSIE"
                },
                {
                    "pattern": "MSIE (\\d+)",
                    "alias": "MSIE"
                },
                {
                    "pattern": "Trident/[^\\s ]+; [^\\)]*rv\\:(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MSIE"
                },
                {
                    "pattern": "Trident/[^\\s ]+; [^\\)]*rv\\:(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MSIE"
                },
                {
                    "pattern": "Trident/[^\\s ]+; [^\\)]*rv\\:(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MSIE"
                },
                {
                    "pattern": "Trident/[^\\s ]+; [^\\)]*rv\\:(\\d+)",
                    "alias": "MSIE"
                }
            ],
            "edge": [
                {
                    "pattern": "Edge/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Edge"
                },
                {
                    "pattern": "Edge/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Edge"
                },
                {
                    "pattern": "Edge/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Edge"
                },
                {
                    "pattern": "Edge/(\\d+)",
                    "alias": "Edge"
                }
            ],
            "iemobile": [
                {
                    "pattern": "IEMobile[/ ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "IEMobile"
                },
                {
                    "pattern": "IEMobile[/ ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "IEMobile"
                },
                {
                    "pattern": "IEMobile[/ ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "IEMobile"
                },
                {
                    "pattern": "IEMobile[/ ](\\d+)",
                    "alias": "IEMobile"
                }
            ],
            "chrome": [
                {
                    "pattern": "Chrome/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Chrome"
                },
                {
                    "pattern": "Chrome/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Chrome"
                },
                {
                    "pattern": "Chrome/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Chrome"
                },
                {
                    "pattern": "Chrome/(\\d+)",
                    "alias": "Chrome"
                }
            ],
            "chromeplus": [
                {
                    "pattern": "ChromePlus/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "ChromePlus"
                },
                {
                    "pattern": "ChromePlus/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "ChromePlus"
                },
                {
                    "pattern": "ChromePlus/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "ChromePlus"
                },
                {
                    "pattern": "ChromePlus/(\\d+)",
                    "alias": "ChromePlus"
                }
            ],
            "safari": [
                {
                    "pattern": "Version/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[\s ]Safari/",
                    "alias": "Safari"
                },
                {
                    "pattern": "Version/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[\s ]Safari/",
                    "alias": "Safari"
                },
                {
                    "pattern": "Version/(\\d+)[^0-9\\s ](\\d+)[\s ]Safari/",
                    "alias": "Safari"
                },
                {
                    "pattern": "Version/(\\d+)[\s ]Safari/",
                    "alias": "Safari"
                }
            ],
            "safarimobile": [
                {
                    "pattern": "Version/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[\s ](Mobile/[0-9a-zA-Z]+[\s ])Safari/",
                    "alias": "Safari Mobile"
                },
                {
                    "pattern": "Version/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[\s ](Mobile/[0-9a-zA-Z]+[\s ])Safari/",
                    "alias": "Safari Mobile"
                },
                {
                    "pattern": "Version/(\\d+)[^0-9\\s ](\\d+)[\s ](Mobile/[0-9a-zA-Z]+[\s ])Safari/",
                    "alias": "Safari Mobile"
                },
                {
                    "pattern": "Version/(\\d+)[\s ](Mobile/[0-9a-zA-Z]+[\s ])Safari/",
                    "alias": "Safari Mobile"
                }
            ],
            "androidwebview": [
                {
                    "pattern": "Android.+Version/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+) Mobile Safari/",
                    "alias": "Android Webview"
                },
                {
                    "pattern": "Android.+Version/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+) Mobile Safari/",
                    "alias": "Android Webview"
                },
                {
                    "pattern": "Android.+Version/(\\d+)[^0-9\\s ](\\d+) Mobile Safari/",
                    "alias": "Android Webview"
                },
                {
                    "pattern": "Android.+Version/(\\d+) Mobile Safari/",
                    "alias": "Android Webview"
                }
            ],
            "ioswebview": [
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPhone[^;]*;.+OS (\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPad[^;]*;.+OS (\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+)[^0-9\\s ](\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                },
                {
                    "pattern": "iPod[^;]*;.+OS (\\d+).+AppleWebKit/[^/]+Mobile/",
                    "alias": "iOS Webview"
                }
            ],
            "firefox": [
                {
                    "pattern": "Firefox/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Firefox"
                },
                {
                    "pattern": "Firefox/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Firefox"
                },
                {
                    "pattern": "Firefox/(\\d+)",
                    "alias": "Firefox"
                }
            ],
            "opera": [
                {
                    "pattern": "Opera (\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Opera"
                },
                {
                    "pattern": "Opera/.+ Version/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Opera"
                }
            ],
            "operamini": [
                {
                    "pattern": "Opera Mini/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "OperaMini"
                }
            ],
            "operamobile": [
                {
                    "pattern": "Opera Mobi/.+ Version/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "OperaMobile"
                }
            ],
            "ucbrowser": [
                {
                    "pattern": "UC Browser[ /]?(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "UCBrowser"
                },
                {
                    "pattern": "UCBrowser/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "UCBrowser"
                }
            ],
            "qqbrowser": [
                {
                    "pattern": " QQBrowser/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "QQBrowser"
                },
                {
                    "pattern": " QQBrowser/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "QQBrowser"
                },
                {
                    "pattern": " QQBrowser/(\\d+)",
                    "alias": "QQBrowser"
                }
            ],
            "mqqbrowser": [
                {
                    "pattern": " MQQBrowser/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MQQBrowser"
                },
                {
                    "pattern": " MQQBrowser/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MQQBrowser"
                },
                {
                    "pattern": " MQQBrowser/(\\d+)",
                    "alias": "MQQBrowser"
                }
            ],
            "blackberry": [
                {
                    "pattern": "BlackBerry.+ Version/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "BlackBerry"
                }
            ],
            "mqq": [
                {
                    "pattern": "SQ_[^/]+ QQ/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MQQ"
                },
                {
                    "pattern": "SQ_[^/]+ QQ/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MQQ"
                },
                {
                    "pattern": "SQ_[^/]+ QQ/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "MQQ"
                },
                {
                    "pattern": "SQ_[^/]+ QQ/(\\d+)",
                    "alias": "MQQ"
                }
            ],
            "qq": [
                {
                    "pattern": "QQ/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "QQ"
                },
                {
                    "pattern": "QQ/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "QQ"
                },
                {
                    "pattern": "QQ/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "QQ"
                },
                {
                    "pattern": "QQ/(\\d+)",
                    "alias": "QQ"
                }
            ],
            "wechat": [
                {
                    "pattern": "MicroMessenger/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "WeChat"
                },
                {
                    "pattern": "MicroMessenger/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "WeChat"
                },
                {
                    "pattern": "MicroMessenger/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "WeChat"
                },
                {
                    "pattern": "MicroMessenger/(\\d+)",
                    "alias": "WeChat"
                }
            ],
            "tbs": [
                {
                    "pattern": "TBS/(\\d+)",
                    "alias": "TBS"
                }
            ],
            "aliapp": [
                {
                    "pattern": "AliApp\\(AP/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "AliApp"
                },
                {
                    "pattern": "AliApp\\(AP/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "AliApp"
                },
                {
                    "pattern": "AliApp\\(AP/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "AliApp"
                },
                {
                    "pattern": "AliApp\\(AP/(\\d+)",
                    "alias": "AliApp"
                }
            ],
            "thisshop": [
                {
                    "pattern": "Thisshop/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Thisshop"
                },
                {
                    "pattern": "Thisshop/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Thisshop"
                },
                {
                    "pattern": "Thisshop/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Thisshop"
                },
                {
                    "pattern": "Thisshop/(\\d+)",
                    "alias": "Thisshop"
                }
            ],
            "konqueror": [
                {
                    "pattern": "Konqueror/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Konqueror"
                },
                {
                    "pattern": "Konqueror/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Konqueror"
                },
                {
                    "pattern": "Konqueror/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Konqueror"
                },
                {
                    "pattern": "Konqueror/(\\d+)",
                    "alias": "Konqueror"
                }
            ],
            "maxthon": [
                {
                    "pattern": "Maxthon[/ ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Maxthon"
                },
                {
                    "pattern": "Maxthon[/ ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Maxthon"
                },
                {
                    "pattern": "Maxthon[/ ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Maxthon"
                },
                {
                    "pattern": "Maxthon[/ ](\\d+)",
                    "alias": "Maxthon"
                },
                {
                    "pattern": "Maxthon",
                    "alias": "Maxthon"
                }
            ]
        },
        "engine": {
            "trident": [
                {
                    "pattern": "Trident/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Trident"
                },
                {
                    "pattern": "Trident/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Trident"
                },
                {
                    "pattern": "Trident/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Trident"
                },
                {
                    "pattern": "Trident/(\\d+)",
                    "alias": "Trident"
                }
            ],
            "webkit": [
                {
                    "pattern": "WebKit/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "WebKit"
                },
                {
                    "pattern": "WebKit/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "WebKit"
                },
                {
                    "pattern": "WebKit/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "WebKit"
                },
                {
                    "pattern": "WebKit/(\\d+)",
                    "alias": "WebKit"
                }
            ],
            "gecko": [
                {
                    "pattern": "Gecko/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Gecko"
                },
                {
                    "pattern": "Gecko/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Gecko"
                },
                {
                    "pattern": "Gecko/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Gecko"
                },
                {
                    "pattern": "Gecko/(\\d+)",
                    "alias": "Gecko"
                }
            ],
            "presto": [
                {
                    "pattern": "Presto/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Presto"
                },
                {
                    "pattern": "Presto/(\\d+)[^0-9\\s ](\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Presto"
                },
                {
                    "pattern": "Presto/(\\d+)[^0-9\\s ](\\d+)",
                    "alias": "Presto"
                },
                {
                    "pattern": "Presto/(\\d+)",
                    "alias": "Presto"
                }
            ]
        }
    };

    let __check = function(ua, reg){
        let result = {
            "major": -1,
            "minor": -1,
            "patch": -1,
            "build": -1,
            "short": -1,
            "version": "",
            "name": ""
        };

        let pattern = new RegExp(reg.pattern, "i");
        let matcher = null;

        pattern.lastIndex = 0;

        if(null != (matcher = pattern.exec(ua))){
            let tmp = [];
            let r = 0;
            let l = 0;

            for(let i = 1; i < matcher.length; i++){
                r = matcher[i];

                if(/^[\d]+$/.test(r)){
                    tmp.push(Number(r));
                }
            }

            l = tmp.length;

            if(0 === l && null != matcher){
                tmp.push(1);

                l = tmp.length;
            }

            result.major = l > 0 ? tmp[0] || 1 : -1;
            result.minor = l > 1 ? tmp[1] : -1;
            result.patch = l > 2 ? tmp[2] : -1;
            result.build = l > 3 ? tmp[3] : -1;
            result.short = Number(result.major > -1 ? result.major + (result.minor > -1 ? "." + result.minor : ".0") : -1);
            result.version = tmp.join(".");
            result.name = reg.alias;
        }

        return result;
    };

    let __exec = function(ua, conf){
        let item = null;
        let result = {};

        for(let key in conf){
            if(conf.hasOwnProperty(key)){
                item = conf[key];

                if(Object.prototype.toString.call(item) == "[object Array]"){
                    for(let i = 0; i < item.length; i++){
                        result[key] = __check(ua, item[i]);

                        if(result[key].version && result[key].major > -1){
                            break;
                        }
                    }
                }else{
                    result[key] = __check(ua, item);
                }
            }
        }

        return result;
    };

    let __parse = function(ua){
        let regexps = CheckMap;
        let result = {
            "os": __exec(ua, regexps["os"]),
            "browser": __exec(ua, regexps["browser"]),
            "engine": __exec(ua, regexps["engine"])
        };

        return result;
    };

    return {
        "parse": __parse
    };
})();

export default UAParser;

