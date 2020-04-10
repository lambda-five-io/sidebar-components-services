let fs = require("fs");
let faker = require("faker")
var Sentencer = require('sentencer');
const writeStreamSongs = fs.createWriteStream('songs.json')
const writeStreamUsers = fs.createWriteStream('users.json')
const writeStreamAlbums = fs.createWriteStream('albums.json')
const writeStreamLikes_repost = fs.createWriteStream('likes.json')
const writeStreamPlaylist = fs.createWriteStream('playlists.json')

function writeSongs(writer, encoding, callback) {
    let i = 10000001;
    let id = 0;
    let artist = 0

    const Maker = function (songNumber) {
        this.name = this.getSong()
        this.song = 's' + songNumber
        this.artist_id = this.getArtist_id()
        this.upload_date = this.getDate()
    }
    Maker.prototype.getSong = function () {
        return faker.name.firstName()
    };
    Maker.prototype.getArtist_id = function () {
        if (artist > 39999) {
            artist = 0
        }
        artist++
        return 'u' + artist
    }

    Maker.prototype.getDate = function () {
        return faker.date.recent(10000)
    }
    function write() {

        let ok = true;

        do {
            i -= 1;
            id += 1;


            const entry = new Maker(i)

            let data = JSON.stringify(entry);

            if (i === 0) {
                writer.write(data, encoding, callback); // put's it in here
            } else {
                // see if we should continue, or wait
                // don't pass the callback, because we're not done yet.
                ok = writer.write(data, encoding);
            }
        }

        while (i > 1 && ok);

        if (i > 1) {
            // had to stop early!
            // write some more once it drains
            writer.once('drain', write);
        }
    }
    write()
}

function writeUsers(writer, encoding, callback) {
    let i = 40001;
    let id = 0;
    let albums = 1;
    let playlists = 1;
    let songs = 10000000;

    const Maker = function (userNumber) {
        this.username = this.getUsername()
        this.albums = this.getAlbums()
        this.playlists = this.getPlaylists()
        this.owned_songs = this.getSongs()
        this.user_id = `u${userNumber}`
    }
    Maker.prototype.getAlbums = function () {
        let returnArr = []
        for (let j = 1; j <= 10; j++) {
            returnArr.push(`a${albums}`)
            albums++
        }
        return returnArr
    }
    Maker.prototype.getPlaylists = function () {
        let returnArr = []
        for (let j = 1; j <= 10; j++) {
            returnArr.push(`p${playlists}`)
            playlists++
        }
        return returnArr
    }
    Maker.prototype.getSongs = function () {
        let returnArr = []
        let userSongs = songs
        for (let j = 1; j <= 250; j++) {
            returnArr.push(`s${userSongs}`)
            userSongs -= 40000
        }
        songs -= 1
        return returnArr
    }
    Maker.prototype.getUsername = function () {
        return faker.name.firstName()
    }

    function write() {

        let ok = true;

        do {
            i -= 1;
            id += 1;


            const entry = new Maker(i)

            let data = JSON.stringify(entry);

            if (i === 0) {
                writer.write(data, encoding, callback); // put's it in here
            } else {
                // see if we should continue, or wait
                // don't pass the callback, because we're not done yet.
                ok = writer.write(data, encoding);
            }
        }

        while (i > 1 && ok);

        if (i > 1) {
            // had to stop early!
            // write some more once it drains
            writer.once('drain', write);
        }
    }
    write()
}

function writeAlbums(writer, encoding, callback) {
    let i = 400001;
    let id = 0;
    let artist = 0
    let songs = 10000001

    const Maker = function (albumNumber) {
        this.name = this.getSong()
        this.album_id = `a${albumNumber}`
        this.songs = this.getList()
        this.artist_id = this.getArtist_id()
        this.upload_date = this.getDate()
    }
    Maker.prototype.getSong = function () {
        return faker.name.firstName()
    };
    Maker.prototype.getArtist_id = function () {
        artist += 1
        return `u${artist}`
    }
    Maker.prototype.getList = function () {
        let returnArr = []
        let mySongs = songs
        for (let j = 1; j <= 25; j++) {
            returnArr.push(`s${mySongs}`)
            mySongs = mySongs - 40000
        }
        return returnArr
    }

    Maker.prototype.getDate = function () {
        return faker.date.recent(10000)
    }
    function write() {

        let ok = true;

        do {
            i -= 1;
            id += 1;
            songs -= 1

            const entry = new Maker(i)

            let data = JSON.stringify(entry);

            if (i === 0) {
                writer.write(data, encoding, callback); // put's it in here
            } else {
                // see if we should continue, or wait
                // don't pass the callback, because we're not done yet.
                ok = writer.write(data, encoding);
            }
        }

        while (i > 1 && ok);

        if (i > 1) {
            // had to stop early!
            // write some more once it drains
            writer.once('drain', write);
        }
    }
    write()
}

