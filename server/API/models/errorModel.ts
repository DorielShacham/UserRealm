class HttpError extends Error {
    code: any;
    constructor(message: any, errorCode: any) {
        super(message);
        this.code = errorCode;
    }
}

export { HttpError };
