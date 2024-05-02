sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/FilterOperator',
		'sap/ui/model/Sorter',
		'sap/ui/model/json/JSONModel',
    	'sap/ui/core/Fragment',
		'sap/m/MessageToast',
		'sap/m/MenuItem'
	], function(Controller, Filter, FilterOperator, Sorter, JSONModel, MessageToast, MenuItem) {
	"use strict";

	var OverflowToolbarController = Controller.extend("sap.m.sample.OverflowToolbarFooter.controller.Products", {

		onInit : function (evt) {
			var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));
			this.getView().setModel(oModel);

			this.bGrouped = false;
			this.bDescending = false;
			this.sSearchQuery = 0;
		},


		_fnGroup : function (oContext){
			var sUserID = oContext.getProperty("title");

			return {
				key : sUserID,
				text : sUserID
			};
		},


		onFilter: function (oEvent) {
			this.sSearchQuery = oEvent.getSource().getValue();
			this.fnApplyFiltersAndOrdering();
		},


		fnApplyFiltersAndOrdering: function (oEvent){
			var aFilters = [],
				aSorters = [];

			if (this.bGrouped) {
				aSorters.push(new Sorter("ID", this.bDescending, this._fnGroup));
			} else {
				aSorters.push(new Sorter("userId", this.bDescending));
			}

			if (this.sSearchQuery) {
				var oFilter = new Filter("title", FilterOperator.Contains, this.sSearchQuery);
				aFilters.push(oFilter);
			}

			this.byId("idProductsTable").getBinding("items").filter(aFilters).sort(aSorters);
		},


		//function to change completed value
		alternarValor: function(oEvent) {
			// Obtém o item de linha em que o evento de pressão ocorreu
			var oItem = oEvent.getSource().getBindingContext().getObject();

			// Obtém o valor atual
			var valorAtual = oItem.valor;

			// Alterna entre true e false
			var novoValor = !valorAtual;

			// Define o novo valor
			oItem.valor = novoValor;

			// Se você não precisar atualizar o modelo, basta definir o novo valor
			oEvent.getSource().setText(novoValor);
		},

		abrirCard: function(oEvent) {

			var item = oEvent.getSource();
			this.getOwnerComponent().getRouter().navTo("details", {id: item.getBindingContext().getObject().id, product: item.getBindingContext().getObject()}, true);
		},

		fecharCard: function() {
			// Feche o card
			this._oDialog.close();
		}

	});

	return OverflowToolbarController;

});