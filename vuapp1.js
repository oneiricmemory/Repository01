import {createApp, ref, reactive, provide, inject, watch} from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
const Cmpgreeting = {
  inject: ["key1"],
  setup: function() {
    const inj = inject("key1");
    const data = ref("User");
    watch(inj, function() {data.value = inj.name;});
    return {data};
  },
  template: `<p>Hello, {{data}}.</p>`
};
const Cmpbutton = {
  emits: ["eedn"],
  setup: function(props, context) {
    const state = reactive({clicked: 0});
    const style1 = {width: "100%", height: "35px"};
    function fnclick1() {
      state.clicked = 1;
      fetch("/lol.php", {method: "POST"})
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        context.emit("eedn", data.name);
        state.clicked = 0;
      })
      .catch(function(err) {
        console.log(err);
        alert(err);
      });
    }
    return {state, style1, fnclick1};
  },
  template: `
    <button v-if="state.clicked == 0" v-bind:style="style1" v-on:click="fnclick1" class="btn btn-primary" type="button">Button</button>
    <button v-if="state.clicked == 1" v-bind:style="style1" type="button" class="btn btn-primary" disabled><div class="spinner-border spinner-border-sm"></div></button>
  `
};
const Vuapp = {
  components: {
    Cmpbutton, Cmpgreeting
  },
  setup: function() {
    const ddnm = {key1: reactive({name: ""})};
    function fnc1(ppd) {
      ddnm.key1.name = ppd;
    }
    provide("key1", ddnm.key1);
    return {fnc1};
  },
  template: `
    <Cmpbutton v-on:eedn="fnc1"/>
    <br/>
    <Cmpgreeting/>
  `
};
createApp(Vuapp).mount("#dv0");
