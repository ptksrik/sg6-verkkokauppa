import React from 'react'
import BookCarousel from './Carousel'
import fpimage from './img/frontpgimg.jpg'

export default function Content() {

    return (
        <div className="row">
            <div>
                <div className="row py-5">
                    <div className="col-md-7 col-sm-12">
                        <h1 className="pb-3">Tervetuloa</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores, minus, ducimus animi voluptatibus fugiat, earum esse rem eveniet veritatis quia! Maxime suscipit ratione saepe sed dolor aperiam velit accusamus, earum optio excepturi facilis iste modi illum libero natus ipsam accusantium!
                    </div>
                    <div className="col-md-5 pb-3"><img src={fpimage} alt="shop" className="img-fluid fpimg d-none d-md-block"></img></div>
                </div>

                <div className="row pb-5 d-flex justify-content-center">
                    <h3 className="pb-4">Kategoriat</h3>
                    <button className="col-sm-2 m-2 btn categoryButton">Tietokirjallisuus</button>

                    <button className="col-sm-2 m-2 btn categoryButton">Toiminta</button>

                    <button className="col-sm-2 m-2 btn categoryButton">Sci-fi ja fantasia</button>

                    <button className="col-sm-2 m-2 btn categoryButton">Oppikirjat</button>
                    <button className="col-sm-2 m-2 btn categoryButton">Kauhu ja trilleri</button>
                </div>
                <h3>Kuukauden kirjat tms</h3>
                <div className="row" style={{border: "6px ridge #A4684A", borderRadius:"26px 14px 22px 0px", boxShadow:"5px 10px"}}>
                    <BookCarousel/>
                </div>
            </div>
        </div>
    )
}
