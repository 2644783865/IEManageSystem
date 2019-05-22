// 对请求action进行包装
export function request(data){
    return {...data, ...{ isFetch:true }}
}

// 对响应action进行包装
export function receive(data){
    return {...data, ...{ isFetch:false }}
}

// 用户信息请求
export const UserInfoRequest = "UserInfoRequest"
function userInfoRequest(){
    return request({
        type: UserInfoRequest
    })
}

// 用户信息响应
export const UserInfoReceive = "UserInfoReceive"
function userInfoReceive(data)
{
    return receive({
        type: UserInfoReceive,
        data
    })
}

export function userInfoFetch(resource)
{
    return function (dispatch) 
    {
      dispatch(userInfoRequest(resource));
  
      let postData = resource;
  
      return fetch("/api/PageManage/AddContentPage", {
        method: 'post',
        type: "json",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }).then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      ).then(
        data => dispatch(userInfoReceive(data))	// dispatch 响应动作
      )
    }
  
}