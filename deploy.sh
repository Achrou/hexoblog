BLOG_PATH="/data/hexoblog"
echo "======================================"
echo "script: cd $BLOG_PATH"
cd $BLOG_PATH
echo "script: git pull..."
git pull
echo "script: hexo clean..."
hexo clean
echo "script: hexo g..."
hexo g