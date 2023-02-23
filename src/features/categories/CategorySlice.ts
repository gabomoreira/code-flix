import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"


export type Category = {
    id: string
    name: string
    is_active: boolean
    created_at: string
    updated_at: string
    deleted_at: null | string
    description: null | string
}

type InitiaState = {
    categories: Category[] | null
}

const mockedCategories = [
    {
        id: 'a',
        name: 'Horror',
        is_active: true,
        created_at: '22/08/2022',
        updated_at: '22/08/2022',
        deleted_at: null,
        description: null,
    },
    {
        id: 'b',
        name: 'Adventure',
        is_active: true,
        created_at: '22/08/2022',
        updated_at: '22/08/2022',
        deleted_at: null,
        description: null,
    },
    {
        id: 'c',
        name: 'Romance',
        is_active: true,
        created_at: '22/08/2022',
        updated_at: '22/08/2022',
        deleted_at: null,
        description: null,
    },
]

const initialState: InitiaState = {
    categories: mockedCategories
}

const categoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        createCategory: (state, action) => {

        },
        updateategory: (state, action) => {

        },
        deleteCategory: (state, action) => {

        },
    }
})

export const selectCategories = (state: RootState) => state.categories.categories

export default categoriesSlice.reducer