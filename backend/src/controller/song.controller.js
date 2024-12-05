import { Song } from "../models/song.model.js"

export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({ createAt: -1 });

        res.status(200).json(songs)
    } catch (error) {
        console.log('Error al obtener todas las canciones.')
        next(error)
    }
}

export const getSongById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id)

        if (!song) {
            res.status(404).json({ message: "" })
        }
    } catch (error) {
        next(error)
    }
}

export const getFeaturedSongs = async (req, res, next) => {
    try {
        const songs = await Songs.aggregate([{
            $example: { size: 6 }
        },
        {
            $projet: {
                _id: 1,
                title: 1,
                artis: 1,
                imageUrl: 1,
                albumId: 1,
                audioUrl: 1,

            }
        }
        ])

        res.status(200).json(songs)
    } catch (error) {
        console.log('Error on get Features Songs.')
        next(error)
    }
}

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        const songs = await Songs.aggregate([{
            $example: { size: 4 }
        },
        {
            $projet: {
                _id: 1,
                title: 1,
                artis: 1,
                imageUrl: 1,
                albumId: 1,
                audioUrl: 1,

            }
        }
        ])

        res.status(200).json(songs)
    } catch (error) {
        console.log('Error on get Made for you songs.')
        next(error)
    }
}

export const getTrendingSongs = async (req, res, next) => {
    try {
        const songs = await Songs.aggregate([{
            $example: { size: 4 }
        },
        {
            $projet: {
                _id: 1,
                title: 1,
                artis: 1,
                imageUrl: 1,
                albumId: 1,
                audioUrl: 1,

            }
        }
        ])

        res.status(200).json(songs)
    } catch (error) {

    }
}