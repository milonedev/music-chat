import { Album } from "../models/album.model.js"

export const getAllAlbums = async(req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums)

    } catch (error) {
        console.log('Error on get all albums')
        next(error)
    }
}

export const getAllAlbumById = async(req, res, next) => {
    try {
        const {id} = req.params;

        const albums = await Album.findById(id).populate("songs");

        if(!albums) {
            res.status(404).json({message: "Album not found."})
        }

        res.status(200).json(albums)

    } catch (error) {
        console.log('Error on get album by Id')
        next(error)
    }
}