<template><ManagementTable title="环境管理" description="配置被测系统地址、执行账号和默认环境" item-name="环境" :rows="store.environments" :columns="columns" :fields="fields" :on-save="save" :on-delete="remove" /></template>
<script setup>
import { api } from '../api';import { usePlatformStore } from '../stores/platform';import ManagementTable from '../components/ManagementTable.vue';
const store=usePlatformStore();
const columns=[{prop:'name',label:'名称',minWidth:150},{prop:'key',label:'标识',minWidth:120},{prop:'baseUrl',label:'访问地址',minWidth:260},{prop:'username',label:'账号',minWidth:130},{prop:'isDefault',label:'默认环境',width:110,format:row=>row.isDefault?'默认':'否'}];
const fields=[{prop:'name',label:'名称',required:true},{prop:'key',label:'标识',required:true,placeholder:'例如 test'},{prop:'baseUrl',label:'访问地址',required:true,placeholder:'http://172.16.100.11:46069/'},{prop:'username',label:'账号',required:true},{prop:'password',label:'密码',type:'password',placeholder:'编辑时留空则不修改密码'},{prop:'isDefault',label:'设为默认环境',type:'switch',default:false},{prop:'sort',label:'排序',type:'number',default:99}];
async function save(payload,id){if(id&&!payload.password)delete payload.password;await api(`/api/environments${id?`/${id}`:''}`,{method:id?'PUT':'POST',body:JSON.stringify(payload)});await store.loadCatalog()}
async function remove(row){await api(`/api/environments/${row.id}`,{method:'DELETE'});await store.loadCatalog()}
</script>
