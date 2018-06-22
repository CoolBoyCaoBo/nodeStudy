import Server from './server'
const install = (Vue, config = {}) => {
    Vue.use(Server);
}
export default install