function writeLikes_repost(writer, encoding, callback) {
    let i = 1200001;
    let userCount = 0
    let rand = 0

    const Maker = function (albumNumber) {
        this.id = `l&r${i}`
        this.user_id = this.getUser_id(this)
        this.upload_date = this.getDate()
        this.rand = (Math.floor(Math.random() * 2) == 0);
        this.like = this.rand
        this.repost = !(this.rand)
        this.secRand = Math.floor(Math.random() * 3)
        this.song_id = this.get_id1(this.secRand)
        this.playlists_id = this.get_id2(this.secRand)
        this.album_id = this.get_id3(this.secRand)
        
    }
    Maker.prototype.get_id1 = function (rand) {
        if (rand === 0) {
            userCount++
            if (userCount > 400000) {
                userCount = 0
            }
            return `s${userCount}`
        } else {
            return false
        }
    }
    Maker.prototype.get_id2 = function (rand) {
        if (rand === 1) {
            userCount++
            if (userCount > 400000) {
                userCount = 0
            }
            return `p${userCount}`
        } else {
            return false
        }
    }
    Maker.prototype.get_id3 = function (rand) {
        if (rand === 2) {
            userCount++
            if (userCount > 400000) {
                userCount = 0
            }
            return `a${userCount}`
        } else {
            return false
        }
    }

    Maker.prototype.getUser_id = function (obj) {
        userCount++
        if (userCount > 40000) {
            userCount = 0
        }

        return `u${userCount}`
    }

    Maker.prototype.getDate = function () {
        return faker.date.recent(10000)
    }
    function write() {

        let ok = true;

        do {
            i -= 1;

            const entry = new Maker(i)

            let data = JSON.stringify(entry);

            if (i === 0) {
                writer.write(data, encoding, callback); 
            } else {
                ok = writer.write(data, encoding);
            }
        }

        while (i > 1 && ok);

        if (i > 1) {
            writer.once('drain', write);
        }
    }
    write()
}

function writePlaylists(writer, encoding, callback) {
    let i = 400001;
    let id = 0;
    let artist = 0
    let songs = 10000001

    const Maker = function (albumNumber) {
        this.name = this.getSong()
        this.playlist_id = `p${albumNumber}`
        this.songs = this.getList()
        this.creator_id = this.getArtist_id()
        this.upload_date = this.getDate()
    }
    Maker.prototype.getSong = function () {
        return faker.name.firstName()
    };
    Maker.prototype.getArtist_id = function () {
        artist += 1
        return `u${artist}`
    }
    Maker.prototype.getList = function () {
        let returnArr = []
        
        for (let j = 1; j <= 25; j++) {
            returnArr.push(`s${Math.floor(Math.random() * 10000000)}`)
        }
        return returnArr
    }

    Maker.prototype.getDate = function () {
        return faker.date.recent(10000)
    }

    function write() {

        let ok = true;

        do {
            i -= 1;

            const entry = new Maker(i)

            let data = JSON.stringify(entry);

            if (i === 0) {
                writer.write(data, encoding, callback); 
            } else {
                ok = writer.write(data, encoding);
            }
        }

        while (i > 1 && ok);

        if (i > 1) {
            writer.once('drain', write);
        }
    }
    write()
}

writeAlbums(writeStreamAlbums, 'utf-8')
writeSongs(writeStreamSongs, 'utf-8')
writeUsers(writeStreamUsers, 'utf-8')
writeLikes_repost(writeStreamLikes_repost, 'utf-8')
writePlaylists(writeStreamPlaylist, 'utf-8')