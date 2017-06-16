class CategoryController {
    constructor($timeout) {
        this.some = "some text";
        this.mode = 0;

        console.log(this);
    }

    modeCover() {
        this.mode = 0;
    }
    modePreview() {
        this.mode = 1;
    }
    modeOpen() {
        this.mode = 2;
    }
}

CategoryController.$inject = ['$timeout'];

export default CategoryController;