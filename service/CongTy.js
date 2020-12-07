var CongTy = function () {
    this.layDanhSachNhanVien = function () {
        return axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
            method: 'GET',
        });
    }

    this.layThongTinNhanVien = (maNV) =>
        axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNV,
            method: 'GET',
        });

    this.capNhatThongTinNhanVien = (nv) =>
        axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=' + nv.maNhanVien,
            method: 'PUT',
            data: nv,
        });
    this.themNhanVien = (nv) =>
        axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',
            data: nv,
        });
    this.xoaNhanVien = (maNV) =>
        axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNV,
            method: 'DELETE',
        });
}