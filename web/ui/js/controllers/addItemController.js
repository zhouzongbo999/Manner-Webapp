/**
 * Created by jiangy on 11/11/2014.
 */
TM.controller('SampleController', function($scope, ModalService) {

    ModalService.showModal({
        templateUrl: "partials/faq.html",
        controller: "ModalController"
    }).then(function (modal) {

        //it's a bootstrap element, use 'modal' to show it
        modal.element.modal();
        modal.close.then(function (result) {
            console.log(result);
        });
    });

});

TM.controller('ModalController', function($scope, close) {

    // when you need to close the modal, call close
    close("Success!");
});