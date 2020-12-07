var DanhSachNhanVien = new CongTy();

//get: lấy danh sách sinh viên bằng api
var loadDuLieuNhanVien = function () {
    DanhSachNhanVien.layDanhSachNhanVien().then(
        function (result) {
            console.log(result.data);
            renderTableNhanVien(result.data);
            console.log('oke hết r');
        }
    ).catch(
        function (err) {
            console.log(err.data);
        }
    );
}

var renderTableNhanVien = function (arrNhanVien) {
    var noiDung = '';
    for (let i in arrNhanVien) {
        var nv = new NhanVien();
        nv.maNhanVien = arrNhanVien[i].maNhanVien;
        nv.tenNhanVien = arrNhanVien[i].tenNhanVien;
        nv.chucVu = arrNhanVien[i].chucVu;
        nv.luongCoBan = arrNhanVien[i].luongCoBan;
        nv.heSoChucVu = arrNhanVien[i].heSoChucVu;
        nv.soGioLamTrongThang = arrNhanVien[i].soGioLamTrongThang;
        noiDung += `
                <tr>
                    <td>${nv.maNhanVien}</td>
                    <td>${nv.tenNhanVien}</td>
                    <td>${nv.chucVu}</td>
                    <td>${nv.luongCoBan}</td>
                    <td>${nv.tongLuong()}</td>
                    <td>${nv.soGioLamTrongThang}</td>
                    <td>${nv.xepLoai()}</td>
                    <td>
                        <button type="button" class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')" >Xóa</button>
                    </td>
                    <td>
                        <button type="button" class="disabled btn btn-success" onclick="getNhanvien('${nv.maNhanVien}')" >Chỉnh sửa</button>
                    </td>
                </tr>       
            `
    }
    document.querySelector('#tableNhanVien').innerHTML = noiDung;
    arrNhanVien.sort((a, b) => a.maNhanVien - b.maNhanVien);
}

loadDuLieuNhanVien();

//thêm nhâm viên

document.querySelector('#btnXacNhan').onclick = function () {
    // b1: khởi tạo đối tượng lưu trữ thông tin
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    parseFloat(nv.luongCoBan);
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    parseFloat(nv.soGioLamTrongThang);


    // xét chức vụ
    nv.chucVu = document.querySelector('#chucVu').options[document.querySelector('#chucVu').selectedIndex].innerHTML;

    //kiểm tra
    var validate = new Validation();
    var valid = true;
    //kiểm tra rỗng
    valid &= validate.kiemTraRong(nv.maNhanVien, 'Mã nhân viên', '#kiemTraRong-maNhanVien') & validate.kiemTraRong(nv.tenNhanVien, 'Tên nhân viên', '#kiemTraRong-tenNhanVien') & validate.kiemTraRong(nv.luongCoBan, 'Lương căn bản', '#kiemTraRong-luongCoBan') & validate.kiemTraRong(nv.soGioLamTrongThang, 'Số giờ làm trong tháng', '#kiemTraRong-soGioLamTrongThang');


    //kiểm tra ký tự
    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên nhân viên', '#kiemTraDinhDang-tenNhanVien');

    //kiểm tra tất cả là số
    valid &= validate.kiemTraSo(nv.maNhanVien, 'Mã nhân viên', '#kiemTraDinhDang-maNhanVien') & validate.kiemTraSo(nv.luongCoBan, 'Lương căn bản', '#kiemTraDinhDang-luongCoBan') & validate.kiemTraSo(nv.soGioLamTrongThang, 'Số giờ làm trong tháng', '#kiemTraDinhDang-soGioLamTrongThang');

    //kiểm tra giá trị
    valid &= validate.kiemTraGiaTri(nv.maNhanVien.length, 'Mã nhân viên', '#kiemTraGiaTri-maNhanVien', 4, 6) & validate.kiemTraGiaTri(nv.luongCoBan, "Lương căn bản", '#kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.soGioLamTrongThang, 'Số giờ làm trong tháng', '#kiemTraGiaTri-soGioLamTrongThang', 50, 150);

    if (!valid) {
        return;
    }

    console.log('nhân viên', nv);
    // xuất
    DanhSachNhanVien.themNhanVien(nv)
        .then(function (result) { loadDuLieuNhanVien(); })
        .catch(function (err) { console.log(err.data); });
}

//xóa nhân viên
var xoaNhanVien = function (maNhanVien) {
    DanhSachNhanVien.xoaNhanVien(maNhanVien).then(function (result) {
        loadDuLieuNhanVien();
    }).catch(function (err) {
        console.log(Error);
    })
}

//lấy thông tin nhân viên
var getNhanvien = function (maNhanVien) {
    DanhSachNhanVien.layThongTinNhanVien(maNhanVien).then(function (result) {
        console.log(result.data);
        var nv = result.data;
        nv.maNhanVien = document.querySelector('#maNhanVien').value = nv.maNhanVien;
        nv.tenNhanVien = document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        nv.luongCoBan = document.querySelector('#luongCoBan').value = nv.luongCoBan;
        nv.heSoChucVu = document.querySelector('#chucVu').value = nv.heSoChucVu;
        nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
    }).catch(function (err) {
        console.log(err.data);
    })
}

//cập nhật thông tin nhân viên
document.querySelector('#btnLuuThongTin').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    parseFloat(nv.luongCoBan);
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    parseFloat(nv.soGioLamTrongThang);
    nv.chucVu = document.querySelector('#chucVu').options[document.querySelector('#chucVu').selectedIndex].innerHTML;

    DanhSachNhanVien.capNhatThongTinNhanVien(nv).then(function (result) {
        loadDuLieuNhanVien();
    }).catch(function (err) {
        console.log(Error);
    })
}