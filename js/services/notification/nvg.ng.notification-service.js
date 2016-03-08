/**
 * Created by B026789 on 14.12.2015.
 */
/*
(function () {
    'use strict';
    angular.module('myApp.ng.services').provider('notification', {
        defaultMessages: {},
        setDefaultMesaages: function (message) {
            this.defaultMessages = message;
        },

        $get: [function () {
            var messages = this.defaultMessages;

            function show(type, title, body) {
                if (type == 'error') {
                    toastr.error(body, title);
                } else if (type == 'warning') {
                    toastr.warning(body, title);
                } else if (type == 'success') {
                    toastr.success(body, title);
                } else {
                    toastr.info(body, title);
                }
            }

            return {
                show: function(type, title, body){
                    show(type, title, body);
                },
                showError: function(type, title, body){
                    show('error', title, body);
                },
                showWarning: function(type, title, body){
                    show('warning', title, body);
                },
                showSuccess: function(type, title, body){
                    show('success', title, body);
                },
                showSaveSuccess: function(type, title, body){
                    show('success', messages.saveSucess || 'Speicherung erfolgreich', body);
                },
                showDeleteSuccess: function(type, title, body){
                    show('success', messages.deleteSucess || 'Löschen erfolgreich', body);
                },
                showDefaultError: function(body){
                    show('success', messages.defaultError || 'Ein Feher ist aufgetreten', body);
                }
            };
        }]
    });

}());
    */