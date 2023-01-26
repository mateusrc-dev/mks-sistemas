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
  id: string,
}

interface PriceId {
  id: string,
}

interface RequestContextType {
  request: Request[]
  priceId: PriceId[]
  headerState: boolean,
  handleHeaderState: () => void,
  handleDelete: (index: number) => void
  handleDeleteRequests: () => void
  handleNewRequest: (
    title: string,
    price: string,
    img: string,
    id: string,
  ) => void
}

export const RequestContext = createContext({} as RequestContextType)

interface RequestContextProviderProps {
  children: ReactNode
}

export function RequestContextProvider({
  children,
}: RequestContextProviderProps) {
  const [priceId, setPriceId] = useState([])
  const [headerState, setHeaderState] = useState(true)
  const [request, dispatch] = useReducer(
    (state: Request[], action: any) => {
      if (action.type === 'handleDelete') {
        const requests = state.filter((item, index) => index !== action.payload.inde)
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
        setPriceId(JSON.parse(storedStateAsJSON))
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

  function handleDelete(inde: number) {
    dispatch({ type: 'handleDelete', payload: { inde } })
    setPriceId(state => state.filter((item, index) => index !== inde))
  }

  function handleDeleteRequests() {
    dispatch({ type: 'handleDeleteRequests' })
    setPriceId([])
  }

  function handleNewRequest(
    title: string,
    price: string,
    img: string,
    id: string,
  ) {
    const newRequest: Request = {
      title,
      price,
      img,
      id,
    }
    dispatch({ type: 'handleNewRequest', payload: { newRequest } })
    setPriceId((prev) => [...prev, newRequest.id])
  }

  function handleHeaderState() {
    if (headerState === false) {
    setHeaderState(true)
  } else {
    setHeaderState(false)
  }
  }

  return (
    <RequestContext.Provider
      value={{
        handleNewRequest,
        request,
        priceId,
        handleDelete,
        handleDeleteRequests,
        headerState,
        handleHeaderState,
      }}
    >
      {children}
    </RequestContext.Provider>
  )
}