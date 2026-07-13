<template><ManagementTable :title="config.title" :description="config.description" :item-name="config.itemName" :rows="config.rows" :columns="config.columns" :fields="config.fields" :readonly="readonly" :on-save="save" :on-delete="remove" /></template>
<script setup>
import { computed } from 'vue';
import { api } from '../api';
import { usePlatformStore } from '../stores/platform';
import ManagementTable from '../components/ManagementTable.vue';

const props=defineProps({type:{type:String,required:true}}), store=usePlatformStore();
const readonly=computed(()=>store.user?.role==='tester'), appOptions=computed(()=>store.apps.map(item=>({label:item.name,value:item.id})));
const config=computed(()=>props.type==='apps'?{
  title:'应用管理',description:'维护测试场景所属的业务应用',itemName:'应用',rows:store.apps,
  columns:[{prop:'name',label:'应用名称',minWidth:180},{prop:'key',label:'标识',minWidth:150},{prop:'description',label:'说明',minWidth:260},{prop:'sort',label:'排序',width:90}],
  fields:[{prop:'name',label:'应用名称',required:true},{prop:'key',label:'标识',required:true,placeholder:'例如 wms'},{prop:'description',label:'说明',type:'textarea'},{prop:'sort',label:'排序',type:'number',default:99}]
}:{
  title:'模块管理',description:'维护应用下的业务模块及代码前缀',itemName:'模块',rows:store.modules,
  columns:[{prop:'name',label:'模块名称',minWidth:180},{prop:'prefix',label:'前缀',minWidth:130},{prop:'appId',label:'所属应用',minWidth:180,format:row=>store.appName(row.appId)},{prop:'sort',label:'排序',width:90}],
  fields:[{prop:'name',label:'模块名称',required:true},{prop:'prefix',label:'前缀',required:true,placeholder:'例如 Ims'},{prop:'appId',label:'所属应用',type:'select',required:true,options:appOptions.value},{prop:'sort',label:'排序',type:'number',default:99}]
});
async function save(payload,id){await api(`/api/${props.type}${id?`/${id}`:''}`,{method:id?'PUT':'POST',body:JSON.stringify(payload)});await store.loadCatalog()}
async function remove(row){await api(`/api/${props.type}/${row.id}`,{method:'DELETE'});await store.loadCatalog()}
</script>
