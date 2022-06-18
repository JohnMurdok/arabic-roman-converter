interface IAxiosGqlRequest<T> {
    data: {
        data: T;
    }
}

export default IAxiosGqlRequest;
