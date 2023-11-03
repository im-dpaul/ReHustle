export type ServiceModel = {
    _id?: string
    title: string
    bannerImage: string
    description: string
    isActive: boolean
    paymentMode: string
    price: PriceModel
    service: ServiceDataModel
}

export type PriceModel = {
    amount: number
    currency: string
    formattedAmount?: string
    txn_type?: string
}

export type ServiceDataModel = {
    serviceType: string
    date?: number
    assets?: AssetsModel
    email?: string
    scheduleType?: string
    duration?: string | number
    url?: string
    links?: {}
}

export type AssetsModel = {
    fileType: string
    url?: string
    file?: string
}