import { createSlice } from '@reduxjs/toolkit'

if (!JSON.parse(localStorage.getItem('admin'))) {
    localStorage.setItem('admin', JSON.stringify({ id: null, role: '' }))
}
const userSlice = createSlice({
    name: 'admin',
    initialState: JSON.parse(localStorage.getItem('admin')),
    reducers: {
        login: (state, action) => {
            state.id = action.payload._id;
            state.role = action.payload.role;
            localStorage.setItem('admin', JSON.stringify({ id: action.payload._id, role: action.payload.role }))
        },
        logout: (state) => {
            state.id = null;
            state.role = '';
            localStorage.setItem('admin', JSON.stringify({ id: null, role: '' }));
        }
    },
})

export const { login,logout } = userSlice.actions
export default userSlice.reducer