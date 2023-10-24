// create chat
// getUserChats
// findChat

const db = require('./database');

const createChat = async (req, res) => {
    const { firstUser, secondUser } = req.body;

    try {
        // check if users already had conversation
        const checkConversation = `SELECT * FROM conversations WHERE first_user = ? AND second_user = ?`;

        db.query(checkConversation, [firstUser, secondUser], (error, results) => {
            if (error) {
                res.status(401).json({ message: "sServer sides error!" });
            } else {
                if (results.length > 0) {
                    return res.status(200).json({ message: results});
                } else {
                    // create new conversation
                    const createNewCon = `INSERT INTO conversations (first_user, second_user) VALUES (?, ?)`;
                    db.query(createNewCon, [firstUser, secondUser], (error, results) => {
                        if (error) {
                            res.status(401).json({message: "Server side errors!"});
                        }else{
                            const conversation_id = results.insertId;
                            res.json({insertId: conversation_id});
                        }
                    })
                }
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

const findUserChat = async (req, res) => {
    const userId = req.params.userId;

    try {
        //select user
        const selectChat = `SELECT * FROM conversations WHERE first_user = ? OR second_user = ?`;
        db.query(selectChat, [userId, userId], (error, results) => {
            if (error) {
                res.status(401).json({message: "Server side error!"});
            }else{
                if (results.length > 0){
                    res.status(200).json({message: results});
                    console.log(results);
                }else{
                    res.status(401).json({message: "No chats found!"});
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const findSingleChat = async (req, res) => {
    const {firstUser, secondUser} = req.params;

    try {
        //select user
        const singleChat = `SELECT * FROM conversations WHERE first_user = ? AND second_user = ?`;
        db.query(singleChat, [firstUser, secondUser], (error, results) => {
            if (error) {
                res.status(401).json({message: "Server side error!"});
            }else{
                if (results.length > 0){
                    res.status(200).json({message: results});
                }else{
                    res.status(401).json({message: "No chats found!"});
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createChat, findUserChat, findSingleChat };