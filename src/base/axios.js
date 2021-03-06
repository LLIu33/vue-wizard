// Vue-resource handling
import Settings from 'settings'
export class Xhr {
  static get(url, params = {}, success = null, failure = null) {
    Vue.prototype.$http.get(Settings.Api.root + url, params).then(success).catch(failure)
  }
}