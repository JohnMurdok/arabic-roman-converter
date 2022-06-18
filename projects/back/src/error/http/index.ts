import httpStatus from 'http-status';
import { ApolloError } from 'apollo-server-errors';

class HttpError extends ApolloError {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.extensions = { ...this.extensions, code: httpStatus[`${this.status}_NAME`] };
    }
}

export default HttpError;
