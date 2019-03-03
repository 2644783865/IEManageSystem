

export function ieAjax(object)
{
    if (object === undefined) {
        return;
    }

    var token = $.cookie('ie_token');
    if (token !== undefined && token !== "" && token !== null) {
        object.headers = {
            Authorization: "Bearer " + token
        };
    }

    $.ajax(object);
}

export function setToken(token)
{
    $.cookie('ie_token', token, { expires: 7 });
}