import apiService from '../../resources/services/api';



class HomeController {
    constructor($timeout, $scope) {
        this.scope = $scope;
        this.user = null;
        this.wallet = null;
        this.currency = null;
        this.types = null;
        this.transactions = null;
        this.transactionsFiltered = [];
        this.currentTemporality = 1;

        this.getDummyData();
        this.applyFilter();
    }

    getTypes() {
        apiService.call('types', 'GET', null).then((data) => {
            console.log("data: ", data);
        })
    }

    getDummyData() {
        this.temporality = [
            { name:'semanal', value:'1' }, 
            { name:'mensual', value:'2' },
            { name:'anual', value:'3' }
        ]
        this.user = {
            id: 1,
            username: "developer", 
            password: "password", 
            givenname: "givenname", 
            middlename: "middlename", 
            familyname: "familyname", 
            email: "email@live.com.mx", 
            gender: "M", 
            birthdate: "01-01-1988"
        }

        this.wallet = [
            {
                id: 1,
                name: "default", 
                balance: 0, 
                idcurrency: 1, 
                iduser: 1
            }
        ]

        this.currency = [
            { id: 1, name: 'Pesos', symbol: 'MXN', prefix: "$" },
            { id: 2, name: 'Dollars', symbol: 'USD', prefix: "$" }
        ]

        this.types = [
            { id: 1, name: "deuda", icon: "icon", isentry: 0 },
            { id: 2, name: "salario", icon: "icon", isentry: 1 },
            { id: 3, name: "gasto 1", icon: "icon", isentry: 0 },
        ]
        

        this.transactions = [
            { id: 1, description: "description 1", value: 514.52, update: "2017-07-01T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 2, description: "description 1", value: 554.52, update: "2017-07-02T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 3, description: "description 1", value: 785.52, update: "2017-07-04T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 4, description: "description 1", value: 114.52, update: "2017-07-05T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 5, description: "description 1", value: 614.52, update: "2017-07-07T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 6, description: "description 1", value: 514.52, update: "2017-07-08T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 7, description: "description 1", value: 314.52, update: "2017-07-09T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 8, description: "description 1", value: 588.52, update: "2017-07-10T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 9, description: "description 1", value: 93.52, update: "2017-07-11T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 10, description: "description 1", value: 121.52, update: "2017-07-12T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 11, description: "description 1", value: 3232.52, update: "2017-07-13T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 12, description: "description 1", value: 2312.52, update: "2017-07-14T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 13, description: "description 1", value: 212.52, update: "2017-07-15T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 14, description: "description 1", value: 340.52, update: "2017-07-16T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 15, description: "description 1", value: 769.52, update: "2017-07-17T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 16, description: "description 1", value: 324.52, update: "2017-07-21T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 17, description: "description 1", value: 34.99, update: "2017-07-22T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 18, description: "description 1", value: 768.23, update: "2017-07-23T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 19, description: "description 1", value: 54.65, update: "2017-07-24T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 20, description: "description 1", value: 12.1, update: "2017-07-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 21, description: "description 1", value: 514.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 22, description: "description 1", value: 554.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 23, description: "description 1", value: 785.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 24, description: "description 1", value: 114.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 25, description: "description 1", value: 614.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 26, description: "description 1", value: 514.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 27, description: "description 1", value: 314.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 28, description: "description 1", value: 588.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 29, description: "description 1", value: 93.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 30, description: "description 1", value: 121.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 31, description: "description 1", value: 3232.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 32, description: "description 1", value: 2312.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 33, description: "description 1", value: 212.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 34, description: "description 1", value: 340.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 35, description: "description 1", value: 769.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 36, description: "description 1", value: 324.52, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 37, description: "description 1", value: 34.99, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 38, description: "description 1", value: 768.23, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 39, description: "description 1", value: 54.65, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false },
            { id: 40, description: "description 1", value: 12.1, update: "2017-06-25T00:00:00.000Z", idcurrency: 1, idwallet: 1, idtype: 1, idplan: null, isbudget: false }
        ]

        
    }

    applyFilter(temporalityCustom) {
        var min = new Date();
        var max = new Date();
        var temporality = temporalityCustom || this.currentTemporality;
        if(temporality) {        
            var d = temporality == 1 ? 7 : 
                        temporality == 2 ? 30 : 
                            temporality == 3 ? 365 : 7;

            min.setDate(max.getDate() - d);
        }
        
        this.transactionsFiltered = this.transactions.filter((item) => {
           return new Date(item.update) <= max && new Date(item.update) >= min;
        });
        console.log('this.transactionsFiltered: ', this.transactionsFiltered);
    }

    updateTemporality() {
        this.applyFilter(this.currentTemporality);
    }
}

HomeController.$inject = ['$timeout', '$scope'];

export default HomeController;