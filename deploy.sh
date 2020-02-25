#!/bin/bash
BLOG_PATH="/data/hexoblog"
STATIC_SITE="/www/wwwroot/hexoblog"

#使用说明，用来提示输入参数
usage() {
    echo "Usage: sh 执行脚本.sh [init|pull|g|i|run]"
    exit 1
}

init(){
	echo "======================================"
	echo "script: cd $BLOG_PATH"
	cd $BLOG_PATH
}

pull(){
	echo "script: git pull gitee master..."
	if git pull gitee master ;then
		echo ""
	else
		echo "script: git checkout ."
		git checkout .
		pull
	fi
}

generate(){
	echo "script: hexo clean..."
	hexo clean
	echo "script: hexo g..."
	hexo g
	echo "script: cp -r $BLOG_PATH/public/* $STATIC_SITE..."
	cp -r $BLOG_PATH/public/* $STATIC_SITE
}

install(){
	echo "script: npm install..."
	npm install
}

# 生成搜索索引
algolia(){
	echo "script: hexo algolia..."
	hexo algolia
}

run(){
	init
	pull
	generate
}

#根据输入参数，选择执行对应方法，不输入则执行使用说明
case "$1" in
  "init")
    init
    ;;
  "pull")
	init
    pull
    ;;
  "g")
	init
    generate
    ;;
  "i")
	init
	install
	;;
  "a")
	init
	algolia
	;;
  "run")
    run
    ;;
  *)
    usage
    ;;
esac