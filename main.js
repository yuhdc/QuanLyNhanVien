var validate = new Validation();
var mangNhanVien = [];

// cài đặt sự kiện
document.querySelector('#btnXacNhan').onclick = function () {
    // b1: khởi tạo đối tượng lưu trữ thông tin
    var nv = new NhanVien();
    nv.maNV = document.querySelector('#maNV').value;
    nv.tenNV = document.querySelector('#tenNV').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    parseFloat(nv.luongCoBan);
    nv.heSoLuong = document.querySelector('#chucVu').value;
    nv.gioLam = document.querySelector('#gioLam').value;
    parseFloat(nv.gioLam);


    // xét chức vụ
    nv.chucVu = document.querySelector('#chucVu').options[document.querySelector('#chucVu').selectedIndex].innerHTML;

    //kiểm tra
    var valid = true;
    //kiểm tra rỗng
    valid &= validate.kiemTraRong(nv.maNV, 'Mã nhân viên', '#kiemTraRong-maNhanVien') & validate.kiemTraRong(nv.tenNV, 'Tên nhân viên', '#kiemTraRong-tenNhanVien') & validate.kiemTraRong(nv.luongCoBan, 'Lương căn bản', '#kiemTraRong-luongCoBan') & validate.kiemTraRong(nv.gioLam, 'Số giờ làm trong tháng', '#kiemTraRong-gioLam');


    //kiểm tra ký tự
    valid &= validate.kiemTraTatCaKyTu(nv.tenNV, 'Tên nhân viên', '#kiemTraDinhDang-tenNhanVien');

    //kiểm tra tất cả là số
    valid &= validate.kiemTraSo(nv.maNV, 'Mã nhân viên', '#kiemTraDinhDang-maNhanVien') & validate.kiemTraSo(nv.luongCoBan, 'Lương căn bản', '#kiemTraDinhDang-luongCoBan') & validate.kiemTraSo(nv.gioLam, 'Số giờ làm trong tháng', '#kiemTraDinhDang-gioLam');

    //kiểm tra giá trị
    valid &= validate.kiemTraGiaTri(nv.maNV.length, 'Mã nhân viên', '#kiemTraGiaTri-maNhanVien', 4, 6) & validate.kiemTraGiaTri(nv.luongCoBan, "Lương căn bản", '#kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.gioLam, 'Số giờ làm trong tháng', '#kiemTraGiaTri-gioLam', 50, 150);

    if (!valid) {
        return;
    }
    // xuất
    mangNhanVien.push(nv);
    renderTableNhanVien(mangNhanVien);
    saveLocalStorage();
}

var renderTableNhanVien = function (arrNhanVien) {
    var noiDung = '';
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nv = new NhanVien();
        nv.maNV = arrNhanVien[i].maNV;
        nv.tenNV = arrNhanVien[i].tenNV;
        nv.chucVu = arrNhanVien[i].chucVu;
        nv.luongCoBan = arrNhanVien[i].luongCoBan;
        nv.heSoLuong = arrNhanVien[i].heSoLuong;
        nv.gioLam = arrNhanVien[i].gioLam;
        noiDung += `
            <tr>
                <td>${nv.maNV}</td>
                <td>${nv.tenNV}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tongLuong()}</td>
                <td>${nv.gioLam}</td>
                <td>${nv.xepLoai()}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="xoaNhanVien('${nv.maNV}')" >Xóa</button>
                </td>
                <td>
                    <button type="button" class="disabled btn btn-success" onclick="editNhanvien('${nv.maNV}')" >Chỉnh sửa</button>
                </td>
            </tr>       
        `
    }
    document.querySelector('#tableNhanVien').innerHTML = noiDung;
    mangNhanVien.sort((a, b) => a.maNV - b.maNV);
}
var editNhanvien = function (maNVien) {
    document.querySelector('#maNV').disabled = true;
    document.querySelector('#btnXacNhan').disabled = true;
    document.querySelector('#btnLuuThongTin').disabled = false;
    mangNhanVien.forEach(nv => {
        if (nv.maNV === maNVien) {
            document.querySelector('#maNV').value = nv.maNV;
            document.querySelector('#tenNV').value = nv.tenNV;
            document.querySelector('#luongCoBan').value = nv.luongCoBan;
            document.querySelector('#gioLam').value = nv.gioLam;
            document.querySelector('#chucVu').value = nv.heSoLuong;
            (document.querySelector('#chucVu').options)[document.querySelector('#chucVu').selectedIndex].innerHTML = nv.chucVu;
        }
    });
}

document.querySelector('#btnLuuThongTin').onclick = function () {
    //tạo nhân viên lưu trữ thông tin cập nhật
    var newNV = new NhanVien;
    newNV.tenNV = document.querySelector('#tenNV').value;
    newNV.luongCoBan = document.querySelector('#luongCoBan').value;
    newNV.gioLam = document.querySelector('#gioLam').value;
    newNV.heSoLuong = document.querySelector('#chucVu').value;
    newNV.chucVu = (document.querySelector('#chucVu').options)[document.querySelector('#chucVu').selectedIndex].innerHTML;

    for (let index = 0; index < mangNhanVien.length; index++) {
        const updateNV = mangNhanVien[index];
        //gán thông tin đã cập nhật cho nhân viên muốn sửa
        if (updateNV.maNV === document.querySelector('#maNV').value) {
            updateNV.tenNV = newNV.tenNV;
            updateNV.luongCoBan = newNV.luongCoBan;
            updateNV.gioLam = newNV.gioLam;
            updateNV.heSoLuong = newNV.heSoLuong;
            updateNV.chucVu = newNV.chucVu;
            //reset
            document.querySelector('#maNV').disabled = false;
            document.querySelector('#btnXacNhan').disabled = false;
            document.querySelector('#btnLuuThongTin').disabled = true;
            saveLocalStorage();
            renderTableNhanVien(mangNhanVien);
        }
    }
}

var xoaNhanVien = function (maNV) {
    for (let i = mangNhanVien.length - 1; i > -1; i--) {
        var nV = mangNhanVien[i];
        if (nV.maNV === maNV) {
            mangNhanVien.splice(i, 1);
        }
    }
    //gọi hàm tạo lại bảng truyền vào mảng sau xóa
    renderTableNhanVien(mangNhanVien);
}

var saveLocalStorage = function () {
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('Mang nhan vien', sMangNhanVien);
}

var getLocalStorage = function () {
    if (localStorage.getItem('Mang nhan vien')) {
        var sMangNhanVien = localStorage.getItem('Mang nhan vien');
        mangNhanVien = JSON.parse(sMangNhanVien);
        renderTableNhanVien(mangNhanVien);
    }
}

getLocalStorage();