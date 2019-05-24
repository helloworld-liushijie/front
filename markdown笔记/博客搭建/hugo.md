## hugo博客搭建

[hugo官方资料参考](<https://gohugo.io/>)

#### 1.终端（使用linux终端-ubuntu18.04）

- 安装hugo(macos使用brew) --因为apt-get下载版本太低,所以使用snap

  ```vb
  snap install hugo
  ```

- 检查hugo版本

  ```
  hugo version
  ```

- 创建博客

  ```
  hugo new site hugoblog
  ```

- 切换到blog目录

  ```vb
  cd hugoblog
  ```

- hugo主题下载:[hugo主题](<http://themes.gohugo.io/>)

  示例:

  ```js
  $ cd [path] //切换到hugo博客根目录
  $ git clone https://github.com/vaga/hugo-theme-m10c.git themes/m10c //主题会存放在themes目录下
  ```

- 启动服务

  ```
  hugo server -t m10c --buildDrafts //指定m10c主题
  ```

- 创建文章(md)

  ```
  hugo new post/hugo搭建.md //创建后再次启动服务即可
  ```

#### 2.github部署

 - 创建github仓库

   ```
   取名为:helloworld-liushijie.github.io
   ```

- 将个人博客部署到远端服务器

  ```visual basic
  hugo --theme=m10c --baseUrl="https://helloworld-liushijie.github.io/" --buildDrafts
  ```

- 部署成功后会生成public文件夹,切换到public文件夹,将public文件夹传到github

  ```visual basic
  $ git init
  $ git add . //全部加入
  $ git commit -m "hugo blog commit"
  $ git remote add origin https://github.com/helloworld-liushijie/helloworld-liushijie.github.io.git
  $ git push -u origin master //推到远端(输入username pwd)
  ```

  