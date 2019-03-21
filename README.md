基于Node + Express的VUE SSR基础服务框架
--

下载 & 安装
--
```
1. npm pack se.vuessr
2.1 Linux/Mac OS: tar -zvxf se.vuessr-<VERSION>.tgz && mv package <se.vuessr>
2.2 Windows: https://www.7-zip.org/
===OR===
1. <npm repo se.vuessr> OR <https://github.com/zwlijun/se.vuessr>
2. <github> [Clone or download]
3. cd <se.vuessr dir>
4. npm install
```

相关命令
--
```
编绎: npm run ssr:build
开发: npm run ssr:dev
生产: npm run ssr:start
```

Windows启动命令(依赖pm2服务)
--
```
开发模式：AppServer.bat
生产模式：AppServer.bat prod
```

Linux/Mac OS启动命令(依赖pm2服务)
--
```
开发模式：./AppServer.sh
生产模式：./AppServer.sh prod
```

本地测试地址
--
```
URL: http://localhost:9000
     https://localhost:9443
```

如何创建本地SSL证书
--
```
#创建服务器端KEY
openssl genrsa -des3 -out server.key 1024
123456
#移除服务器端KEY验证
openssl rsa -in server.key -out server.key
#创建服务器端证书
openssl req -new -key server.key -out server.csr -config D:/app/openssl-0.9.8h-1-bin/share/openssl.cnf

#创建客户端KEY
openssl genrsa -des3 -out client.key 1024
#移除客户端KEY验证
openssl rsa -in client.key -out client.key
#创建客户端证书
openssl req -new -key client.key -out client.csr -config D:/app/openssl-0.9.8h-1-bin/share/openssl.cnf

#创建CA
openssl req -new -x509 -keyout ca.key -out ca.crt -config D:/app/openssl-0.9.8h-1-bin/share/openssl.cnf

#签名
openssl ca -in server.csr -out server.crt -cert ca.crt -keyfile ca.key -config D:/app/openssl-0.9.8h-1-bin/share/openssl.cnf 
openssl ca -in client.csr -out client.crt -cert ca.crt -keyfile ca.key -config D:/app/openssl-0.9.8h-1-bin/share/openssl.cnf
```

easy-monitor 在Windows无法安装解决方法
--
前提安装好  node-gyp 和 node-pre-gyp
```
npm install node-gyp -g
npm install node-pre-gyp -g
```
1. 通过npm 安装windows的build工具 
   ```
   npm install --global windows-build-tools
   ```
2. 如果还是不行，检查Python的版本号，Python用windows-build-tools中的Python(2.7)就可以了。如果之前有安装过其他的版本，把系统环境变量path中的Python配置改成window-build-tools中Python中执行路径就可以了。


