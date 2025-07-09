export const setRequestParams = (value: any)=>{
    return window.localStorage.setItem('requestParams',JSON.stringify(value))
}

export const getRequestParams = ()=>{
    return JSON.parse(window.localStorage.getItem('requestParams') || '{}')
}

export const removeRequestParams = ()=>{
    return window.localStorage.removeItem('requestParams')
}
export const setCurrentStep = (value: any)=>{
    return window.localStorage.setItem('currentStep',value)
}
export const getCurrentStep = ()=>{
    return window.localStorage.getItem('currentStep')
}
export const removeCurrentStep = ()=>{
    return window.localStorage.removeItem('currentStep')
}
export const setShopId = (value: any)=>{
    return window.localStorage.setItem('shopId',value)
}
export const getShopId = ()=>{
    return window.localStorage.getItem('shopId')
}
export const removeShopId = ()=>{
    return window.localStorage.removeItem('shopId')
}
export const setMerchantId = (value: any)=>{
    return window.localStorage.setItem('merchantId',value)
}
export const getMerchantId = ()=>{
    return window.localStorage.getItem('merchantId')
}
export const removeMerchantId = ()=>{
    return window.localStorage.removeItem('merchantId')
}