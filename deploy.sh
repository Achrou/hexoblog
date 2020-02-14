BLOG_PATH="/data/hexoblog"
STATIC_SITE="/www/wwwroot/hexoblog"
echo "======================================"
echo "script: cd $BLOG_PATH"
cd $BLOG_PATH
echo "script: git pull..."
git pull
echo "script: hexo clean..."
hexo clean
echo "script: hexo g..."
hexo g
echo "script: cp -r $BLOG_PATH/public/ $STATIC_SITE..."
cp -r $BLOG_PATH/public/* $STATIC_SITE