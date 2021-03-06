import React from 'react'
import Maps from './Maps'

export default function Footer() {
    return (
        <footer>
            <section className="row">
                <div className="col-md-4 col-12 ">
                    <div className="footer_top pt-2 text-center fw-bold footer_top_section">
                        <p>Sijainti</p>
                    </div>
                        <p>Löydät myymälöitämme Kalajoelta Mäntyperäntieltä sekä Vierivainiontieltä!</p>
                        <p className="map_explanation text-muted"><i>Valitettavasti karttaa ei ole saatavilla puhelimen näytöille.</i></p>
                        <div className="map_container">
                        <Maps className="map"/>
                        </div>
                </div>
                <div className="col-md-4 col-12">
                    <div className="footer_top pt-2 text-center fw-bold footer_top_section">
                        <p>Somet</p>
                    </div>
                    <div className="container mt-5 mb-5 d-flex justify-content-center">
                        <ul className="social-list">
                            <li>
                                <div className="maincard">
                                    <div className="thecard">
                                        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/">
                                            <div className="thefront text-center facebook">
                                                <div className="social-icon"> <i className="fa fa-facebook fa-2x"></i> </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="maincard">
                                    <div className="thecard">
                                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com">
                                            <div className="thefront text-center instagram">
                                                <div className="social-icon"> <i className="fa fa-instagram fa-2x"></i> </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="maincard ">
                                    <div className="thecard">
                                        <a target="_blank" rel="noreferrer" href="https://www.youtube.com/">
                                            <div className="thefront text-center youtube">
                                                <div className="social-icon"> <i className="fa fa-youtube fa-2x"></i> </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4 col-12 text-center">
                    <div className="footer_top pt-2 text-center fw-bold footer_top_section">
                        <p>Yhteystiedot</p>
                    </div>

                    <div className="mb-4">
                    <p>Kalajoki, Mäntyperäntie 8, 6800</p>
                    <p> <i className="fa fa-phone-square" aria-hidden="true"></i> 
                        0440428562</p>
                    <p className="text-muted">Ma-Pe 09:00 - 19:00</p>
                    <p className="text-muted">La-Su 12:00 - 16:00</p>
                    </div>

                    <div>
                    <p>Kalajoki, Vierivainiontie 10, 85100</p>
                    <p><i className="fa fa-phone-square" aria-hidden="true"></i>
                        0449623267</p>
                    <p className="text-muted">Ma-Pe 09:00 - 19:00</p>
                    <p className="text-muted">La 10:00 - 18:00, Su 12:00 - 16:00</p>
                    </div>
                    
                </div>
            </section>
            <section className="row">
                <div className="col-12 copyright_footer">
                <p>Study Group 6 Copyright</p>
                </div>
            </section>
        </footer>

        
    )
}