Nginx配置示例参考(SSR服务超时降级SPA模式)
--
```
    upstream node_appserver {
        server 127.0.0.1:9000  weight=5 max_fails=2 fail_timeout=900s;  #SSR
        server 127.0.0.1:10080 weight=1 max_fails=2 fail_timeout=900s;  #SPA
    }

    upstream node_appserver_ssl {
        server 127.0.0.1:9443  weight=5 max_fails=2 fail_timeout=900s;  #SSR
        server 127.0.0.1:10443 weight=1 max_fails=2 fail_timeout=900s;  #SPA
    }

    server {
        listen       9080;
        server_name  localhost;

        #强制到HTTPS
        return 301 https://$host:9083$request_uri;

        root D:/projects/se.vuessr/dist;

        location ~* \.(gif|jpg|jpeg|png|bmp|swf|svg|eot|ttf|woff)$ {
            expires 7d;
            break;
        }
        location ~* \.(css)$ {
            expires 3d;
            break;
        }
        location ~* \.(js)$ {
            expires 3d;
            break;
        }
        location = /manifest.json {
            try_files $uri $uri /vue-ssr-client-manifest.json = 200;
            break;
        }
        location ~* \.(json)$ {
            expires 15m;
            break;
        }

        location / {
            proxy_ignore_client_abort   on; 
            proxy_send_timeout          15;
            proxy_connect_timeout       15;
            proxy_read_timeout          15;
            proxy_buffering             on;
            proxy_buffer_size           32k;
            proxy_buffers               8 32k;
            proxy_busy_buffers_size     64k;
            proxy_next_upstream         http_500 http_502 http_503 http_504 http_404 error timeout invalid_header;
            proxy_pass                  http://node_appserver;
            proxy_set_header            Host            $http_host;  
            proxy_set_header            X-Real-IP       $remote_addr; 
            proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for; 
            break;
        }
    }

    server {
        listen       9083 ssl http2; # 开启http2
        server_name  localhost;

        ssl on;

        ssl_certificate      D:/projects/se.vuessr/conf/server/ssl/server.crt;
        ssl_certificate_key  D:/projects/se.vuessr/conf/server/ssl/server.key;

        #ssl_session_cache    shared:SSL:1m;
        #ssl_session_timeout  5m;

        #ssl_ciphers  HIGH:!aNULL:!MD5;
        #ssl_prefer_server_ciphers  on;

        root D:/projects/se.vuessr/dist;

        location ~* \.(gif|jpg|jpeg|png|bmp|swf|svg|eot|ttf|woff)$ {
            expires 7d;
            break;
        }
        location ~* \.(css)$ {
            expires 3d;
            break;
        }
        location ~* \.(js)$ {
            expires 3d;
            break;
        }
        location = /manifest.json {
            try_files $uri $uri /vue-ssr-client-manifest.json = 200;
            break;
        }
        location ~* \.(json)$ {
            expires 15m;
            break;
        }

        location / {
            proxy_ignore_client_abort   on; 
            proxy_send_timeout          15;
            proxy_connect_timeout       15;
            proxy_read_timeout          15;
            proxy_buffering             on;
            proxy_buffer_size           32k;
            proxy_buffers               8 32k;
            proxy_busy_buffers_size     64k;
            proxy_next_upstream         http_502 http_504 error timeout invalid_header;
            proxy_pass                  https://node_appserver_ssl;
            proxy_set_header            Host            $http_host;  
            proxy_set_header            X-Real-IP       $remote_addr; 
            proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for; 
            break;
        }
    }

    server {
        listen       10080;
        server_name  localhost;

        #强制到HTTPS
        return 301 https://$host:10443$request_uri;

        root D:/projects/se.vuessr/dist;

        location ~* \.(gif|jpg|jpeg|png|bmp|swf|svg|eot|ttf|woff)$ {
            expires 7d;
            break;
        }
        location ~* \.(css)$ {
            expires 3d;
            break;
        }
        location ~* \.(js)$ {
            expires 3d;
            break;
        }
        location = /manifest.json {
            try_files $uri $uri /vue-ssr-client-manifest.json = 200;
            break;
        }
        location ~* \.(json)$ {
            expires 15m;
            break;
        }

        location / {
            try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
    }

    server {
        listen       10443 ssl http2; # 开启http2
        server_name  localhost;

        ssl on;

        ssl_certificate      D:/projects/se.vuessr/conf/server/ssl/server.crt;
        ssl_certificate_key  D:/projects/se.vuessr/conf/server/ssl/server.key;

        #ssl_session_cache    shared:SSL:1m;
        #ssl_session_timeout  5m;

        #ssl_ciphers  HIGH:!aNULL:!MD5;
        #ssl_prefer_server_ciphers  on;

        root D:/projects/se.vuessr/dist;

        location ~* \.(gif|jpg|jpeg|png|bmp|swf|svg|eot|ttf|woff)$ {
            expires 7d;
            break;
        }
        location ~* \.(css)$ {
            expires 3d;
            break;
        }
        location ~* \.(js)$ {
            expires 3d;
            break;
        }
        location = /manifest.json {
            try_files $uri $uri /vue-ssr-client-manifest.json = 200;
            break;
        }
        location ~* \.(json)$ {
            expires 15m;
            break;
        }

        location / {
            try_files $uri $uri/ /index.html;
            index  index.html index.htm;
        }
    }
```
