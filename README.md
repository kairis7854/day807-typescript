# day807-typescript

## DEMO
連結：https://kairis7854.github.io/day807-typescript/

<br>


官網：https://www.typescriptlang.org/

安裝 npm i -g typescript \
編譯 tsc 01_hello.ts


```js
02.聲明

//聲明變量，同時指定類型
let a: number

//聲明變量，同時指定類型，並賦值
let a: number = 1

//聲明變量，並賦值，TS自動對變量指定類型
let a = 1

//JS 中的函數是不考慮參數的類型和個數
//TS 函數寫法。參數個數為2個， a、b 類型為 number，函數返回值為 number
let sum = function (a:number, b:number) : number{
    return a + b
}
```
```js
03.類型

//字面量
let a: 10

//聯合類型
let b: 'male' | 'female'
let c: string | boolean

// any 任意類型，相當於關閉TS的類型檢測(盡量不用)
let a: any
a = 10
a = true
//聲明變量不指定類型，TS自動判斷為 any
let b

// unknown 類型安全的 any 
let a: unknown
a = 10
a = true
//與 any 區別是，unknown '不能'直接賦值給其他變量，若要則先做類型判斷
if(typeof  a === 'string'){
    a = b
}

//斷言
a = b as string
a = <string>b

// void 用來表示空，以函數為例代表沒有返回值的函數
function fn(): void{
}

// never 表示永遠不會返回結果
function fn2(): never{
    throw new Error('報錯了')
}
```
```js
04.類型2

//object
let a: object
a = {}
a = function(){}
//指定對象包含哪些屬性{name:string}，指定是否為必要{name?:string}
let b: {name:string, age?:number}
//[propsName:string]: any ，表示任意類型屬性
let c: {name:string, [propsName:string]: any}
c = { name:'喬治', age:18, gender:'男' }
//設置函數結構
let d: (a: number, b: number)=>number

// array
// string[] 表示字符串數組
let e: string[]
e = ['a','b','c']
// number[] 表示數字數組
let f: number[]
// Array<number> 第二種表示方式
let g: Array<number>

//元祖，表示固定長度的數組
let h: [string, number]

//enum 枚舉
enum Gender{
    Male,
    Female
}
let i: { name:string, gender: Gender }
i = {
    name:'Peter',
    gender: Gender.Male
}

// & 表示同時
let j = { name:string } & { age:number }
j = {name:'sora', age:18}

// type 類型別名
type myType = 1 | 2 | 3 | 4 | 5
let k: myType
k = 2
```
```js
05.編譯選項1~2

//單一檔案
tsc 01_hello.ts
//單一檔案 監視
tsc 01_hello.ts -w
//所有檔案
根目錄創 tsconfig.json
tsc
//所有檔案 監視
tsc -w

//tsconfig.json 
{
    /*
        include 用來指定那些文件目錄須被編譯
        路徑:　**表示任意目錄， *表示任意文件

        exclude 不需要被編譯文件的目錄
        默認值: "node_modules"

        files 用來指定那些文件須被編譯 少用
    */
    "include":[
        "./src/**/*"
    ],
    "exclude":[
        "./src/02"
    ],
    "files":[
         "01.ts",
         "02.ts"
    ]

    "compilerOptions":{
        /*
            指定ts被編譯為的版本
            'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'
        */
        "target": "es2015",
        /*
            指定模塊化規範
            'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'es2022', 'esnext', 'node12', 'nodenext'
        */
        "module": "es6",
        /*
            指定項目使用的庫，一般不設定。
            若要使用場景如 nodeJS 不使用 document，則使用
        */
        "lib": ["dom"],
        //outDir 指定編譯後文件所在位置
        "outDir": "./dist",
        //outFile 將全局作用域代碼合併到一個文件，不是必須
        "outFile": "./dist/app.js"
    }
}
```
```js
07.編譯選項3~4

//tsconfig.json 
{
    "compilerOptions":{
        //是否對js 進行編譯，默認false
        "allowJs": true,
        //是否檢查js 語法規範，默認false
        "checkJs": true,
        // 是否移除註釋，默認false
        "removeComments":true,
        //不生成編譯後的文件，默認false
        "noEmit":false,
        //不生成編譯後的文件，當有錯誤時，默認false
        "noEmitOnError":false,


        //所有嚴格檢查總開關
        "strict":true,
        //是否使用嚴格模式，默認false
        "alwaysStrict":true,
        // 不允許隱式 any，默認false
        "noImplicitAny": true,
        //不允許不明確 this，默認false
        // 解決:fn(this:any){}
        "noImplicitThis": true,
        // 不允許空值，默認false
        // 解決1:if( box1 !== null ){}
        // 解決2:box1?.addEventListener('click',fn(){})
        "strictNullChecks":true
    }
}
```
```js
09.Webpack & Babel 整合1

安裝
npm init -y
npm i -D webpack webpack-cli typescript ts-loader

//webpack.config.js
const path = require('path')

module.exports = {
    entry: './src/index.js', //入口
    output: { //出口
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: { //模塊
        rule: [ 
            {
                test: /\.ts$/, //指定規則生效文件
                use: 'ts-loader', //使用的loader
                exclude: /node-modules/ //排除的文件
            }
        ]
    }

}

//tsconfig.json
{
    "compilerOptions": {
        "target": "es6",
        "module": "es6",
        "strict": true,
    },
}

//package.json
{
  "scripts": {
    "build": "webpack"
  },
}

//最基本 webpack 與 ts 開發環境已完成
npm run build

```
```js
10.Webpack & Babel 整合2

安裝
npm i -D html-webpack-plugin //生成html
//webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            //title: "自訂title"
            template: './src/index.html' // 以./src/index.html 當模板
        }),
    ]
}

安裝
npm i -D webpack-dev-server //熱模塊
//package.json
{
    "scripts": {
        "start": "webpack serve --open"
  },
}
npm start

安裝
npm i -D clean-webpack-plugin //dist先清空再生成
//webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}

用來設置引用模塊
//webpack.config.js
module.exports = {
    resolve: { 
        extensions: ['.ts','.js']
    }
}
```
```js
10.Webpack & Babel 整合3

安裝
npm i -D @babel/core @babel/preset-env babel-loader core-js
//webpack.config.js
module.exports = {
    output: {
        // 告诉webpack不使用箭头
        // 默认打包后是一个立即执行的箭头函数，在IE 11中也是无法执行的！
        // 加上下面的配置，可以在webpack打包时，最外层不再是箭头函数
        // webpack新版本已经不想兼容IE了！233
        environment: {
            arrowFunction: false
        }
    },
    module: { 
        rules: [
            {
                // Webpack在加载时是"从后向前"加载
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // 指定corejs的版本
                                        // package.json中的版本为3.8.1
                                        // 舊版沒 promise 的部分，使用 corejs 的 promise
                                        "corejs": "3",
                                        // 使用corejs的方式，"usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
            }
        ]
    },
}
```
```js
12.面相對象
一切皆對象
```
```js
13.類1

//tsconfig.json
{
    "compilerOptions": {
        "target": "es6",
        "module": "es6",
        "strict": true,
        "outDir": "./dist" 
    },
    "include": [
        "./src/**/*"
    ]
}

//index.ts
class Person{
    name: string = 'aaa' //實例屬性，可讀可寫
    static age: number = 10 //靜態屬性，可讀可寫
    readonly weight = 60 //實例屬性，只可讀
    static readonly gender = 'male' //靜態屬性，只可讀

    say(){ //實例方法
        console.log('a')
    }
    static talk(){ //靜態方法
        console.log('b')
    }
}
```
```js
14.類2

class Person{
    name:string
    age:number

    // constructor 稱構造函數
    // 構造函數會在創建時調用
    constructor(name:string, age:number){
        //在實例方法中，this表當前實例
        //可通過this項新創建對象添加屬性
        this.name = name
        this.age = age
    }

    //在方法中可通過this來表示當前調用方法的對象    
    say(){
        console.log(this.name) 
    }
}
const person = new Person('aa',10)
const person2 = new Person('bb',20)
```
```js
15.類3 extends

class Animal{
    name:string
    age:number

    constructor(name:string, age:number){
        this.name = name
        this.age = age
    }

    say(){
        console.log('動物叫') 
    }
}

class Dog extends Animal{

    //方法重寫
    say(){
        console.log('汪汪汪') 
    }
}
class Cat extends Animal{

    //方法有則改，無則增
    run(){

    }
}
```
```js
16.類4 super

class Animal {
    name: string

    constructor(name: string) {
        this.name = name
    }

    say() {
        console.log('動物叫')
    }
}

class Dog extends Animal {
    // 添加個屬性
    age: number

    // 則須對屬性初始化，調用constructor
    constructor(name: string, age: number) {
        // 若在子類寫了 constructor，會覆蓋掉原父類 constructor，故調用 super() 父類構造函數
        super(name) //父類有 name 屬性，super 中也需補上

        this.age = age
    }

    say() {
        // super 代表當前父類
        // super.say()
    }
}
```
```js
17.類5 abstract

// 定義抽象類，使用 abstract 開頭
// 抽象類只能被繼承，不能被實例
abstract class Animal {
    name: string

    constructor(name: string) {
        this.name = name
    }

    // 定義抽象方法
    // 抽象方法使用 abstract 開頭，沒有方法體
    // 抽象方法只能定義在在抽象類中，子類必須對抽象方法重寫
    abstract say(): void
}

class Dog extends Animal{
    // 方法必須重寫
    say(){}
}
```
```js
18.接口

//描述一個對象類型
type myType = {
    name: string,
    age: number
}

//定義一個類結構
//接口指定一結構，不考慮實際值
interface myInterface {
    name: string,
    say():void
}

// type 與 interface 區別是，interface 可擴展

// 使類去實現一個接口
class MyClass implements myInterface{
    name: string

    constructor(name:string){
        this.name = name
    }

    say(){}
}
```
```js
19.屬性封裝

class Person{
    /*
        public 修飾的屬性可以在任意位置訪問(修改) 默認值
        private 私有屬性 只能在類內部進行訪問(修改)
            -通過在類中定義方法 使私有屬性可以在外部被訪問
        protected 受保護的 只可在當前類與當前類的子類中訪問
    */
    private name: string
    private age: number
    protected weight: number

    constructor(name: string, age: number, weight: number){
        this.name = name
        this.age = age
        this.weight = weight
    }

    // 私有屬性操作方法 
    getName(){
        return this.name
    }
    setName(value: string){
        this.name = value
    }
    setAge(value: number){ //判斷加強
        if(value >= 0){
            this.age = value
        }
    }

    // ts 中 getter 方法
    get get_name(){
        return this.name
    }
    set set_name(value: string){
        this.name = value
    }
}
const person = new Person('a',10,15)
console.log(person.get_name) //a
person.set_name= 'b'
console.log(person.get_name) //b

//語法糖簡寫
//下方兩個相同
class C{
    constructor(public name: string, public age: number){

    }
}
class C{
    name: string
    age: number

    constructor( name: string, age: number){
        this.name = name
        this.age = age
    }
}

```
```js
20.泛型

//定義類或函數時，類型不明確就可用泛型
function fn<T>(a: T): T {
    return a
}

//可以直接調用泛型函數
let res = fn(10) //不指定泛型，ts自動推斷
let res2 =fn<string>('10') //指定泛型

//泛型可以指定多個
function fn2<T, K>(a: T,b: K): T{
    console.log(b)
    return a
}

//泛型與 interface
interface Inter{
    length:number
}
function fn3<T extends Inter>(a: T): number{
    return a.length
}

//泛型與類
class fn4<T>{
    name: T
    constructor(name: T){
        this.name = name
    }
}
```
```js
21. less 與 post 配置 
安裝
npm i -D less less-loader css-loader style-loader
npm i -D postcss postcss-loader postcss-preset-env

module.exports = {
    module: { //模塊
        rules: [
            //less 設置
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",

                    // 引入postcss
                    // 类似于babel，把css语法转换兼容旧版浏览器的语法
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        // 浏览器兼容插件
                                        "postcss-preset-env",
                                        {
                                            // 每个浏览器最新两个版本
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
}
```