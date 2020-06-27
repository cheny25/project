
import Vue from 'vue';
import Vuex from 'vuex';
 
Vue.use(Vuex);
 
export default new Vuex.Store({  
  state: {
    baseUrl: "https://we.cqu.pt/evs/api",
    utils : require('../utils/index.js'),
    roomId: '41500521',
    buildingId: '3'
  	// roomId:null,
  	// buildingId:null
  }, 
  actions:{
  	setBuildingId(ctx,buildingId){
  		ctx.commit('setBuildingId',buildingId)
  	},
  	setDormitoryId(dtx,dormitoryId){
  		dtx.commit('setDormitoryId',dormitoryId)
  	}
  },
  mutations: {  
  	setBuildingId(state,buildingId){
  		state.buildingId = buildingId;
  		localStorage.buildingId = state.buildingId;
  	},
  	setDormitoryId(state,dormitoryId){
  		state.roomId = dormitoryId;
  		localStorage.dormitoryId = state.roomId;
  	}
  }
});
