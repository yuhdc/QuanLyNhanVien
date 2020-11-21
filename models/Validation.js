var Validation = function () {
    //value: giá trị người dụng nhập từ input
    //selectorError: thẻ mà minhhf sẽ hiển thị lỗi
    //name: tên thuộc tính kiểm tra

    //kiểm tra rỗng
    this.kiemTraRong = function (value, name, selectorError) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống!';
            document.querySelector(selectorError).className = 'alert alert-danger';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).className = '';
        return true;
    }

    this.kiemTraTatCaKyTu = function (value, name, selectorError) {
        var regexLetter = /^[a-z A-Z]+$/;
        if (!regexLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' không đúng!';
            document.querySelector(selectorError).className = 'alert alert-primary';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).className = '';
        return true;
    }

    this.kiemTraEmail = function (value, name, selectorError) {
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng!';
            document.querySelector(selectorError).className = 'alert alert-secondary';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).className = '';
        return true;
    }

    this.kiemTraSo = function (value, name, selectorError) {
        var regexNumber = /^[0-9.]+$/;
        if (!regexNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' phải là số';
            document.querySelector(selectorError).className = 'alert alert-secondary';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).className = '';
        return true;

        // if (isNaN(value)) {
        //     document.querySelector(selectorError).innerHTML = name + ' phải là số';
        //     document.querySelector(selectorError).className = 'alert alert-secondary';
        //     return false;
        // }
        // document.querySelector(selectorError).innerHTML = '';
        // document.querySelector(selectorError).className = '';
        // return true;
    }

    this.kiemTraGiaTri = function (value, name, selectorError, minValue, maxValue) {
        if (Number(value) < minValue || Number(value) > maxValue) {
            document.querySelector(selectorError).innerHTML = name + ' từ ' + minValue + ' đến ' + maxValue;
            document.querySelector(selectorError).className = 'alert alert-success';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).className = '';
        return true;
    }
}