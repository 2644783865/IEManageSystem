// 生成请求action
export const Request = "IEFecth_Request"
function request(postData) {
  return {
    type: Request,
    data: postData,
    isFetch: true
  }
}

// 生成错误action
export const ErrorAction = "IEFecth_Error"
function error(errorMessage) {
  return {
    type: ErrorAction,
    error: errorMessage,
    isFetch: false,
  }
}

// 清理错误
export const ClearError = "IEFecth_ClearError"
export function clearError(errorMessage) {
  return {
    type: ClearError,
    isFetch: false,
  }
}

// 对响应action进行包装
function receive(action) {
  return { ...action, ...{ isFetch: false } }
}

// 生成ieThunkAcion，如果请求成功，会分发receiveActionFun生成的动作
export function createIEThunkAction(url, postData, receiveActionFun) {
  return function (dispatch) {
    dispatch(request(postData));

    return fetch(url, {
      method: 'post',
      type: "json",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(
      response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    ).then(
      data => {
        if (data.isSuccess == false) {
          throw new Error(data.message);
        }

        return data.value
      }
    ).then(
      value => dispatch(receive(receiveActionFun(value)))  // dispatch 响应动作
    ).catch(
      errorData => dispatch(error(errorData.message))
    )
  }
}

// 用户信息响应
export const UserInfoReceive = "UserInfoReceive"
export function userInfoFetch(resource) {
  return createIEThunkAction(
    "/api/PageManage/AddContentPage",
    {},
    data => ({
      type: UserInfoReceive,
      data
    })
  );
}