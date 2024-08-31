import image from '../assets/foto.png'
function CardpageDetails(){
    return(
        <div className='cardpageDetailsContainer'>
            <div className='firstColumn'>
                <h1 className='cardpageDetailsText'>Scriverò ebook di saggistica come ghostwriter, scrittore di libri fantasma, scrittore di ebook</h1>
                <p>Annuncio di <a href=""><b>Pincopallo</b></a></p>
                <img src={image} alt="" />
                <h2>Descrizione dell'annuncio</h2><p>Da quando sono su Fiverr, ho scritto contenuti per oltre 150 clienti . Scrivo blog, contenuti di siti Web, eBook, materiale didattico e di coaching e altro.



Ho studiato copywriting e marketing biologico come coach online, poi sono diventata una libera professionista concentrandomi su progetti di salute e benessere. Sono certificato in salute e benessere olistico, quindi sono profondamente in sintonia con i marchi correlati.



Scrivere un eBook è un processo molto entusiasmante, ecco il flusso di lavoro che seguo per questo servizio:



Ti faccio molte domande sulle tue idee per il progetto e sul tuo pubblico di destinazione
Costruiamo una struttura per l'eBook, oltre a raccogliere le fonti
Comincio a scrivere e mi consulto per eventuali aggiustamenti lungo il percorso
Finisco, correggo le bozze e ti invio l'eBook per le revisioni
Sono incluse 3 revisioni, se ne servono di più si applicano costi


Questi sono i tipi di eBook che ho scritto:



Libri di ricette
Mentalità e gestione dello stress
La salute delle donne
Guide fitness e coaching
Terapie naturali
Ebook sul benessere


Sono disponibile a chiacchierare con te sulle tue idee per il progetto e a definire tutti i dettagli riguardanti la copia e lo stile del tuo eBook :</p>
            </div>
            <div className='secondColumn'>
                <aside className='asideBox'>
                    <h1>Informazioni aggiuntive:</h1>
                    <p>Fascia oraria di disponibilità: 8:00-12:00</p>
                    <p>Tariffa oraria: &euro;20</p>
                    <button className='buttonInfoCard'>Contatta</button>
                </aside>
            </div>
        </div>
    )
}
export default CardpageDetails