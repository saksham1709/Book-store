const orderPlaced = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({
            "message": "unable to place order",
            error: err
        })
    }
}

module.exports = {
    orderPlaced
}