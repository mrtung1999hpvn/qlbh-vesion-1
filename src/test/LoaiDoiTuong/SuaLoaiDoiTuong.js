import React , {useState,useEffect,useRef} from 'react'

import HOST from '../HOST'
import LoadDing from '../Load.js'
import HamXuLy from '../HamXuLy/HamXuLy'

function SuaLoaiDoiTuong({todo,OnSubmit}) {
    const [ma_loai_doi_tuong,Set_MaLDT] = useState(todo.ma_loai_doi_tuong)
    const [ten_loai_doi_tuong,SetTenDT] = useState(todo.ten_loai_doi_tuong)
    const [tien_bao_cong_no,SetTienCanhBaoNo] = useState(todo.tien_bao_cong_no)
    const [ghi_chu,SetGhiChu] = useState(todo.ghi_chu)
    const [_submit,Setsubmit] = useState(false)
    useEffect(()=>{
        Set_MaLDT(todo.ma_loai_doi_tuong)
        SetTenDT(todo.ten_loai_doi_tuong)
        SetTienCanhBaoNo(todo.tien_bao_cong_no)
        SetGhiChu(todo.ghi_chu)
    },[todo])
    const typingTimeoutRef = useRef(null)
    const [Loader,ShowLoader,HideLoader] = LoadDing()
    const EditLoaiDoiTuong = async (e) =>{
        e.preventDefault();
        try {
            var tien = HamXuLy.SoSangTien(tien_bao_cong_no)
            const body = {ma_loai_doi_tuong,ten_loai_doi_tuong,tien,ghi_chu}
            console.log(body)
            OnSubmit(body)
            Setsubmit(true)
            Setsubmit(false)
            ShowLoader()
            alert("Sửa thành công")
            if(typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current) 
            }
            typingTimeoutRef.current = setTimeout(()=>
              {
                
                HideLoader()
              },1000)
              var tien_ = HamXuLy.TienSangSo(tien_bao_cong_no)
              const body_ = {ma_loai_doi_tuong,ten_loai_doi_tuong,tien_,ghi_chu}
              const response = await fetch(HOST.LoaiDoiTuong+`/${todo.ma_loai_doi_tuong}`,
              {
                 method:"PUT",
                 headers:{"Content-Type":"application/json"},
                 body : JSON.stringify(body_)
              })
        } catch (error) {
            console.error(error.message)
        }
    }
    return (    
        <div>
            <div>
                {/* Button trigger modal */}
                <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.ma_loai_doi_tuong}`}>
                    Sửa
                </button>
                {/* Modal */}
                <div className="modal fade" id={`id${todo.ma_loai_doi_tuong}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">{todo.ma_loai_doi_tuong}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                        <div className="modal-body">
                                    <span className="">Tên đối tượng</span>
                                    <input type="text" className="form-control mb-3" value={ten_loai_doi_tuong} onChange={e => SetTenDT(e.target.value)}></input>
                                    <span className="">Tiền báo công nợ</span>
                                    <input type="text" className="form-control mb-3" value={HamXuLy.TienSangSo(tien_bao_cong_no)} onChange={e => SetTienCanhBaoNo(e.target.value)}></input>
                                    <small id="passwordHelpInline" className="text-black fa-1x">
                                        Số tiền : {HamXuLy.SoSangTien(HamXuLy.TienSangSo(tien_bao_cong_no))}
                                    </small>
                                    <br></br>
                                    <span className="">Ghi chú</span>
                                    <input type="text" className="form-control mb-3" value={ghi_chu} onChange={e => SetGhiChu(e.target.value)}></input>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Đóng</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal"
                        disabled={_submit}
                        onClick={
                            e => EditLoaiDoiTuong(e)
                        }>Lưu</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {Loader}
        </div>
    )
}

export default SuaLoaiDoiTuong
