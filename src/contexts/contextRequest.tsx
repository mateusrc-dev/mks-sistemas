import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'

interface Request {
  title: string
  price: string
  img: string
}

interface RequestContextType {
  request: Request[]
  handleDelete: (index: number) => void
  handleDeleteRequests: () => void
  handleNewRequest: (
    title: string,
    price: string,
    img: string,
  ) => void
}

export const RequestContext = createContext({} as RequestContextType)

interface RequestContextProviderProps {
  children: ReactNode
}

export function RequestContextProvider({
  children,
}: RequestContextProviderProps) {
  const [request, dispatch] = useReducer(
    (state: Request[], action: any) => {
      if (action.type === 'handleDelete') {
        const requests = state.filter((item, index) => index !== action.payload.index)
        return requests
      }

      if (action.type === 'handleDeleteRequests') {
        return []
      }

      if (action.type === 'handleNewRequest') {
        return [...state, action.payload.newRequest]
      }

      if (action.type === 'handleRequest') {
        return  action.payload.Request
      }

      return state
    },
    []
  )

  console.log(request)

  useEffect(() => {
    function handleStorage() {
      let storedStateAsJSON: any
      if (typeof window !== 'undefined') {
      storedStateAsJSON = localStorage.getItem(
        '@ignite-shop: request.state-1.0.0',
      )
      }

      if (storedStateAsJSON) {
        dispatch({ type: 'handleRequest', payload: { Request: JSON.parse(storedStateAsJSON) } })
      } else {
        dispatch({ type: 'handleRequest', payload: { Request: [] } })
      }
    }
    handleStorage()
  }, [])

  useEffect(() => {
    function handleSetStorage() {
      const requestJSON = JSON.stringify(request)
      localStorage.setItem('@ignite-shop: request.state-1.0.0', requestJSON)
    }
    handleSetStorage()
  }, [request])

  function handleDelete(index: number) {
    dispatch({ type: 'handleDelete', payload: { index } })
  }

  function handleDeleteRequests() {
    dispatch({ type: 'handleDeleteRequests' })
  }

  function handleNewRequest(
    title: string,
    price: string,
    img: string,
  ) {
    const newRequest: Request = {
      title,
      price,
      img,
    }
    dispatch({ type: 'handleNewRequest', payload: { newRequest } })
  }
  return (
    <RequestContext.Provider
      value={{
        handleNewRequest,
        request,
        handleDelete,
        handleDeleteRequests,
      }}
    >
      {children}
    </RequestContext.Provider>
  )
}