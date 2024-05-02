sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (Controller, History, UIComponent, JSONModel) {
    "use strict";

    var oModel = new JSONModel();
    var id = new JSONModel();
    return Controller.extend("sap.m.sample.OverflowToolbarFooter.controller.Details", {

        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("details").attachPatternMatched(this.onRouteMatched, this);
        },
        onToPage1: function () {
            this.getOwnerComponent().getRouter().navTo("products");
        },

        onBack: function () {
            var sPreviousHash = History.getInstance().getPreviousHash();

            //The history contains a previous entry
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                // There is no history!
                // replace the current hash with page 1 (will not add an history entry)
                this.getOwnerComponent().getRouter().navTo("products", null, true);
            }
        },

        onRouteMatched: function (oEvent) {
            id = oEvent.getParameter("arguments").id;
            oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));

            function encontrarObjetoPorId(id) {
                // Verifica se o modelo já foi carregado
                if (oModel && oModel.getData()) {
                    // Obtém os dados do modelo
                    var dados = oModel.getData().ProductCollection;

                    // Procura pelo objeto com o id especificado
                    for (var i = 0; i < dados.length; i++) {
                        if (dados[i].id == id) {
                            return dados[i]; // Retorna o objeto encontrado
                        }
                    }
                }

                return null; // Retorna null se não encontrar nenhum objeto com o id especificado
            }

            var obj = {};
            var product;
            oModel.attachRequestCompleted( ()=> {
                var obj = encontrarObjetoPorId(id);
                product = new JSONModel(obj);
            });

            setTimeout(()=>{
                this.getView().setModel(product, "data")
                this.getView().byId("id").setText(product.getData().id.toString());
                this.getView().byId("userId").setText(product.getData().userId.toString());
                this.getView().byId("title").setText(product.getData().title.toString());
                this.getView().byId("completed").setText(product.getData().completed.toString());
            }, 1000)



        }
    });

});
