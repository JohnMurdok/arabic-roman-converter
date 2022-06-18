import apiService from '../../../service/api';
import axios from 'axios';
import IAxiosGqlRequest from '../../../type/request/IAxiosRequest';
jest.mock('axios');

const postMock = axios.post as unknown as jest.Mock<Promise<IAxiosGqlRequest<any>>>;

describe('[SERVICE] ApiService', () => {
    test('doGqlRequest()', async () => {
        postMock.mockResolvedValueOnce({
            data: {
                data: 'test',
            },
        });
        const { data } = await apiService.doGqlRequest(
            'test',
            { toto: 22 },
        );

        expect(data.data).toEqual('test');
        expect(postMock).toHaveBeenCalledWith(
            `${process.env.REACT_APP_BACKEND_HOST}/graphql`,
            {
                query: 'test',
                variables: {
                    toto: 22,
                },
            },
        );
    });
});
