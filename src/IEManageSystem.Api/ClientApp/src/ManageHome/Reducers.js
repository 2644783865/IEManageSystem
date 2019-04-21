import { ADD_TODO } from './Actions'

function todos(state = [], action) 
{
    switch (action.type) 
    {
        case ADD_TODO:
            return [ ...state.todos, 
                    {
                        text: action.text,
                        completed: false
                    }
                ]
        default:
            return state
    }
}

export function app(state = {}, action)
{
    return Object.assign({}, state, 
    {
        todos: todos(state.todos, action)
    })
}