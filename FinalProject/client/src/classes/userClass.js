class User{
    constructor(username, email, password, src) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.src = src;
        this.role = 'client';
        this.basketItems = [];
        this.wishlist = [];
    }

}
export default User