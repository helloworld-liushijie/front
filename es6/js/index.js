window.onload = function() {
    //es6.arr_function();
    //es6.sum(1,3,5,7,9);
    //es6.converCurrency(0.4,1000,2000,30000);
    //es6.information();
    //es6.extension();
    //es6.extent_other();
    //es6.spread_in_fun();
    //es6.literal();
    //es6.promise();
    //es6.build_promise();
    //es6.promise_instance();
    es6.all_promise();
}

var es6 = {
    //Array数组方法
    arr_function:function() {
        const inventory = [
            {name: 'apple',quantity: 2},
            {name: 'banans',quantity: 0},
            {name: 'cherries',quantity: 5}
        ];
    
        //.find()
        inventory.find(fruit => fruit.name === 'banans');// {name: 'banans',quantity: 0}
    
        //.findIndex()
        inventory.findIndex(fruit => fruit.name === 'banans'); // 1
    
        //.some() --某个满足要求
        //当满足条件不再继续向下执行
        inventory.some(fruit => fruit.quantity > 0);//true
    
        //.every() --全部满足要求
        //当某个不满足条件不再继续向下执行
        inventory.every(fruit => fruit.name > 0);//false
    },
    //使用剩余参数sum
    sum:function(...numbers) {
        return numbers.reduce((prev,curr) => prev+curr,0);
    },
    //使用number计算汇率
    converCurrency:function(rate,...numbers) {
        return numbers.map(item => item*rate);
    },
    //使用剩余参数实现数组解构
    information:function() {
        const player = ['jelly',2,0.5,0.4,0.7];
        const [name,id,...waste] = player;
        console.log(name,id,waste);//jelly 2 Array[0.5,0.4,0.7]
    },
    //扩展运算符
    extension:function() {
        const youngers = ['George','Jhon','Thomas'];
        const olders = ['James','Adrew','Martin'];
        //["George", "Jhon", "Thomas", "mary", "James", "Adrew", "Martin"]
        const members = [...youngers,'Mary',...olders];
        console.log(members);
    },
    //扩展运算符其他用处
    extent_other:function() {
        /** favorites */
        const favorites = {
            color: ['yellow','blue'],
            fruits: ['banans','mongo']
        }

        const shoppingList = ['milk','sweets',...favorites.fruits];
        console.log(shoppingList);

        /** todos */
        const todos = [
            {id: 1,name: 'Go To Store',completed: false},
            {id: 2,name: 'Watch TV',completed: true},
            {id: 3,nmae: 'Go Shopping',completed: false}
        ]

        const id = 2;
        const todoIndex = todos.findIndex(todo => todo.id === id);
        console.log(todoIndex);
        const newTodos = [todos.slice(0,todoIndex),todos.slice(todoIndex+1)];
        console.log(newTodos);
    },
    //扩展运算符在函数中的运用
    spread_in_fun:function() {
        /** fruits */
        const fruit = ['apple','banans','pear'];
        const newFruit = ['orange','mongo'];
        //fruit.push.apply(fruit,newFruit);
        fruit.push(...newFruit);
        console.log(fruit);

        const dateFields = [2017,5,6];
        const date = new Date(...dateFields);
        console.log(date);
    },
    //对象字面量扩展--简化大量重复性工作
    literal:function() {
        const [name,age,birthday] = ['Laravist',2,'2015-09'];
        //es6的简化书写
        //* 必须属性名与值相同才可以
        const Laravist = {
            name,
            age,
            birthday,
            greet() {
                alert(`hello ${this.name}`);
            }
        }
        Laravist.greet();

        let id = 0;
        // userIds[`user-${++id}`] = id;
        // userIds[`user-${++id}`] = id;
        // userIds[`user-${++id}`] = id;
        const userIds = {
            [`user-${++id}`]:id,
            [`user-${++id}`]:id,
            [`user-${++id}`]:id
        }
        console.log(userIds);

        const keys = ['name','age','birthday'];
        const values = ['jhon',2,'2015-09'];

        const jhon = {
            [keys.shift()]:values.shift(),
            [keys.shift()]:values.shift(),
            [keys.shift()]:values.shift()
        }
        console.log(jhon);
    },
    //promise--需要在请求完成后再发送ajax
    promise:function() {
        let user;
        //fetch all users
        /** 
        $.get(`https://api.github.com/users`,data => {
            console.log('fetched all users');
            user = data[0].login;
            //当请求过多时,导致回调地狱问题
            //解决请求顺序不确定
            //fetch the first user's repos
            $.get(`https://api.github.com/users/${user}/repos`,data => {
                console.log('fetched  user repos');
                console.log(data);
            })
        })
        */

        //使用axios解决回调地狱问题
        const usersPromise = axios.get(`https://api.github.com/users`);
        usersPromise
            .then(response => {
                user = response.data[0].login;
                return axios.get(`https://api.github.com/users/${user}/repos`);
            })
            .then(respone => {
                console.log(respone.data);
            })
            .catch(err => {
                //打印错误信息
                console.error(err);
            })
    },
    //构建promise
    build_promise:function() {
        /** resolve:请求成功    reject:请求失败 */
        const p = new Promise((resolve,reject) => {
            setTimeout(() => {
                //resolve('Laravist is awesome!');
                //reject('Laravist is wrong');
                //Error可以指出真实错误地址
                reject(new Error('Laravist is wrong'));
            }, 2000);
        })

        p.then(data => {
            console.log(data);
        }).catch(err => {
            console.error(err);
        })
    },
    //promise实例创建
    promise_instance:function() {
        const repos = [
            {name: 'grit',owner: 'mojobo',description: 'Grit is no longer maintained',id: 1},
            {name: 'jsawesome',owner :'vanpelt',description:' Awesome Json',id: 2},
            {name: 'merb-core',owner :'wycats',description: 
                'Merb Core:All you need.Non you don\'t.',id:3}
        ]

        const owners = [
            {name: 'mojombo',location: 'San Francisco',followers: 123},
            {name: 'vanpelt',location: 'Bay Minette',followers: 1034},
            {name: 'wycats', location: 'Los Angeles,CA',followers: 388}
        ]

        function getRepoById(id) {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    const repo = repos.find(repo => repo.id === id);
                    if(repo) {
                        resolve(repo);
                    } else {
                        reject(Error('No Repo Find!'));
                    }
                }, 2000);
            })
        }

        getRepoById(3)
            .then(repo => {
                return comboundOwner(repo);
            })
            .then(repo => {
                console.log(repo);
            })
            .catch(err => {
                console.error(err);
            })

        function comboundOwner(repo) {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    const owner = owners.find(owner => owner.name === repo.owner);
                    if(owner) {
                        repo.owner = owner;
                        resolve(repo);
                    } else {
                        reject(Error('can\'t found the owner!'));
                    }
                }, 2000);
            })
        }
    },
    //处理多个promise
    all_promise:function() {
        const usersPromise = new Promise((resolve,rejecct) => {
            setTimeout(() => {
                resolve(['mojombo','vanpelt','wycats']);
            }, 2000);
        })

        const moviewPromise = new Promise((resolve,reject) => {
            setTimeout(() => {
                //reject(new Error('no reject'));
                resolve({name: '摔跤吧,爸爸！',rating: 9.2,year: 2016})
            }, 500);
        })

        Promise
            //全部成功才算成功,否则抛出异常
            .all([usersPromise,moviewPromise])
            //不同于all,由第一个的返回状态决定
            //.race([usersPromise,moviewPromise])
            .then(response => {
                const [user,movie] = response;
                console.log(user);
                console.log(movie);
            })
            .catch(err => {
                console.error(err);
            })
    }
}