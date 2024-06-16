import { createSlice } from '@reduxjs/toolkit'

if (!JSON.parse(localStorage.getItem('user'))) {
    localStorage.setItem('user', JSON.stringify({ id: null, role: '' }))
}
const userSlice = createSlice({
    name: 'user',
    initialState: JSON.parse(localStorage.getItem('user')),
    reducers: {
        login: (state, action) => {
            state.id = action.payload._id;
            state.role = action.payload.role;
            localStorage.setItem('user', JSON.stringify({ id: action.payload._id, role: action.payload.role }))
        },
        logout: (state) => {
            state.id = null;
            state.role = '';
            localStorage.setItem('user', JSON.stringify({ id: null, role: '' }));
        }
    },
})

export const { login,logout } = userSlice.actions
export default userSlice.reducer