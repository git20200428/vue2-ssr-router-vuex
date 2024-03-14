const SET_AAA = "SET_AAA";

const app = {
    namespaced: true,
    state: {
        aaa: 111
    },
    mutations: {
        [SET_AAA](state, data) {
            state.aaa = data;
        }
    },
    actions: {
        setAaa({
            commit
        }, data) {
            console.log(data);
            commit(SET_AAA, data);
        }
    },
    getters: {
        getAaa: state => state.aaa
    }
}

export default app;