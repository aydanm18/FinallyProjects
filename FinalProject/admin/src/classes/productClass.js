class Product {
    constructor(title, description, image,price, category) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.price=price
        this.category = category
        this.likes = [];
        this.comments = [];
    }
}

export default Product