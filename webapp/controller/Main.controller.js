sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/format/ChartFormatter",
	"sap/viz/ui5/api/env/Format"
], function (Controller, JSONModel, ChartFormatter, Format) {
	"use strict";

	return Controller.extend("jorgcalleja.dice.statistics.Dice_Statistics_sample.controller.Main", {
		onInit : function() {

// if SAPUI5 < 1.32.11 ...
//SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) { return elem.getScreenCTM().inverse().multiply(this.getScreenCTM()); }; 		

			var oData = { "Dice" : [
				{ "value" : "2", "prob"  : "2.7", "probAc" : "100" },
				{ "value" : "3", "prob"  : "5.5", "probAc" : "97.2" },
				{ "value" : "4", "prob"  : "8.3", "probAc" : "91.7" },
				{ "value" : "5", "prob"  : "11.1", "probAc" : "83.3" },
				{ "value" : "6", "prob"  : "13.9", "probAc" : "72.2" },
				{ "value" : "7", "prob"  : "16.7", "probAc" : "58.3" },
				{ "value" : "8", "prob"  : "13.9", "probAc" : "41.7" },
				{ "value" : "9", "prob"  : "11.1", "probAc" : "27.8" },
				{ "value" : "10", "prob"  : "8.3", "probAc" : "16.7" },
				{ "value" : "11", "prob"  : "5.5", "probAc" : "8.3" },
				{ "value" : "12", "prob"  : "2.7", "probAc" : "2.7" }
			] };
			this.getView().setModel(new JSONModel(oData));

			var oSelection = {
				"Section" : [ {"key" : "Selección", "value" : "" },
							  {"key" : "Total", "value" : "" }
							]
			};
			this.oInfo = new JSONModel(oSelection);
			this.getView().setModel(this.oInfo, "selection");
			
			this.oVizFrame = this.byId("idVizFrame");
			this.oVizFrame.setVizProperties( { 
				                        "title"       : { "text" : "2d6"} ,
				                        "tooltip"     : { "visible" : true},
    									"interaction" : { "behaviorType" : "null",
    													  "selectability" : { "mode" : "INCLUSIVE" }
    													  ,
    													  "decorations" : [{
    													  	"name" : "showDetail",
    													  	"fn" : this.showTooltip.bind(this)
    													  },
    													  {
    													  	"name" : "hideDetail",
    													  	"fn" : this.hideTooltip.bind(this)
    													  }]
    									}
			});
		},
		
		showTooltip : function(evt)  {
			var aDatos = this.oVizFrame.vizSelection();		// Recuperamos los puntos seleccionados

			// Generamos el contenido que van a tener los textos
			var sSeleccion = "";
			var nTotal = 0;
			for (var i in aDatos) {
				sSeleccion += aDatos[i].data.Resultado + "; ";
				nTotal += aDatos[i].data.Probabilidad;
			}
			
			// Asignamos las variables al modelo de datos... y de ahí se alimentan los Texts...
			this.oInfo.setProperty("/Section/0/value", sSeleccion);
			this.oInfo.setProperty("/Section/1/value", nTotal);
		},
		
		hideTooltip : function(evt) {
			// Borramos la selección actual
			this.oInfo.setProperty("/Section/0/value", "");
			this.oInfo.setProperty("/Section/1/value", "");
		}
	});
});

