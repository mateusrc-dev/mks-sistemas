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
  handleDelete: (img: string) => void
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
  const [State, setState] = useState(false)
  const [request, dispatch] = useReducer(
    (state: Request[], action: any) => {
      if (action.type === 'handleDelete') {
        const requests = state.filter((item) => item.img !== action.payload.img)
        return requests
      }

      if (action.type === 'handleDeleteRequests') {
        return []
      }

      if (action.type === 'handleNewRequest') {
        return [...state, action.payload.newRequest]
      }

      return state
    },
    [],
    () => {
      let storedStateAsJSON: any;
      if (typeof window !== 'undefined') {
      storedStateAsJSON = localStorage.getItem(
        '@ignite-shop: request.state-1.0.0',
      )
    }

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      } else {
        return []
      }
    },
  )

  console.log(request)

  useEffect(() => {
    const requestJSON = JSON.stringify(request)
    localStorage.setItem('@ignite-shop: request.state-1.0.0', requestJSON)
  }, [request, State])

  function handleDelete(img: string) {
    dispatch({ type: 'handleDelete', payload: { img } })
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