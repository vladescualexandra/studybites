const db = require('./models/index');
const secrets = require('./config/secrets.json');

db.sequelize.sync({force: true}).then(async () => {
    console.log('tables created');

    /* DATE DE TEST */
    const ADMIN_TEST = await db.Users.create({
        name: "test name",
        email: "test",
        password: "test"
    })

    const ADMIN_BIANCA = await db.Users.create({
        name: 'Vladescu Alexandra-Bianca', 
        email: secrets.email_bianca,
        password: secrets.password_bianca
    });

    const ADMIN_ADRIANA = await db.Users.create({
        name: 'Biza Adriana-Valentina',
        email: secrets.email_adriana,
        password: secrets.password_adriana
    });

    const ADMIN_CODRUTA = await db.Users.create({
        name: 'Stefan Codruta-Ilinca',
        email: secrets.email_codruta,
        password: secrets.password_codruta
    });

    const ADMIN_IONELA = await db.Users.create({
        name: 'Zamfir Ionela-Alina', 
        email: secrets.email_ionela,
        password: secrets.password_ionela 
    });

    let test_book1 = await db.Books.create({
        userID: ADMIN_TEST.id,
        name: "test book 1"
    })

    let test_book2 = await db.Books.create({
        userID: ADMIN_TEST.id,
        name: "test book 2"
    })

    let bianca_tw = await db.Books.create({
        userID: ADMIN_BIANCA.id,
        name: 'Tehnologii Web'
    });

    let bianca_dam = await db.Books.create({
        userID: ADMIN_BIANCA.id,
        name: 'Dispozitive si aplicatii mobile'
    });

    let adriana_multimedia = await db.Books.create({
        userID: ADMIN_ADRIANA.id,
        name: 'Multimedia'
    });

    let codruta_retele = await db.Books.create({
        userID: ADMIN_CODRUTA.id,
        name: 'Retele de calculatoare'
    });

    let ionela_econometrie = await db.Books.create({
        userID: ADMIN_IONELA.id, 
        name: 'Econometrie'
    });

    let test_note1_book1 = await db.Notes.create({
        userID: ADMIN_TEST.id,
        bookID: test_book1.id, 
        title: "test note 1",
        content: "test content 1"
    })

    let test_note2_book1 = await db.Notes.create({
        userID: ADMIN_TEST.id,
        bookID: test_book1.id, 
        title: "test note 2",
        content: "test content 2"
    })

    let test_note3_book1 = await db.Notes.create({
        userID: ADMIN_TEST.id,
        bookID: test_book1.id, 
        title: "test note 3",
        content: "test content 3"
    })

    let test_note1_book2 = await db.Notes.create({
        userID: ADMIN_TEST.id,
        bookID: test_book2.id, 
        title: "test note 4",
        content: "test content 4"
    })

    let test_note2_book2 = await db.Notes.create({
        userID: ADMIN_TEST.id,
        bookID: test_book2.id, 
        title: "test note 5",
        content: "test content 5"
    })

    let bianca_note_tw1 = await db.Notes.create({
        userID: ADMIN_BIANCA.id, 
        bookID: bianca_tw.id, 
        title: 'Arhitectura aplicatiei',
        content: `Aplicația pe care o implementăm pentru a demostra modelul Single Page Application 
        Înainte de a trece la implementare să ne luăm câteva momente pentru a reflecta la modul în care un utilizator va interacționa cu această pagină web și care este parcursul pe care în vor avea datele în arhitectura aplicației noastre.
        În primul rând când utilizatorul va deschide o pagină web tastând adresa URL, browserul va translata această adresă text prin intermediul unui serviciu DNS într-o adresă IP care identifăcă serverul pe care site-ul este găzduit. Apoi va lansa o cerere HTTP către serverul web specificând adresa resursei accesată.`
    });

    let bianca_note_tw2 = await db.Notes.create({
        userID: ADMIN_BIANCA.id, 
        bookID: bianca_tw.id, 
        title: 'ORM (Object-relational mapping) cu Sequelize',
        content: `- permite transpunerea bazei de date in cod prin realizarea de modele asociate fiecarui tabel
        - sunt definite relatiile intre tabele
        - ideal pentru realizarea de operatii simple pe date (CRUD)
        -operatiile sunt realizate asincron`
    });

    let bianca_note_dam = await db.Notes.create({
        userID: ADMIN_BIANCA.id, 
        bookID: bianca_dam.id,
        title: 'Salvarea/restaurarea starii unei activitati',
        content: `Salvarea starii unei activitati este gestionata in mod automat de catre sistemul de operare Android prin intermediul obiectul savedInstanceState de tip Bundle, primit ca parametru de intrare de catre metoda onCreate. Scopul acestei salvari este de a pastra pe ecranul dispozitivului mobil informatiile introduse de utilizator atunci cand acesta executa anumite operatii precum: rotirea dispozitivului mobil, introducerea in backgroud a aplicatiei etc.`
    });

    let adriana_note_multimedia = await db.Notes.create({
        userID: ADMIN_ADRIANA.id, 
        bookID: adriana_multimedia.id, 
        title: 'An introduction to JavaScript',
        content: `JavaScript was initially created to “make web pages alive”.

        The programs in this language are called scripts. They can be written right in a web page’s HTML and run automatically as the page loads.
        
        Scripts are provided and executed as plain text. They don’t need special preparation or compilation to run.
        
        In this aspect, JavaScript is very different from another language called Java.`

    });


    let codruta_note_retele = await db.Notes.create({
        userID: ADMIN_CODRUTA.id, 
        bookID: codruta_retele.id, 
        title: 'Curs 1',
        content: `Ce este o rețea de calculatoare?
        - Sistem de interconectare a mai multor sisteme de calcul.
        - Conexiunea între componentele unui calculator se realizează prin magistrale (circuite electrice pe placa de bază) și chipset-uri.
        - Conexiunea între sisteme de calcul diferite se realizează prin intermediul unor dispozitive (plăci de rețea, switch-uri, routere) și a unor medii de comunicație (cabluri electrice, fibră optică) dedicate.
        `
    });

    let ionela_note_econometrie = await db.Notes.create({
        userID: ADMIN_IONELA.id, 
        bookID: ionela_econometrie.id, 
        title: 'Curs 10',
        content: `a statistica descriptiva luam y si toti x care sunt semnificativi =>calculam lim inf si lim sup (mean-+3*standard deviation) si vedem daca min si max se incadreaza 

        ->previziune la proiect: ex: cat ar fi gcsi daca pib/loc si idu sunt valori...(alegem noi)
        ->daca am outlier posibil sa le scoatem
        ->grafic scatter
        ->multicoliniaritatea: grafic line; coef de corelatie(corelation), criteriul lui klein(facem modelul de regresie pt y si x semnificativi): cof de cor > r patrat =>multicoliniaritate
        ->JB pentru normalitate(descrptive pe residuals); chiinv(alfa, k)
        ->autocorelare: DW
        ->homoscedasticitatea err: err la 2, x la 2; daca ies hetero logaritmez datele 
        !indicii nu au unitati la interpretare`
    });


    await db.Reminders.create({
        userID: ADMIN_TEST.id,
        title: 'test reminder 1',
        content: 'test content 1'
    })

    await db.Reminders.create({
        userID: ADMIN_TEST.id,
        title: 'test reminder 2',
        content: 'test content 2'
    })

    await db.Reminders.create({
        userID: ADMIN_TEST.id,
        title: 'test reminder 3',
        content: 'test content 3'
    })

    await db.Reminders.create({
        userID: ADMIN_BIANCA.id, 
        title: 'Proiect DAM',
        content: 'DEADLINE 3 IANUARIE'
    });

    await db.Reminders.create({
        userID: ADMIN_BIANCA.id, 
        title: 'Proiect TW',
        content: 'DEADLINE FAZA 2: 18 DECEMBRIE'
    });

    await db.Reminders.create({
        userID: ADMIN_ADRIANA.id, 
        title: 'Proiect Multimedia',
        content: 'DEADLINE 11 IANUARIE 7:00'
    });

    await db.Reminders.create({
        userID: ADMIN_CODRUTA.id, 
        title: 'Proiect CSE',
        content: 'DEADLINE 10 IANUARIE'
    });

    await db.Reminders.create({
        userID: ADMIN_IONELA.id, 
        title: 'Proiect Econometrie',
        content: 'DEADLINE 18 DECEMBRIE'
    });


    let shared_test1 = await db.Shared.create({
        title: 'test shared 1',
        content: 'test content 1'
    });

    let shared_test2 = await db.Shared.create({
        title: 'test shared 2',
        content: 'test content 2'
    });


    let shared_econometrie = await db.Shared.create({
        title: 'Proiect Econometrie',
        content: 'Work in progress.'
    });

    let shared_dam = await db.Shared.create({
        title: 'Proiect DAM',
        content: 'Work in progress.'
    });

    let shared_tw = await db.Shared.create({
        title: 'Proiect TW',
        content: 'Work in progress.'
    });

    await db.Collaborators.create({
        sharedId: shared_test1.id,
        userId: ADMIN_TEST.id
    });


    await db.Collaborators.create({
        sharedId: shared_test1.id,
        userId: ADMIN_ADRIANA.id
    });


    await db.Collaborators.create({
        sharedId: shared_test2.id,
        userId: ADMIN_TEST.id
    });

    await db.Collaborators.create({
        sharedId: shared_test2.id,
        userId: ADMIN_CODRUTA.id
    });

    await db.Collaborators.create({
        sharedId: shared_test2.id,
        userId: ADMIN_IONELA.id
    });


    await db.Collaborators.create({
        sharedId: shared_tw.id,
        userId: ADMIN_BIANCA.id
    });

    await db.Collaborators.create({
        sharedId: shared_tw.id,
        userId: ADMIN_ADRIANA.id
    });

    await db.Collaborators.create({
        sharedId: shared_tw.id,
        userId: ADMIN_CODRUTA.id
    });

    await db.Collaborators.create({
        sharedId: shared_tw.id,
        userId: ADMIN_IONELA.id
    });

    await db.Collaborators.create({
        sharedId: shared_econometrie.id,
        userId: ADMIN_ADRIANA.id
    });

    await db.Collaborators.create({
        sharedId: shared_econometrie.id,
        userId: ADMIN_IONELA.id
    });

    await db.Collaborators.create({
        sharedId: shared_dam.id,
        userId: ADMIN_BIANCA.id
    });

    await db.Collaborators.create({
        sharedId: shared_dam.id,
        userId: ADMIN_CODRUTA.id
    });
    

}).catch((err) => {
    console.log(err);
    console.log('could not create tables');
});