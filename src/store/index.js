import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store(
    {
        state: {
            bgColor: [
                "rgb(68, 86, 167)",
                "rgb(148, 68, 181)",
                "rgb(167, 68, 68)",
                "rgb(114, 159, 207)",
                "rgb(169, 133, 196)",
                "rgb(239, 154, 154)",
                "rgb(129, 199, 132)",
                "rgb(48, 63, 102)",
                "rgb(94, 53, 117)",
                "rgb(176, 58, 72)",
                "rgb(44, 62, 80)",
            ],
            currentIndex: 0,
        },
        mutations: {
            setCurrentIndex(state, index) {
                if (index >= 0 && index < state.bgColor.length) {
                    state.currentIndex = index
                }
            }
        },
        getters: {
            currentColor(state) {
                return state.bgColor[state.currentIndex]
            }
        },
    }
)
export default store