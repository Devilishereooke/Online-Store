import {create} from 'zustand'

export const useProductStore = create((set) => ({
    products : [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.imageUrl){
            return {success : false, message : "Please fill in all fields"}
        }

        const res = await fetch("/api/v1/products", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newProduct)
        })

        const data = await res.json()
        set((state) => ({products : [...state.products, data.product]}))
        return {success : true, message : "Product added successfully"}
    },
    fetchProducts: async () => {
        const res = await fetch("http://localhost:4500/api/v1/products")
        // console.log(res);
        const data = await res.json()
        // console.log("data", data);
        set({products : data})
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/v1/products/${pid}`, {
            method : 'DELETE'
        })
        const data = await res.json()
        console.log(data);
        
        set((state) => ({products : state.products.filter((product) => product._id !== pid)}))
        return {success : true, message : data.messege}
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/v1/products/${pid}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(updatedProduct)
        })
        const data = await res.json()
        set((state) => ({
            products : state.products.map((product) => {
                if(product._id === pid){
                    return data.product
                }
                return product
            })
        }))
        return {success : true, message : data.message}
    }
}))