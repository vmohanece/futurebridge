
export class MovieController {

    storeMovie = (async (req, res)=>{
        try {
            const inData = req.body;
            console.log(inData);
            return res.status(200).send({
                err: false,
                data: userList,
                message: 'success'
            });
        } catch (error) {
            return res.status(500).send({
                err: true,
                message: 'Failed',
            });
        }
    });
}
const movieController = new MovieController();
export default movieController;