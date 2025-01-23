
export class PaginacaoDto<T> {
    total: number
    data: Array<T | Partial<T>>;
}
