import { useState, useEffect, React, componentDidMount } from 'react';
import { Redirect } from 'react-router';
import EditItemList from './EditItemList';
import { useParams } from 'react-router';
import Loading from '../Loading';

export default function AddItem({user}) {



    const [isLoaded, setIsLoaded] = useState(false);
    //Kirjan päivittämiseen 
    const [books, setBooks] = useState([]);
    const[updateCategories, setUpdateCategories] = useState([]);
    const categories = [];
    
    
    const params = useParams();
    const id = params.id;
    const URL = 'http://localhost/kirjakauppa/';

    //Kirjan lisäämiseen
    const [allPublishers, setAllPublishers] = useState([]);
    const [allBookCategories, setAllCategories] = useState([]);
    const [publisher, setPublisher] = useState('publisher');
    const [bookName, setBookName] = useState(''); 
    const [bookWriterFN, setBookWriterFN] = useState(''); 
    const [bookWriterLN, setBookWriterLN] = useState(''); 
    const [bookPage, setBookPage] = useState(''); 
    const [bookPrice, setBookPrice] = useState(''); 
    const [bookExpense, setBookExpense] = useState(''); 
    const [bookDesc, setBookDesc] = useState(''); 
    const [bookPublished, setBookPublished] = useState(''); 
    const [bookCategory, setBookCategory] = useState('');
    const [bookCategory2, setBookCategory2] = useState('');
    const [bookCategory3, setBookCategory3] = useState('');
    const [bookCategory4, setBookCategory4] = useState('');
    const [image, setImage] = useState(null);

    //Julkaisijan lisääminen 
    const[newPublisher, setNewPublisher] = useState('');
    const[newPublisherPhone, setNewPublisherPhone] = useState('');
    const[newPublisherEmail, setNewPublisherEmail] = useState('');
    const [showPublisher, setShowPublisher] = useState(true);

    //Julkaisulistan päivittäminen 
    const [submit, setSubmit] = useState(false);

    //Kategorian lisääminen 
    const [newCategory, setNewCategory] = useState('');
    const [showCategory, setShowCategory] = useState(true);

    //Tallennusteksti
    const [saved, setSaved] = useState('');
    const [savedPublisher, setSavedPublisher] = useState('');
    const [savedCategory, setSavedCategory] = useState('');



    function updateFields() {
        {books.map(book => ( 
            setBookName(book.kirjaNimi),
            setPublisher(book.julkaisija),
            setBookWriterFN(book.etunimi),
            setBookWriterLN(book.sukunimi),
            setBookPage(book.sivuNro),
            setBookPrice(book.hinta),
            setBookExpense(book.kustannus),
            setBookDesc(book.kuvaus),
            setBookPublished(book.pvmJulkaistu)
        ))}
        {updateCategories.map(category => (
            categories.push(category.kategoria)
        ))}
        if (categories[0] != undefined) {
        setBookCategory(categories[0]);
        }
        if (categories[1] != undefined) {
        setBookCategory2(categories[1]);
        }
        if (categories[2] != undefined) {
        setBookCategory3(categories[2]);
        }
        if (categories[3] != undefined) {
        setBookCategory4(categories[3]);
        }
    }
    useEffect(() => {
        let status = 0;

        fetch(URL + "julkaisijatLisaaTuote.php")
        .then (res => {
        status = parseInt(res.status);
        return res.json();
        })
        .then(
        (res) => {
    
            if(status === 200) {
        setAllPublishers(res);
        } else {
            alert(res.error);
        }
    
        }, (error) => {
        alert("Virhe on tapahtunut, yritä uudelleen myöhemmin.");
        }
        )
    }, [submit])

    useEffect(() => {
        let status = 0;
        fetch(URL + "kategoriatLisaaTuote.php")
        .then (res => {
        status = parseInt(res.status);
        return res.json();
        })
        .then(
        (res) => {
    
            if(status === 200) {
        setAllCategories(res);
        } else {
            alert(res.error);
        }
    
        }, (error) => {
        alert("Virhe on tapahtunut, yritä uudelleen myöhemmin.");
        }
        )
    }, [submit])

    useEffect(() => {
        let status = 0;
        fetch(URL + "haeKirjaNro.php/" + id)
        .then (res => {
        status = parseInt(res.status);
        return res.json();
        })
        .then(
        (res) => {
            if(status === 200) {
            setBooks(res);
        } else {
            alert(res.error);
        }
    
        }, (error) => {
        alert("Virhe on tapahtunut, yritä uudelleen myöhemmin.");
        }
        )
        
    }, [submit])

    useEffect(() => {
        let status = 0;
        fetch(URL + "haeKirjanKategoriat.php/" + id)
        .then (res => {
        status = parseInt(res.status);
        return res.json();
        })
        .then(
        (res) => {
    
            if(status === 200) {
            setUpdateCategories(res);
            setIsLoaded(true);
        } else {
            alert(res.error);
        }
    
        }, (error) => {
        alert("Virhe on tapahtunut, yritä uudelleen myöhemmin.");
        }
        )
    }, [submit])

    useEffect(() => {
        updateFields();
    }, [isLoaded, books])

    function handleChange(e) {
        setImage(e.target.files[0]);
      }

    function updateBook(e) {
        //Tiedoston lisäys 
        e.preventDefault();
        const formData = new FormData();
        if (image != undefined) {
            formData.append('file',image);
        }
        formData.append('bookNo', id);
        formData.append('bookName',bookName);
        formData.append('bookDesc',bookDesc);
        formData.append('bookPrice',bookPrice);
        formData.append('bookExpense',bookExpense);
        formData.append('bookPage', bookPage);
        formData.append('publisher',publisher);
        formData.append('bookPublished',bookPublished);
        formData.append('bookWriterFN',bookWriterFN);
        formData.append('bookWriterLN',bookWriterLN);
        formData.append('bookCategory',bookCategory);
        formData.append('bookCategory2',bookCategory2);
        formData.append('bookCategory3',bookCategory3);
        formData.append('bookCategory4',bookCategory4);
        fetch (URL + 'kirjanMuokkaus.php',
            {
            method: 'POST',
            body: formData 
            }
        )
        .then((res) => {
        if(bookName !== '' && bookDesc !== '' && bookPrice !== '' && bookExpense !== '' && bookPage !== '' && publisher !== '' && bookPublished !== '' && bookWriterFN
        !== '' && bookWriterLN !== '' && bookCategory !== '') {
        setSaved("Tiedot tallennettu!");
        setBookName('');
        setBookDesc('');
        setBookPrice('');
        setBookExpense('');
        setBookPage('');
        setPublisher('');
        setBookPublished('');
        setBookWriterFN('');
        setBookWriterLN('');
        setBookCategory('');
        setBookCategory2('');
        setBookCategory3('');
        setBookCategory4('');
        }
        })
    }

    function addPublisher(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('publisher',newPublisher);
        formData.append('phonenumber',newPublisherPhone);
        formData.append('email',newPublisherEmail);

        fetch (URL + 'lisaaJulkaisija.php',
            {
            method: 'POST',
            body: formData 
            }
        )
        .then((res) => {
            if (newPublisher !== '' && newPublisherPhone !== '' && newPublisherEmail !== '') {
            setSavedPublisher("Tiedot tallennettu!");
            setNewPublisher('');
            setNewPublisherPhone('');
            setNewPublisherEmail('');
            setSubmit(!submit);
            }
        })
        
    }

    function addCategory(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category',newCategory);

        fetch (URL + 'lisaaKategoria.php',
            {
            method: 'POST',
            body: formData 
            }
        )
        .then((res) => {
        if (newCategory !== '') {
        setSavedCategory("Tiedot tallennettu!");
        setNewCategory('');
        setSubmit(!submit);
        }
        })
    }

    function toggleClass(classToShow) {
        if (classToShow === "publisher") {
            setShowPublisher(!showPublisher);
            setSaved('');
        } else {
            setShowCategory(!showCategory);
            setSaved('');
        }
    }

 

    if (!isLoaded) {
        return <Loading />
     }
     else {
    return (
        <>
        <div className="addItemContainer">
            <h3>Muokkaa tuotetta:</h3>
            <form className="row g-3 addItemForm mt-1" onSubmit={updateBook}>
                <div className="col-md-6">
                    <label htmlFor="kirjaNimi" className="form-label">Kirjan nimi</label>
                    <input type="text" className="form-control" id="kirjaNimi" name="kirjanimi" value={bookName} placeholder="Kirjan nimi" required onChange={e => setBookName(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="julkaisija" className="form-label">Julkaisija
                    <button type="button" className="btn btn-secondary py-0 px-1 mx-1" onClick={() => toggleClass("publisher")}>{showPublisher ? "Lisää uusi" : "Piilota"}</button>
                    </label>
                    <select id="julkaisija" className="form-select" value={publisher} required onChange={e => setPublisher(e.target.value)}>
                    <option>Valitse...</option>
                    {allPublishers.map(publisher => (
                        <option key={publisher.julkaisijaNro}>{publisher.julkaisija}</option>
                    ))}
                    </select>
                    
                </div>

            {/* Uuden julkaisijan lisäämisen lomake */}
            <section className={"row p-4 publisherContainer m-1" + `section ${showPublisher ? "hidden" : ""}`}>
                <div className="col-md-4">
                    <label htmlFor="julkaisijaNimi" className="form-label">Julkaisijan nimi</label>
                    <input type="text" className="form-control" id="julkaisijaNimi" name="julkaisijaNimi" value={newPublisher} placeholder="Julkaisijan nimi" onChange={e => setNewPublisher(e.target.value)}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="julkaisijaNimi" className="form-label">Puhelinnumero</label>
                    <input type="text" className="form-control" id="puhnro" name="puhnro" value={newPublisherPhone} placeholder="044.." onChange={e => setNewPublisherPhone(e.target.value)}/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="julkaisijaNimi" className="form-label">Sähköposti</label>
                    <input type="text" className="form-control" id="sposti" name="sposti" value={newPublisherEmail} placeholder="Esimerkki@sposti.com" onChange={e => setNewPublisherEmail(e.target.value)}/>
                </div>
                <div className="col-md-3 mt-1">
                   <button onClick={addPublisher} className="btn btn-info" type="button">Lisää julkaisija</button>
                </div>
                <div className="col-12 text-muted m-0 p-0 ps-2">
                        <p>{savedPublisher}</p>
                </div>
            </section>

                <div className="col-md-3">
                    <label htmlFor="kirjoittajaEN" className="form-label">Kirjoittaja etunimi</label>
                    <input type="text" className="form-control" id="kirjoittajaEN" name="kirjoittajaEN" required value={bookWriterFN} placeholder="Eero" onChange={e => setBookWriterFN(e.target.value)}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="kirjoittajaSN" className="form-label">Kirjoittaja sukunimi</label>
                    <input type="text" className="form-control" id="kirjoittajaSN" name="kirjoittajaSN" required value={bookWriterLN} placeholder="Esimerkki" onChange={e => setBookWriterLN(e.target.value)}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="sivuNro" className="form-label">Sivumäärä</label>
                    <input type="number" className="form-control" min="1" id="sivuNro" name="sivuNro" required value={bookPage} placeholder="Esim: 150" onChange={e => setBookPage(e.target.value)}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="hinta" className="form-label">Hinta</label>
                    <input type="number" className="form-control" id="hinta" step=".01" presicion={2}  placeholder="Esim: 12.50" required value={bookPrice} onChange={e => setBookPrice(e.target.value)}/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="kustannus" className="form-label">Kustannus</label>
                    <input type="number" className="form-control" id="kustannus" step=".01" presicion={2}  placeholder="Esim: 11.50" required value={bookExpense} onChange={e => setBookExpense(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="kuvaus" className="form-label">Kuvaus</label>
                    <textarea name="kuvaus" id="kuvaus" cols="10" rows="10" className="form-control" required placeholder="Kirjan kuvaus" value={bookDesc} onChange={e => setBookDesc(e.target.value)}>
                    </textarea>
                </div>
                <div className="col-md-3">
                    <label htmlFor="julkaistu" className="form-label">Julkaistu</label>
                    <input type="date" className="form-control" id="julkaistu" value={bookPublished}  required onChange={e => setBookPublished(e.target.value)}/>
                </div>

                <div className="col-md-5">
                    <label htmlFor="kategoria" className="form-label">Kategoriat 
                    <button type="button" className="btn btn-secondary py-0 px-1 mx-1" onClick={() => toggleClass("category")}>{showCategory ? "Lisää uusi" : "Piilota"}</button>
                    </label>


                    <select id="kategoria" className="form-select mb-1" required value={bookCategory} onChange={e => setBookCategory(e.target.value)}>
                    <option value="">Valitse yksi tai useampi...</option>
                    {allBookCategories.map(bookCategory1 => (
                        <option key={bookCategory1.kategoria}>{bookCategory1.kategoria}</option>
                    ))}
                    </select>
                    <select id="kategoria2" className="form-select mb-1" value={bookCategory2} onChange={e => setBookCategory2(e.target.value)}>
                    <option value="">Valitse yksi tai useampi...</option>
                    {allBookCategories.map(bookCategory2 => (
                        <option key={bookCategory2.kategoria}>{bookCategory2.kategoria}</option>
                    ))}
                    </select>
                    <select id="kategoria3" className="form-select mb-1" value={bookCategory3} onChange={e => setBookCategory3(e.target.value)}>
                    <option value="">Valitse yksi tai useampi...</option>
                    {allBookCategories.map(bookCategory3 => (
                        <option key={bookCategory3.kategoria}>{bookCategory3.kategoria}</option>
                    ))}
                    </select>
                    <select id="kategoria4" className="form-select" value={bookCategory4} onChange={e => setBookCategory4(e.target.value)}>
                    <option value="">Valitse yksi tai useampi...</option>
                    {allBookCategories.map(bookCategory4 => (
                        <option key={bookCategory4.kategoria}>{bookCategory4.kategoria}</option>
                    ))}
                    </select>
                    

                </div>

                <div className="col-md-4">
                    <label htmlFor="tiedosto" className="form-label">Muuta kuvaa</label>
                    <input className="form-control text-end" type="file" name="file" id="file" onChange={handleChange}/>
                    <p>Suositeltu kuvakoko on 600x900px eli 2 suhde 3</p>
                </div>

                {/* Uusi kategoria */}
                <section className={"row p-2 publisherContainer m-1" + `section ${showCategory ? 'hidden' : ""}`}>
                    <div className="col-md-4">
                        {/* //Eipä tuota input kenttää muuten saa keskelle.  */}
                    </div>
                    <div className="col-md-4 text-center" >
                        <label htmlFor="julkaisijaNimi" className="form-label">Kategorian nimi</label>
                        <input type="text" className="form-control" id="kategoriaNimi" name="kategoriaNimi" value={newCategory} placeholder="Kategorian nimi" onChange={e => setNewCategory(e.target.value)}/>
                        <button onClick={addCategory} className="btn btn-info my-1" type="button">Lisää kategoria</button>
                    </div>
                    <div className="col-12 text-muted m-0 p-0 ps-2">
                        <p>{savedCategory}</p>
                    </div>
                </section>

                <div className="col-12 p-2">
                    <button type="submit" className="btn btn-primary">Tallenna muutokset</button>
                </div>

                <div className="col-12 text-muted m-0 p-0">
                        <p>{saved}</p>
                </div>
                </form>
                
        </div>
    </>
    )
}
}
