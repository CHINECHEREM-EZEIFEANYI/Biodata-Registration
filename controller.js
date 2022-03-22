const asyncWrapper = require('./async')
const mongoose = require("mongoose")
const { Profile } = require('./helper')

exports.createProfile = asyncWrapper(async (req, res) => {
    const user = await Profile.find({})
    res.status(200).json({ user })

})

exports.readProfile = asyncWrapper(async (req, res) => {

    const { id: UserID } = req.params
    const user = await Profile.findOne({ _id: UserID })
    if (!user) {
        return res.status(404).json({ msg: `No user with this id: ${UserID}` })
    }
    res.status(200).json({ user })
})

exports.updateProfile = asyncWrapper(async (req, res) => {
    const { id: UserID } = req.params
    const filter = { _id: UserID };
    const update = req.body;

    if (!await Profile.findOne({ _id: mongoose.Types.ObjectId(UserID) })) {
        return res.status(404).json({ msg: `No user with this id: ${UserID}` })
    }

    await Profile.findOneAndUpdate(filter, update)

    let newUser = await Profile.findOne({ _id: UserID })
    res.status(200).json(newUser)
})

exports.deleteProfile = asyncWrapper(async (req, res) => {
    const { id: UserID } = req.params
    const user = await Profile.findOneAndDelete({ _id: UserID })
    if (!user) {
        return res.status(404).json({ msg: `No user with this id: ${UserID}` })
    }
    res.status(200).json({ msg: "Deleted Successfully" })

})

exports.allProfile = asyncWrapper(async (req, res) => {
    const user = await Profile.find({})
    res.status(200).json({ user })

})