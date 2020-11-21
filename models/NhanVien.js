// Khai báo lớp đối tượng trong js (class-prototype)


var NhanVien = function () {
    this.maNV = '';
    this.tenNV = '';
    this.luongCoBan = '';
    this.heSoLuong = '';
    this.gioLam = '';

    this.tongLuong = function () {
        var luong = this.luongCoBan * this.heSoLuong;
        return luong;
    }

    this.xepLoai = function () {
        var loai;
        if (isNaN(this.gioLam)) {
            loai = 'không xác định';
            return loai;
        }
        if (this.gioLam >= 120) {
            loai = 'nhân viên xuất sắc';
        } else if (this.gioLam >= 100) {
            loai = 'nhân viên giỏi';
        } else if (this.gioLam >= 80) {
            loai = 'nhân viên khá';
        } else if (this.gioLam >= 50) {
            loai = 'nhân viên trung bình'
        } else {
            loai = 'nhân viên yếu kém';
        }
        return loai;
    }

    // this.xetChucVu = function () {
    //     const optionArr = document.querySelector('#chucVu').options;
    //     const optionIndex = document.querySelector('#chucVu').selectedIndex;
    //     return optionArr[optionIndex].innerHTML;
    // }
}