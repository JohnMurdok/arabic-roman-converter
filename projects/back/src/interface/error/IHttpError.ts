interface IHttpError {
    status?: number;
    message: string;
    stack?: string;
}

export default IHttpError;
