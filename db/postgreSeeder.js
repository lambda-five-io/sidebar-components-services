const csvWriter = require('csv-write-stream');
const faker = require('faker');
const fs = require('fs');

const writerUsers = csvWriter()
const writerAlbums = csvWriter()
const writerPlaylists = csvWriter()
const writerSongs = csvWriter()
const writerLikes = csvWriter()
const writerPlaylistsSongs = csvWriter()


const usersGen = () => {

    console.log('\x1b[37m%s\x1b[0m: ', 'Initialize User Table Seed');
    console.time('Time');

    const writeable = fs.createWriteStream('userTable.csv');
    writerUsers.pipe(writeable);

    //PROGRESS
    //__________________________________________________________________________
    let percentCounter = 0;

    for (let i = 1; i <= 40000; i++) {

        const progress = i % 1000; //confirm every 100 entries
        const message = i % 5000; //used for console logging at every 5% completion
        //__________________________________________________________________________

        //artist using only name
        const names = faker.name.firstName()


        const userData = {
            name: names
        };

        writerUsers.write(userData);

        //PROGRESS
        //__________________________________________________________________________
        if (progress === 0) {
            process.stdout.write(`.`);
        }

        if (message === 0) {
            percentCounter++;
            let total = percentCounter * 5;
            console.log(`${total} percent complete.`);
        }
    }
    //COMPLETION 
    writerUsers.end();
    console.log('\x1b[32m%s\x1b[0m:', 'Users table seeding complete');
    console.timeEnd('Time');
    console.log('\n');
};

const albumGen = () => {


    console.log('\x1b[37m%s\x1b[0m: ', 'Initialize User Table Seed');
    console.time('Time');

    const writeable = fs.createWriteStream('albumTable.csv');
    writerAlbums.pipe(writeable);

    //PROGRESS
    //__________________________________________________________________________
    let percentCounter = 0;
    let counter = 1;
    let placer = 1
    const genres = ['rock', 'punkbilly', 'blues', 'sweet sweet jazz']
    for (let i = 1; i <= 400000; i++) {

        const progress = i % 1000; //confirm every 100 entries
        const message = i % 5000; //used for console logging at every 5% completion
        //__________________________________________________________________________

        //artist using only name
        const names = faker.name.firstName()



        if (counter > 10) {
            counter = 1
            placer++
        }

        let userId = 'U' + `${1000000 + placer}`
        let rando = Math.floor(Math.random() * 5)

        const albumData = {
            name: names,
            creator_id: userId,
            genre: genres[rando]
        };

        writerAlbums.write(albumData);
        counter++
        //PROGRESS U000001
        //__________________________________________________________________________
        if (progress === 0) {
            process.stdout.write(`.`);
        }

        if (message === 0) {
            percentCounter++;
            let total = percentCounter * 5;
            console.log(`${total} percent complete.`);
        }
    }
    //COMPLETION 
    writerAlbums.end();
    console.log('\x1b[32m%s\x1b[0m:', 'Users table seeding complete');
    console.timeEnd('Time');
    console.log('\n');
}



// WRITE THE SONGS!!!
const songGen = () => {

    console.log('\x1b[37m%s\x1b[0m: ', 'Initialize Song Table Seed');
    console.time('Time');

    const writeable = fs.createWriteStream('songTable.csv');
    writerSongs.pipe(writeable);

    //PROGRESS
    let percentCounter = 0;
    //__________________________________________________________________________

    let k = 0;

    writeSong();
    function writeSong() {
        let okay = true;
        let placeHolder = 1
        let counter = 1
        let placeHolder2 = 1
        let counter2 = 1

        do {

            k++;

            const progress = k % 100000; //confirm every 100000 entries
            const message = k % 500000; //used for console logging at every 5% completion



            if (counter >= 250) {
                counter = 1
                placeHolder++
            }

            if (counter2 > 25) {
                counter2 = 1
                placeHolder2++
            }
            let albumId = 'A' + `${1000000 + placeHolder2}`

            let userId = 'U' + `${1000000 + placeHolder}`

            const songData = {
                name: faker.name.firstName(),
                creator_id: userId,
                album_id: albumId
            };

            counter++
            counter2++

            if (k === 10000000) {
                //COMPLETION 
                writerSongs.write(songData, () => {
                    writerSongs.end();
                    console.log('\x1b[32m%s\x1b[0m:', 'Song table seeding complete');
                    console.timeEnd('Time');
                    console.log('\n');
                });

            } else {

                okay = writerSongs.write(songData);

            }

            //PROGRESS
            //__________________________________________________________________________
            if (progress === 0) {
                process.stdout.write(`.`);
            }

            if (message === 0) {
                percentCounter++;
                let total = percentCounter * 5;
                console.log(`${total} percent complete.`);
            }
            //__________________________________________________________________________
        } while (k < 10000000 && okay);

        if (k < 10000000) {
            // Had to stop early!
            // Write some more once it drains.
            writerSongs.once('drain', writeSong);
        }
    }
};




