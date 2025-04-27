#!/bin/bash

# 杀死可能存在的旧进程
pkill -f "node server.js" || true

# 使用nohup启动服务器
nohup node server.js > server.log 2>&1 &

echo "服务器已在50001端口启动"
echo "可以通过以下地址访问："
echo "本地: http://localhost:50001"
echo "服务器IP: http://$(hostname -I | awk '{print $1}'):50001" 