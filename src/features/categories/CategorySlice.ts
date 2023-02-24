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
        created_at: '2023-06-25 17:39:15.014961-05',
        updated_at: '2023-06-25 17:39:15.014961-05',
        deleted_at: null,
        description: 'Descriçao do genero explciando o que ele significa patati patata',
    },
    {
        id: 'b',
        name: 'Adventure',
        is_active: true,
        created_at: '2023-06-25 17:39:15.014961-05',
        updated_at: '2023-06-25 17:39:15.014961-05',
        deleted_at: null,
        description: 'Descriçao do genero explciando o que ele significa patati patata',
    },
    {
        id: 'c',
        name: 'Romance',
        is_active: true,
        created_at: '2023-06-25 17:39:15.014961-05',
        updated_at: '2023-06-25 17:39:15.014961-05',
        deleted_at: null,
        description: 'Descriçao do genero explciando o que ele significa patati patata',
    },
    {
        id: 'd',
        name: 'Action',
        is_active: true,
        created_at: '2023-06-25 17:39:15.014961-05',
        updated_at: '2023-06-25 17:39:15.014961-05',
        deleted_at: null,
        description: 'Descriçao do genero explciando o que ele significa patati patata',
    },
    {
        id: 'e',
        name: 'Comedy',
        is_active: true,
        created_at: '2023-06-25 17:39:15.014961-05',
        updated_at: '2023-06-25 17:39:15.014961-05',
        deleted_at: null,
        description: 'Descriçao do genero explciando o que ele significa patati patata',
    },
    {
        id: 'f',
        name: 'Thriller',
        is_active: true,
        created_at: '2023-06-25 17:39:15.014961-05',
        updated_at: '2023-06-25 17:39:15.014961-05',
        deleted_at: null,
        description: 'Descriçao do genero explciando o que ele significa patati patata',
    },
    {
        id: 'g',
        name: 'Drama',
        is_active: true,
        created_at: '2023-06-25 17:39:15.014961-05',
        updated_at: '2023-06-25 17:39:15.014961-05',
        deleted_at: null,
        description: 'Descriçao do genero explciando o que ele significa patati patata',
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