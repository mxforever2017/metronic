

define(function (require) {

    var toastr = require('jp/toastr');

    toastr.options.positionClass = 'toast-top-full-width';
    toastr.options.backgroundpositionClass = 'toast-top-full-width';

    return toastr;
});

