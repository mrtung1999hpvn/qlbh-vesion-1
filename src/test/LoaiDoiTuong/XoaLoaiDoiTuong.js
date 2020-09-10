import React , {useState,useEffect,useRef} from 'react'

import HOST from '../HOST'
import LoadDing from '../Load.js'
function XoaLoaiDoiTuong({todo,onSubmit}) {
    const [ma_loai_doi_tuong,Set_MaLDT] = useState(todo.ma_loai_doi_tuong)
    const [ten_loai_doi_tuong,SetTenDT] = useState(todo.ten_loai_doi_tuong)
    const [tien_bao_cong_no,SetTienCanhBaoNo] = useState(todo.tien_bao_cong_no)
    const [ghi_chu,SetGhiChu] = useState(todo.ghi_chu)
    const [_submit,Setsubmit] = useState(false)
    const typingTimeoutRef = useRef(null)
    const [Loader,ShowLoader,HideLoader] = LoadDing()
    const DeleteLoaiDoiTuong = async (id) =>{
        try {
            const body = {ma_loai_doi_tuong,ten_loai_doi_tuong,tien_bao_cong_no,ghi_chu}
            onSubmit(body)
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
            const response = await fetch(HOST.LoaiDoiTuong+`/${id}`,
            {
               method:"DELETE",
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
    <div>
  {/* Button trigger modal */}
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target={`#ldt${todo.ma_loai_doi_tuong}`}>
                Xóa
            </button>
            {/* Modal */}
            <div className="modal fade" id={`ldt${todo.ma_loai_doi_tuong}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Thông báo</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">
                            <span>Bạn muốn xóa {todo.ma_loai_doi_tuong} ?</span>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                    disabled={_submit}
                    onClick={() => DeleteLoaiDoiTuong(todo.ma_loai_doi_tuong)}>Xóa</button>
                    </div>
                </div>
                </div>
            </div>
            {Loader}
            </div>

    )
}

export default XoaLoaiDoiTuong
