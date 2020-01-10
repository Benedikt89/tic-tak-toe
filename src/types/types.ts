export interface IOrderItem {
    id: string,
    name: string,
}

export interface IAppState {
    order: Array<IOrderItem>,
    totalPrice: number,
    totalQuantity: number,
    isFetching: boolean,
}