import { pinia } from "@/stores/index"
import { defineStore } from 'pinia'
import { setRequestParams,getRequestParams,removeRequestParams,setCurrentStep,getCurrentStep,removeCurrentStep,setShopId,getShopId,removeShopId,setMerchantId,getMerchantId,removeMerchantId } from "@/utils/cache"
export const useRouteStore = defineStore("route", () => {
  const stepList = ref<string[]>(['stepOne','stepTwo','stepThree','stepFour'])
  const currentStep = ref<string>(getCurrentStep() || 'stepOne')
  const requestParams = ref<any>(getRequestParams() || {})
  const shopId = ref<string>(getShopId() || '')
  const merchantId = ref<string>(getMerchantId() || '')
  const setShopIdFn = (value:string)=>{
    setShopId(value)
    shopId.value = value
  }
  const resetShopIdFn = ()=>{
    removeShopId()
    shopId.value = ''
  }
  const setMerchantIdFn = (value:string)=>{
    setMerchantId(value)
    merchantId.value = value
  }
  const resetMerchantIdFn = ()=>{
    removeMerchantId()
    merchantId.value = ''
  }
  const setRequestParamsFn = (value:any)=>{
    setRequestParams(value)
    requestParams.value = value
  }
  const resetRequestParamsFn = ()=>{
    removeRequestParams()
    requestParams.value = {}
  }
  const setCurrentStepFn = (value:string)=>{
    currentStep.value = value
    setCurrentStep(value)
  }
  const resetCurrentStepFn = ()=>{
    currentStep.value = 'stepOne'
    removeCurrentStep()
  }
  return { stepList,currentStep,setCurrentStepFn,resetCurrentStepFn,requestParams,setRequestParamsFn,resetRequestParamsFn,shopId,setShopIdFn,resetShopIdFn,merchantId,setMerchantIdFn,resetMerchantIdFn }
})


/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useRouteStoreOutside() {
  return useRouteStore(pinia)
}