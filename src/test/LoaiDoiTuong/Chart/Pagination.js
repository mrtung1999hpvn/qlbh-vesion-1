import React,{useState} from 'react'

function Pagination({dataChart,_OnClick}) {
    const [OnDisabled,SetOnDisable] = useState({
        OnPre:true,
        onNext:false
    })
    const [OnPage,SetOnPage] = useState({
        Page : 1,
        ToTalPage : Math.ceil(dataChart.length/6)
    })
    const PrePage = ()=>{
        OnPage.ToTalPage = Math.ceil(dataChart.length/6)
        _OnClick({
            Page : OnPage.Page-1,
            ToTalPage : Math.ceil(dataChart.length/6)
        })
        SetOnPage({
            Page : OnPage.Page-1,
            ToTalPage : Math.ceil(dataChart.length/6)
        })
        if(OnPage.Page > 2)
        {
            SetOnDisable({
                OnPre:false,
                onNext:false
            })
            console.log(Math.ceil(dataChart.length/6))
            
        }
        else{
            SetOnDisable({
                OnPre:true,
                onNext:false
            })
        }
        
    }
    const NextPage = ()=>{
        OnPage.ToTalPage = Math.ceil(dataChart.length/6)
        _OnClick({
            Page : OnPage.Page+1,
            ToTalPage : Math.ceil(dataChart.length/6)
        })
        SetOnPage({
            Page : OnPage.Page+1,
            ToTalPage : Math.ceil(dataChart.length/6)
        })
        if(OnPage.Page < OnPage.ToTalPage-1)
        {
            SetOnDisable({
                OnPre:false,
                onNext:false
            })
        }
        else{
            SetOnDisable({
                OnPre:false,
                onNext:true
            })
        }
    }
    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={PrePage} disabled={OnDisabled.OnPre}>{"<<"}</button>
                    <button className="btn btn-light">{OnPage.Page}</button>
                    <button className="btn btn-primary" onClick={NextPage} disabled={OnDisabled.onNext}>{">>"}</button>
                </div>
            </div>
        </>
    )
}

export default Pagination
