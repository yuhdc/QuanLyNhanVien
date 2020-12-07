// Khai báo lớp đối tượng trong js (class-prototype)


var NhanVien = function () {
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.luongCoBan = '';
    this.heSoChucVu = '';
    this.soGioLamTrongThang = '';

    this.tongLuong = function () {
        var luong = this.luongCoBan * this.heSoChucVu;
        return luong;
    }

    this.xepLoai = function () {
        var loai;
        if (isNaN(this.soGioLamTrongThang)) {
            loai = 'không xác định';
            return loai;
        }
        if (this.soGioLamTrongThang >= 120) {
            loai = 'nhân viên xuất sắc';
        } else if (this.soGioLamTrongThang >= 100) {
            loai = 'nhân viên giỏi';
        } else if (this.soGioLamTrongThang >= 80) {
            loai = 'nhân viên khá';
        } else if (this.soGioLamTrongThang >= 50) {
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