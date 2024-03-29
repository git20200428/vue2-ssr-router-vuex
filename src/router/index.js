import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/view/Index.vue'
import Detail from '@/view/Detail.vue'


Vue.use(Router)

//这里为什么不导出一个router实例
//每次用户请求都需要创建router实例
export default function createRouter(){
    return new Router({
        mode:'history',
        routes:[
            {path:'/', component: Index},
            {path: '/detail', component: Detail}
        ]
    })
}


