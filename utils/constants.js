const status = {
    ok:200,
    created: 201,
    accepted: 202,
    no_content: 204,
    Bad_request: 400,
    unauthorized: 401,
    not_found: 404,
    something_wrong: 500,

    messages:{
        200: 'Success',
        201: 'Created successfully',
        202: 'Accepted',
        404: 'Not Found',
        204: 'No Content',
        400: 'Bad Request',
        401: 'Unauthorized',
        500: 'Internal Server Error'
    }
    

}
module.exports = status;