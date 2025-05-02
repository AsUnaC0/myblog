import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store(
    {
        state: {
            likes: 70,
            currentColor:localStorage.getItem('color')||"rgb(68, 86, 167)"
        },
        mutations: {
            addLike(state) {
                state.likes++
            },
            addMessage(state, message) {
                state.leaveMessages.unshift(message)
            },
            changeColor(state, color) {
                state.currentColor = color
            }
        }
    }
)
export default store