import axios from 'axios';
import IAxiosGqlRequest from '../../type/request/IAxiosRequest';

class ApiService {
    private host: string;

    constructor(host?: string) {
        this.host = host || '';
    }

    async doGqlRequest(query: string, variables: Record<string, any>): Promise<IAxiosGqlRequest<any>> {
        return axios.post(`${this.host}/graphql`, {
            query,
            variables,
        });
    }

}

export default new ApiService(process.env.REACT_APP_BACKEND_HOST);

