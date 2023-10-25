const db = require('./database');
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../utils/validator and sanitizer/ValidatorAndSanitizer');

// create message
// get message

const createMessage = async (req, res) => {
    const {conversationId, senderId, messageText} = req.body;

    // insert
    const insertNewMessage = `INSERT INTO messages (conversation_id, sender_id, message_text) VALUES (?, ?, ?)`;
    db.query(insertNewMessage, [conversationId, senderId, messageText], (error, results) => {
        if (error) {
            res.status(401).json({message: "Server side error!"});
        }else{
            // insert success
            res.status(200).json({message: "Sent success!"});
        }
    })
}

const getMessage = async (req, res) => {
    const {conversationId} = req.params;
    
    try {
        // get messages
        const getMessages = `SELECT * FROM messages WHERE conversation_id = ?`;
        db.query(getMessages, [conversationId], (error, results) => {
            if (error) {
                res.status(401).json({message: "Server side error!"});
            }
            else {
                if (results.length > 0){
                    res.status(200).json({message: results});
                }else{
                    res.status(401).json({message: "No message found!"});
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

module.exports = { createMessage, getMessage };