// WRITE TSOME OTHER SHIT!!!!
const playlistSongIdGen = () => {

    console.log('\x1b[37m%s\x1b[0m: ', 'Initialize Song Table Seed');
    console.time('Time');

    const writeable = fs.createWriteStream('playlistSongIdTable.csv');
    writerPlaylistsSongs.pipe(writeable);

    //PROGRESS
    let percentCounter = 0;
    //__________________________________________________________________________

    let k = 0;

    writeSong();
    function writeSong() {
        let okay = true;
        let placeHolder = 1
        let counter = 1
        let placeHolder2 = 1
        let counter2 = 1

        do {

            k++;

            const progress = k % 100000; //confirm every 100000 entries
            const message = k % 500000; //used for console logging at every 5% completion



            if (counter >= 250) {
                counter = 1
                placeHolder++
            }

            if (counter2 > 25) {
                counter2 = 1
                placeHolder2++
            }
            let playlistId = 'P' + `${1000000 + placeHolder2}`

            let userId = 'U' + `${1000000 + placeHolder}`

            const songData = {
                creator_id: userId,
                playlist_id: playlistId
            };

            counter++
            counter2++

            if (k === 10000000) {
                //COMPLETION 
                writerPlaylistsSongs.write(songData, () => {
                    writerPlaylistsSongs.end();
                    console.log('\x1b[32m%s\x1b[0m:', 'Song table seeding complete');
                    console.timeEnd('Time');
                    console.log('\n');
                });

            } else {

                okay = writerPlaylistsSongs.write(songData);

            }

            //PROGRESS
            //__________________________________________________________________________
            if (progress === 0) {
                process.stdout.write(`.`);
            }

            if (message === 0) {
                percentCounter++;
                let total = percentCounter * 5;
                console.log(`${total} percent complete.`);
            }
            //__________________________________________________________________________
        } while (k < 10000000 && okay);

        if (k < 10000000) {
            // Had to stop early!
            // Write some more once it drains.
            writerPlaylistsSongs.once('drain', writeSong);
        }
    }
};

// Write the  

const playlistGen = () => {


    console.log('\x1b[37m%s\x1b[0m: ', 'Initialize User Table Seed');
    console.time('Time');

    const writeable = fs.createWriteStream('playlistTable.csv');
    writerPlaylists.pipe(writeable);

    //PROGRESS
    //__________________________________________________________________________
    let percentCounter = 0;
    let counter = 1;
    let placer = 1
    const genres = ['rock', 'punkbilly', 'blues', 'sweet sweet jazz']
    for (let i = 1; i <= 400000; i++) {

        const progress = i % 1000; //confirm every 100 entries
        const message = i % 5000; //used for console logging at every 5% completion
        //__________________________________________________________________________

        //artist using only name
        const names = faker.name.firstName()



        if (counter > 10) {
            counter = 1
            placer++
        }

        let userId = 'U' + `${1000000 + placer}`
        let rando = Math.floor(Math.random() * 5)

        const albumData = {
            name: names,
            creator_id: userId,
        };

        writerPlaylists.write(albumData);
        counter++
        //PROGRESS U000001
        //__________________________________________________________________________
        if (progress === 0) {
            process.stdout.write(`.`);
        }

        if (message === 0) {
            percentCounter++;
            let total = percentCounter * 5;
            console.log(`${total} percent complete.`);
        }
    }
    //COMPLETION 
    writerPlaylists.end();
    console.log('\x1b[32m%s\x1b[0m:', 'Users table seeding complete');
    console.timeEnd('Time');
    console.log('\n');
}


const likesGen = () => {


    console.log('\x1b[37m%s\x1b[0m: ', 'Initialize User Table Seed');
    console.time('Time');

    const writeable = fs.createWriteStream('likesTable.csv');
    writerLikes.pipe(writeable);

    //PROGRESS
    //__________________________________________________________________________
    let percentCounter = 0;
    let counter = 1;
    let placer = 1
    const genres = ['rock', 'punkbilly', 'blues', 'sweet sweet jazz']
    for (let i = 1; i <= 400000; i++) {

        const progress = i % 1000; //confirm every 100 entries
        const message = i % 5000; //used for console logging at every 5% completion
        //__________________________________________________________________________

        //artist using only name
        const names = faker.name.firstName()



        if (counter > 10) {
            counter = 1
            placer++
        }

        let userId = 'U' + `${1000000 + placer}`
        let rando = Math.floor(Math.random() * 5)

        const albumData = {
            name: names,
            creator_id: userId,
        };

        writerPlaylists.write(albumData);
        counter++
        //PROGRESS U000001
        //__________________________________________________________________________
        if (progress === 0) {
            process.stdout.write(`.`);
        }

        if (message === 0) {
            percentCounter++;
            let total = percentCounter * 5;
            console.log(`${total} percent complete.`);
        }
    }
    //COMPLETION 
    writerPlaylists.end();
    console.log('\x1b[32m%s\x1b[0m:', 'Users table seeding complete');
    console.timeEnd('Time');
    console.log('\n');
}

playlistGen()
playlistSongIdGen()
songGen()
albumGen()
usersGen()