#  一、SpringBoot入门

## 1.SpringBoot简介

> 简化Spring应用开发的一个框架;
>
> 整个Spring技术栈的一个整合;
>
> J2EE开发的一站式解决方案

## 2.微服务

2014,martin fowler

微服务：架构风格(服务微化)

一个应用应该是一组小型服务;可以通过http的方式进行互通;

每一个功能元素最终都是一个可独立替换和独立升级的软件单元



环境约束

- jdk: SpringBoot 1.7及以上

- maven3.x: maven3.3以上版本
- idea2017
- springboot1.5.9 RELEASE

## 3.SpringBoot HelloWorld

功能实现：

浏览器发送hello请求,服务器接受请求并处理,响应hello world字符串



1. 创建springboot项目

   - tip：解决maven-plugins下载慢问题

     > 右键->maven->"open settings.xml" 或 "create settings.xml"
     > 添加如下配置：

     ```xml
     <mirrors>
             <!-- mirror
              | Specifies a repository mirror site to use instead of a given repository. The repository that
              | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
              | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
              |
             <mirror>
               <id>mirrorId</id>
               <mirrorOf>repositoryId</mirrorOf>
               <name>Human Readable Name for this Mirror.</name>
               <url>http://my.repository.com/repo/path</url>
             </mirror>
              -->
     
             <mirror>
                 <id>alimaven</id>
                 <name>aliyun maven</name>
                 <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
                 <mirrorOf>central</mirrorOf>
             </mirror>
     
             <mirror>
                 <id>uk</id>
                 <mirrorOf>central</mirrorOf>
                 <name>Human Readable Name for this Mirror.</name>
                 <url>http://uk.maven.org/maven2/</url>
             </mirror>
     
             <mirror>
                 <id>CN</id>
                 <name>OSChina Central</name>
                 <url>http://maven.oschina.net/content/groups/public/</url>
                 <mirrorOf>central</mirrorOf>
             </mirror>
     
             <mirror>
                 <id>nexus</id>
                 <name>internal nexus repository</name>
                 <!-- <url>http://192.168.1.100:8081/nexus/content/groups/public/</url>-->
                 <url>http://repo.maven.apache.org/maven2</url>
                 <mirrorOf>central</mirrorOf>
             </mirror>
     
         </mirrors>
     ```

     

2. 编写主程序

   ```java
   /**
    * @SpringBootApplication 来标注一个主程序类,说明这是一个spring boot应用
    */
   @SpringBootApplication
   public class HelloWorldMainApplication {
   
       public static void main(String[] args) {
   
           //启动spring应用
           SpringApplication.run(HelloWorldMainApplication.class,args);
       }
   }
   ```

3. 编写相关的controller,service

   ```java
   @Controller
   public class HelloController {
   
       @ResponseBody
       @RequestMapping("/hello")
       public String hello() {
           return "Hello World";
       }
   }
   ```

4. 运行主程序测试

5. 简化部署（使用jar部署）

   - 配置可执行jar包

     ```xml
     <!-- 创建可执行jar包 -->
     <build>
         <plugins>
             <plugin>
                 <groupId>org.springframework.boot</groupId>
                 <artifactId>spring-boot-maven-plugin</artifactId>
             </plugin>
         </plugins>
     </build>
     ```

     

   - 使用package打包

     ![](./picture/p1.png)

   - 会自动在target包下生成jar包
   
   - 在终端使用java -jar /home/l/Downloads/springboot-0.0.1-SNAPSHOT.jar运行项目
   
## 4.Hello World探究

### 1.POM文件

#### 1.父项目

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.1.5.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
<!-- 他的父项目是 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.1.5.RELEASE</version>
    <relativePath>../../spring-boot-dependencies</relativePath>
</parent>
他来真正管理Spring Boot应用里面的所有依赖版本
```

springboot的版本仲裁中心:

以后我们导入依赖默认是不需要写版本<font color="red">（没有在dependencies里面管理的依赖需要声明版本号）</font>

#### 2.导入的依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

spring-boot-starter:spring-boot场景启动器;帮我们导入了web模块正常运行

Spring Boot将所有功能场景都抽取出来,做成一个个的straters(启动器),只需要在项目里面引入这些starter相关场景的所有依赖都会导入进来.要用什么功能,就导入对应的场景启动器

[springboot starters](<https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-build-systems.html#using-boot-starter>)

### 2.主程序类，主入口类

```java
/**
 * @SpringBootApplication 来标注一个主程序类,说明这是一个spring boot应用
 */
@SpringBootApplication
public class HelloWorldMainApplication {

    public static void main(String[] args) {

        //启动spring应用
        SpringApplication.run(HelloWorldMainApplication.class,args);
    }
}
```

@SpringBootApplication:该注解标注在这个类上说明这个类是SpringBoot的主配置类,SpringBoot就应该运行这个类的main方法来启动springboot应用

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = {
		@Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM,
				classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
}
```

@SpringBootConfiguration:springboot的配置

	> 标注在某个类上,表示这是一个SpringBoot的配置类
	>
	> ```
	> @Configuration:配置类上来标注这个注解
	> 	配置类---配置文件；配置类也是容器中的一个组件@Component
	> ```

@EnableAutoConfiguration:开启自动配置功能

	> 以前我们需要配置的东西,SpringBoot帮我们自动配置；@EnableAutoConfiguration告诉springboot开启自动配置功能，这样配置才能生效
	>
	> ```java
	> @Target(ElementType.TYPE)
	> @Retention(RetentionPolicy.RUNTIME)
	> @Documented
	> @Inherited
	> @AutoConfigurationPackage
	> @Import(AutoConfigurationImportSelector.class)
	> public @interface EnableAutoConfiguration {
	> }
	> ```
	>
	> @AutoConfigurationPackage:自动配置包
	>
	> ```tex
	> @Import(AutoConfigurationPackages.Registrar.class)
	> Spring的底层注解@import,给容器导入一个组件;导入的组件由AutoConfigurationPackages.Registrar.class
	> ```
	>
	> <font style="background:yellow">将主配置类(@SpringBootApplication标注的类)的所在包及下面所有子包里面的所有组件扫描到spring容器</font>
	>
	> ```tex
	> @Import(EnableAutoConfigurationImportSelector.class)
	> 给容器中导入组件
	> EnableAutoConfigurationImportSelector：导入组件选择器
	> 将所有需要导入的组件以全类名的方式返回,这些组件就会被添加到容器中;
	> 会给容器中导入非常多的自动配置类(xxxAutoCofiguration);就是给容器中导入这个场景需要的所有组件，并配置好这些组件
	> 有了自动配置类，免去我们手动编写配置注入功能组件的工作
	> ```

