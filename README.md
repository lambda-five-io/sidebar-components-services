# sidebar-components overview
This component renders a sidebar module for a music player app page.

# setup 
- run npm install in root directory
- run below scripts in package.json:
  - npm run seed 
  - npm run react-dev
  - npm run server-dev

 # Routes
 GET /currentsong
 *status 200*
 Return JSON object of current song currently selected in track
 EX: flynn

 {
        id: 1
        song_name: string
        artist_name: string
        song_image: string (url)
        song_audio: string (url)
        tableID: integer
    }

 GET /relatedsongs
 *status 200*
 Return JSON array containg objects containing list of songs related to current song
 EX:flynn

 [
    {
        id: 1
        song_name: string
        artist_name: string
        song_image: string (url)
        song_audio: string (url)
        tableID: integer
        relatedToo: string
    },

    {
        id: 2
        song_name: string
        artist_name: string
        song_image: string (url)
        song_audio: string (url)
        tableID: integer
        relatedToo: string
    },
    .
    .
    .
    {
        id: n
        song_name: string
        artist_name: string
        song_image: string (url)
        song_audio: string (url)
        tableID: integer
        relatedToo: string
    }
]

GET /relatedplaylists
 *status 200*
 Return JSON array containg objects containing list of playlist related to current song in playlist
 EX:flynn

 [
    {
        id: 1
        playlist_name: string
        creator_name: string
        playlist_image: string (url)
        tableID: integer
        relatedToo: string
    },

    {
        id: 2
        playlist_name: string
        creator_name: string
        playlist_image: string (url)
        tableID: integer
        relatedToo: string
    },
    .
    .
    .
    {
        id: n
        playlist_name: string
        creator_name: string
        playlist_image: string (url)
        tableID: integer
        relatedToo: string
    },
]

GET /likes&reposts
*status 200*
Return JSON array containing two nested arrays which contain the relevent likes and reposts to the song or playlist
EX: flynn

[
  [
    {
      liked: bool
      user_id: string
      user_image: string (url)
      song_info: string
    },
    .
    .
    .
    {
      liked: bool
      user_id: string
      user_image: string (url)
      song_info: string
    }
  ]
  [
    {
      liked: bool
      user_id: string
      user_image: string (url)
      playlist_info: string
    },
    .
    .
    .
    {
      liked: bool
      user_id: string
      user_image: string (url)
      playlist_info: string
    }
  ]
]

POST /userlike
*status 200*
Post user like status to database on certian song or playlist

PUT /userselect
*status 200*
Put the new playlist or song selected as the one being currently or just last played in database