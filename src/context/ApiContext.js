import { createContext, useState } from "react";
import api from "../services/api";

export const ApiContext = createContext({})

const ApiProvider = ({ children }) => {

    const [produto, setProduto] = useState([])
    const [categorias, setCategorias] = useState([])

    const getProduto = async () => {
        const { data } = await api.get("/produtos")
        setProduto(data)
    }

    const getCategoria = async () => {
        const { data } = await api.get("/categorias")
        setCategorias(data)
    }

    return (
        <ApiContext.Provider value={{ produto, getProduto, categorias, getCategoria }}>
            {children}
        </ApiContext.Provider>
    )
}

export default ApiProvider;