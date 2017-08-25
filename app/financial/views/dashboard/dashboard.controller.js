import apiService from '../../resources/services/api';

window.randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    clearBlue: 'rgb(0, 203, 217)',
    clearYellow: 'rgb(255, 187, 68)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

function setupChart() {}

function updateChart(data, temporality) {
    if(!temporality) {
        return;
    }
    window.chartExpenses = null;
    var MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    var MONTH = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
    var WEEK = ["LUN", "MAR", "MIE", "JUE", 'VIE', 'SAB', 'DOM'];
    var LABELS = temporality == 1 ? WEEK : 
                    temporality == 2 ? MONTH : 
                        temporality == 3 ? MONTHS : WEEK;

    var config = {
        type: 'bar', //'line',
        data: {
            labels: LABELS,
            datasets: [{
                backgroundColor: window.chartColors.clearBlue,
                borderColor: window.chartColors.clearBlue,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title:{
                display:false,
                text:'Expenses'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                display: false
            },
            hover: {
                mode: 'nearest',
                intersect: true,
                display: false
            },
            scales: {
                xAxes: [{
                    stacked: false,
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Mes',
                    },
                    // colorName: window.chartColors.grey
                }],
                yAxes: [{
                    stacked: false,
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Expenses'
                    }
                }]
            }
        }
    };
    // window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    
    window.chartExpenses = new Chart(ctx, config);
}

class DashboardController {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.scope.config = null;
        this.scope.current = null;
        this.scope.data = {
            currency: null,
            categories: null,
            users: null,
            wallets: null,
            transactions: null
        };

        this.rootScope = $rootScope;
        this.rootScope.Menu = { 
            addTransactionScreen: false, 
            userMenuStatus: false  
        }
        this.temporality = [
            { id: 1, name: "Semana actual" },
            { id: 2, name: "Mensual" },
            { id: 3, name: "Anual" },
        ];
        this.transactionsFiltered = null;
        this.currentWalet = 1;
        this.getData();
    }

    // New functions
    getData(source) {
        if(source) {
                apiService.call("/data/" + source).then((data) => {
                if(data) {
                    this.scope.data[source] = data;
                    this.scope.$apply();
                }
            });
        } else {
            apiService.call("/data/currency").then((data) => {
                if(data) {
                    this.scope.data.currency = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/categories").then((data) => {
                if(data) {
                    this.scope.data.categories = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/users").then((data) => {
                if(data) {
                    this.scope.data.users = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/wallets").then((data) => {
                if(data) {
                    this.scope.data.wallets = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/config").then((data) => {
                if(data) {
                    this.scope.config = data;
                    this.scope.config.temporalityID = 1;
                    this.scope.$apply();
                }
            });

            apiService.call("/data/transactions").then((data) => {
                if(data) {
                    this.scope.data.transactions = data;
                    this.updateTransactions();
                    this.scope.$apply();
                }
            });
            
        }
    }

    updateDebug() {
        console.log('this.scope.data: ', this.scope.data);
        console.log('this.scope.config: ', this.scope.config);
        console.log('this.transactionsFiltered: ', this.transactionsFiltered);
    }

    updateTransactions() {
        if(this.scope.data.transactions) {
            var min = new Date();
            var max = new Date();
            
            var temporality = this.scope.config.temporalityID;
            if(temporality) {        
                var d = temporality == 1 ? 7 : 
                            temporality == 2 ? 30 : 
                                temporality == 3 ? 365 : 7;

                min.setDate(max.getDate() - d);
            }

            this.transactionsFiltered = this.scope.data.transactions.filter((item) => {
                return new Date(item.update) <= max && new Date(item.update) >= min;
            });

            this.transactionsFilteredTable = this.transactionsFiltered;

            this.getBalance();

            updateChart(this.transactionsFiltered, this.scope.config.temporalityID);
        } else {
            this.transactionsFiltered = null;
        }
    }

    getBalance() {
        this.rootBalance = 0;
        if(this.transactionsFiltered) {
            for(var i in this.transactionsFiltered) {
                this.rootBalance += this.transactionsFiltered[i].value;
            }
        }
        this.rootBalance = this.rootBalance.toFixed(2);
    }

    dateFormat(value) {
        var date = new Date(value);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
    }

    cutCharacters(text) {
        if(text && text.length >= 75) {
            var x = text.substring(0, 75);
            return x + "...";
        }
    }

    formatMoney(value) {
        if(value >= 1000) {
            var result = (value / 1000).toFixed(1);
            return result + "k";
        }
    }

    closeTransactionScreen() {
        this.rootScope.Menu.addTransactionScreen = false;
        this.rootScope.Menu.lookPrincipal = false;
    }
}

DashboardController.$inject = ['$timeout', '$scope', '$rootScope'];

export default DashboardController;